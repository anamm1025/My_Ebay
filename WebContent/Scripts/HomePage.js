$('document').ready(function () {
    Master();
    CategoryMaster();
});

$(window).load(function () {
    OnMasterLoad();
    OnAdsLoad();
});

function RemoveSubcategory(elem)
{
    var sc = $(elem).parent('div').siblings('a').attr('data-id');

    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/RemoveSubcategory",
                data: { "strSc": sc },
                contenttype: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    $(location).attr('href', $(location).attr('href'));
                },
                error: function (jqXHR, textStatus) {
                    alert(jqXHR.statusText);
                }
            }
        )
}