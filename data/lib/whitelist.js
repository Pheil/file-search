function wlCompare(searchTerm) {

    var whitelist = new Array(
    '854091',
    '859880',
    '862550',
    '862560',
    '866540',
    '852460',
    '852470',
    '852480',
    '852490',
    '859770',
    '859780',
    '859790',
    '227780',
    '227790',
    '227800',
    '227810',
    '227820',
    '227791',
    '232060',
    '232070',
    '232080',
    '232090',
    '232091',
    '232110',
    '811410',
    '811460',
    '811470',
    '811351',
    '821990',
    '681000',
    '228810',
    '228820',
    '228830',
    '228210',
    '228220',
    '228230',
    '228240',
    '228250',
    '228260',
    '228270');

    var matchlist = new Array(
    '854090',
    '854090',
    '854090',
    '854090',
    '864640',
    '851440',
    '851440',
    '851440',
    '851440',
    '851440',
    '851440',
    '851440',
    '227740',
    '227740',
    '227740',
    '227740',
    '227740',
    '227740',
    '232050',
    '232050',
    '232050',
    '232050',
    '232050',
    '232050',
    '811330',
    '811330',
    '811330',
    '811330',
    '811330',
    '680980',
    '228700',
    '228700',
    '228700',
    '228200',
    '228200',
    '228200',
    '228200',
    '228200',
    '228200',
    '228200');
    
    for (var i = 0; i < whitelist.length; i++)
    {
        if (searchTerm == whitelist[i])
        {
            searchTerm = matchlist[i];
        }
    }
    
    return searchTerm;
}

exports.wlCompare = wlCompare;