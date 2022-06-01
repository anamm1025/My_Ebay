$('document').ready(function () {
    Master();
});

$(window).load(function () {
    OnMasterLoad();
    OnCategoryItemsLoad();
});

function RemoveFromWishList(elem)
{
    var div=$(elem).parent('div').parent('div.item');
    var id = div.attr('data-id');
    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/RemoveFromWishList",
                data: { "strItID": id },
                contenttype: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    if ($(data).text() == "")
                        div.remove();
                    else
                        alert($(data).text());
                },
                error: function (jqXHR, textStatus) {
                    alert(jqXHR.statusText);
                }
            }
        )
}