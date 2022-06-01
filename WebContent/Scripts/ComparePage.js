$('document').ready(function () {
    Master();
});

$(window).load(function () {
    OnMasterLoad();
});

function RemoveFromCompareList(elem)
{
    var id = $(elem).parent('td').attr('data-id');
    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/RemoveFromComparelist",
                data: { "strItid": id },
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