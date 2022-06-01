$('document').ready(function () {
    Master();
});

$(window).load(function () {
    OnMasterLoad();
    OnAdsLoad();
    OnCategoryItemsLoad();
});

function ApplyFilters()
{
    alert(PrepareFiltersJSON());
    alert(PrepareBrandsJSON());
    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/PrepareFilteredUrl",
                data: { "brands": PrepareBrandsJSON(), "secFilts": PrepareFiltersJSON(), "url": $(location).attr('href'), "minPrice": $('.minPrice:first').val(), "maxPrice": $('.maxPrice:first').val() },
                contenttype: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    $(location).attr('href', $(data).text());
                },
                error: function (jqXHR, textStatus) {
                    alert(jqXHR.statusText);
                }
            }
        )
}

function PrepareFiltersJSON()
{
    var filterItem = $('.filterContainer').children('ul');
    var arr = [];

    for(var x=2;x<filterItem.length;++x)
    {
        var obj = {};
        var arrVals = [];
        obj.Id = $(filterItem[x]).children('li:first-child').attr('data-id');
        
        var checkedIts = $(filterItem[x]).children('li:nth-child(2)').find('ul li div input:checked');
        
        checkedIts.each(function () {
            arrVals.push($(this).val());
        });
        if(arrVals.length>0)
        {
            obj.Vals = arrVals;
            arr.push(obj);
        }
    }

    return JSON.stringify(arr);
}

function PrepareBrandsJSON()
{
    var brandBoxes = $('#brandUl li div input:checked');
    var arr = [];
    brandBoxes.each(function () {
        arr.push($(this).val());
    });

    return JSON.stringify(arr);
}