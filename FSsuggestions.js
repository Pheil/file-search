const {Cc,Ci,Cm,Cu,components} = require("chrome");
Cu.import('resource://gre/modules/XPCOMUtils.jsm');
Cu.import("resource://gre/modules/Services.jsm");

const CLASS_ID = components.ID('6224daa1-71a2-4d1a-ad90-01ca1c08e323');
const CLASS_NAME = "fs-autocomplete";
const CONTRACT_ID = '@mozilla.org/autocomplete/search;1?name=fs-autocomplete';

/**
 * @constructor
 *
 * @implements {nsIAutoCompleteResult}
 *
 * @param {string} searchString
 * @param {number} searchResult
 * @param {number} defaultIndex
 * @param {string} errorDescription
 * @param {Array.<string>} results
 * @param {Array.<string>|null=} comments
 */
function ProviderAutoCompleteResult(searchString, searchResult,
  defaultIndex, errorDescription, results, comments) {
  this._searchString = searchString;
  this._searchResult = searchResult;
  this._defaultIndex = defaultIndex;
  this._errorDescription = errorDescription;
  this._results = results;
  this._comments = comments;
}

ProviderAutoCompleteResult.prototype = {
  _searchString: "",
  _searchResult: 0,
  _defaultIndex: 0,
  _errorDescription: "",
  _results: [],
  _comments: [],

  /**
   * @return {string} the original search string
   */
  get searchString() {
    return this._searchString;
  },

  /**
   * @return {number} the result code of this result object, either:
   *   RESULT_IGNORED   (invalid searchString)
   *   RESULT_FAILURE   (failure)
   *   RESULT_NOMATCH   (no matches found)
   *   RESULT_SUCCESS   (matches found)
   */
  get searchResult() {
    return this._searchResult;
  },

  /**
   * @return {number} the index of the default item that should be entered if
   *   none is selected
   */
  get defaultIndex() {
    return this._defaultIndex;
  },

  /**
   * @return {string} description of the cause of a search failure
   */
  get errorDescription() {
    return this._errorDescription;
  },

  /**
   * @return {number} the number of matches
   */
  get matchCount() {
    return this._results.length;
  },

  /**
   * @return {string} the value of the result at the given index
   */
  getValueAt: function(index) {
    return this._results[index];
  },

  /**
   * @return {string} the comment of the result at the given index
   */
  getCommentAt: function(index) {
    if (this._comments)
      return this._comments[index];
    else
      return '';
  },

  /**
   * @return {string} the style hint for the result at the given index
   */
  getStyleAt: function(index) {
    if (!this._comments || !this._comments[index])
      return null;  // not a category label, so no special styling

    if (index == 0)
      return 'suggestfirst';  // category label on first line of results

    return 'suggesthint';   // category label on any other line of results
  },

  /**
   * Gets the image for the result at the given index
   *
   * @return {string} the URI to the image to display
   */
  getImageAt : function (index) {
    return '';
  },

  /**
   * Get the final value that should be completed when the user confirms
   * the match at the given index.
   * @return {string} the final value of the result at the given index 
   */
  getFinalCompleteValueAt: function(index) {
    return this.getValueAt(index);
  },

  /**
   * Removes the value at the given index from the autocomplete results.
   * If removeFromDb is set to true, the value should be removed from
   * persistent storage as well.
   */
  removeValueAt: function(index, removeFromDb) {
    this._results.splice(index, 1);

    if (this._comments)
      this._comments.splice(index, 1);
  },

  getLabelAt: function(index) { return this._results[index]; },

  QueryInterface: XPCOMUtils.generateQI([ Ci.nsIAutoCompleteResult ])
};


/**
 * @constructor
 *
 * @implements {nsIAutoCompleteSearch}
 */
function ProviderAutoCompleteSearch() {
}

ProviderAutoCompleteSearch.prototype = {

  classID: CLASS_ID,
  classDescription : CLASS_NAME,
  contractID : CONTRACT_ID,

  /**
   * Searches for a given string and notifies a listener (either synchronously
   * or asynchronously) of the result
   *
   * @param searchString the string to search for
   * @param searchParam an extra parameter
   * @param previousResult a previous result to use for faster searchinig
   * @param listener the listener to notify when the search is complete
   */
  startSearch: function(searchString, searchParam, previousResult, listener) {
    if (!previousResult)
      this._formHistoryResult = null;

    var formHistorySearchParam = searchParam.split("|")[0];

    // Receive the information about the privacy mode of the window to which
    // this search box belongs.  The front-end's search.xml bindings passes this
    // information in the searchParam parameter.  The alternative would have
    // been to modify nsIAutoCompleteSearch to add an argument to startSearch
    // and patch all of autocomplete to be aware of this, but the searchParam
    // argument is already an opaque argument, so this solution is hopefully
    // less hackish (although still gross.)
    var privacyMode = (searchParam.split("|")[1] == "private");

    // Start search immediately if possible, otherwise once the search
    // service is initialized
    if (Services.search.isInitialized) {
      this._triggerSearch(searchString, formHistorySearchParam, listener, privacyMode);
      return;
    }

    Services.search.init((function startSearch_cb(aResult) {
      if (!Components.isSuccessCode(aResult)) {
        Cu.reportError("Could not initialize search service, bailing out: " + aResult);
        return;
      }
      this._triggerSearch(searchString, formHistorySearchParam, listener, privacyMode);
    }).bind(this));
  },
  
  /**
   * This sends an autocompletion request to the form history service,
   * which will call onSearchResults with the results of the query.
   */
  _startHistorySearch: function SAC_SHSearch(searchString, searchParam) {
    var formHistory =
      Cc["@mozilla.org/autocomplete/search;1?name=form-history"].
      createInstance(Ci.nsIAutoCompleteSearch);
    formHistory.startSearch(searchString, searchParam, this._formHistoryResult, this);
  },
  
  /**
   * Actual implementation of search.
   */
  _triggerSearch: function(searchString, searchParam, listener, privacyMode) {
    // If there's an existing request, stop it. There is no smart filtering
    // here as there is when looking through history/form data because the
    // result set returned by the server is different for every typed value -
    // "ocean breathes" does not return a subset of the results returned for
    // "ocean", for example. This does nothing if there is no current request.
    this.stopSearch();

    this._listener = listener;

    var engine = Services.search.currentEngine;

    if (!searchString ||
        !this._suggestEnabled ||
        !engine.supportsResponseType(SEARCH_RESPONSE_SUGGESTION_JSON) ||
        !this._okToRequest()) {
      // We have an empty search string (user pressed down arrow to see
      // history), or search suggestions are disabled, or the current engine
      // has no suggest functionality, or we're in backoff mode; so just use
      // local history.
      this._sentSuggestRequest = false;
      this._startHistorySearch(searchString, searchParam);
 
    if (searchParam.length > 0) {
    var searchResults = eval("(" + searchParam + ")");
    var results = [];
    var comments = [];

    // fill out the comment column for the suggestions
    for (var i = 0; i < searchResults.length; ++i)
    {
        if (searchResults[i].value.indexOf(searchString.toUpperCase()) != -1)
        {
            results.push(searchResults[i].value);
            if (searchResults[i].comment)
                comments.push(searchResults[i].comment);
            else
                comments.push(null);
        }

    }
     
    // now put the history results above the suggestions
    //var finalResults = historyResults.concat(results);
    //var finalComments = historyComments.concat(comments);
    var finalResults = results;
    var finalComments = comments;

    var newResult = new ProviderAutoCompleteResult(searchString, Ci.nsIAutoCompleteResult.RESULT_SUCCESS, 0, "", finalResults, finalComments);
    listener.onSearchResult(this, newResult);
      return;
    }

    // Actually do the search
    this._request = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].
                    createInstance(Ci.nsIXMLHttpRequest);
    var submission = engine.getSubmission(searchString,
                                          SEARCH_RESPONSE_SUGGESTION_JSON);
    this._suggestURI = submission.uri;
    var method = (submission.postData ? "POST" : "GET");
    this._request.open(method, this._suggestURI.spec, true);
    this._request.channel.notificationCallbacks = new AuthPromptOverride();
    if (this._request.channel instanceof Ci.nsIPrivateBrowsingChannel) {
      this._request.channel.setPrivate(privacyMode);
    }

    var self = this;
    function onReadyStateChange() {
      self.onReadyStateChange();
    }
    this._request.onreadystatechange = onReadyStateChange;
    this._request.send(submission.postData);

    if (this._includeFormHistory) {
      this._sentSuggestRequest = true;
      this._startHistorySearch(searchString, searchParam);
    }
  }
  },

  /**
   * Ends the search result gathering process. Part of nsIAutoCompleteSearch
   * implementation.
   */
  stopSearch: function() {
  },

  QueryInterface: XPCOMUtils.generateQI([ Ci.nsIAutoCompleteSearch ])
};

// The following line is what XPCOM uses to create components
const NSGetFactory =
  XPCOMUtils.generateNSGetFactory([ ProviderAutoCompleteSearch ]);


// Backup Part Array if server is not available
var customarray2b = [
{value:'000010',comment:'Part'},
{value:'000020',comment:'Part'},
{value:'000030',comment:'Part'},
{value:'000040',comment:'Part'},
{value:'000120',comment:'Part'},
{value:'006540',comment:'Part'},
{value:'006630',comment:'Part'},
{value:'006640',comment:'Part'},
{value:'006740',comment:'Part'},
{value:'006750',comment:'Part'},
{value:'006780',comment:'Part'},
{value:'006800',comment:'Part'},
{value:'006810',comment:'Part'},
{value:'006820',comment:'Part'},
{value:'019590',comment:'Part'},
{value:'026300',comment:'Part'},
{value:'026310',comment:'Part'},
{value:'WF570010000',comment:'Part'},
{value:'WF570020000',comment:'Part'},
{value:'WF570030000',comment:'Part'},
{value:'WT490010000',comment:'Part'}];





exports.ProviderAutoCompleteSearch = ProviderAutoCompleteSearch;
