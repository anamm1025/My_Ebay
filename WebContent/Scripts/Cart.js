$('document').ready(function () {
    Master();

    $('.inputTable tr td .inputTextBox').change(function () {
        var quan = parseInt($(this).val());
        var col = $(this).parent('div').parent('.unitOrdered.itemQuantity');
        var totalContainer = col.next();
        var quanAvail = parseInt(col.prev().html());
        var price = parseFloat(col.siblings('.itemPrice.price').html());

        if (quan > quanAvail)
        {
            $(this).val(quanAvail.toString());
            totalContainer.html((quanAvail * price).toString());
        }
        else
            totalContainer.html((quan * price).toString());
    });
});

$(window).load(function () {
    OnMasterLoad();
});

function PrepareJson()
{
    var arr = [];
    var rows = $('.cartTable:first tr').not(':first-child');
    rows.each(function () {
        var obj = {};
        obj.id = $(this).attr('data-id');
        obj.quan = $(this).children('td.unitOrdered.itemQuantity').children('div').children('input').val();
        arr.push(obj);
    });

    return JSON.stringify(arr);
}

function UpdateCart()
{
    var oid = $('.cartTable:first').attr('data-id');
    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/UpdateCart",
                data: { 'json' : PrepareJson(), 'oid' : oid},
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

function RemoveFromCart(elem)
{
    $(elem).parent('td').parent('tr').remove();
}

function EmptyCart()
{
    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/EmptyCart",
                data: { },
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