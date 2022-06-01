$('document').ready(function () {
    Master();
    Attach();

    $('div#profFilters').children('.oSelector:first').change(function () {
        AjaxCall();
    });

    $('div#profFilters').children('.fSelector:first').change(function () {
        ApplyFilter();
    });
});

$(window).load(function () {
    OnMasterLoad();
});

function Attach() {
    //Only first so it won't continue searching after that.
    $('.orderTable:first .inter .rOrder').click(function () {
        var parentCell = $(this).parent();
        var cookieVal = $.cookie('oHist');
        cookieVal = cookieVal.replace(/oid=[0-9]{0,}/i, 'oid=' + $(parentCell).siblings('.ordNo').html());
        $.cookie.raw = true;//To disable decoding encoding.
        $.cookie('oHist', cookieVal);
        $('#profFilters .remOrder:first').click();
    });
}

function AjaxCall() {
    var order = $('#profFilters').children('.oSelector').children('option[selected=selected]').val();
    var cookieVal = $.cookie('oHist');
    cookieVal = cookieVal.replace(/ord=[a-z]{0,}/i, 'ord=' + order);
    $.cookie.raw = true;
    $.cookie('oHist', cookieVal);

    $.ajax
    (
        {
            type: "POST",
            url: "Handler.asmx/OrderFilter",
            data: { "order": order },
            contenttype: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (data) {
                var parsed = $.parseJSON($(data).text());
                //If user haven't tampered then correct filter and order will already be selected.So we don't need to update it separately.
                UpdateOrders(parsed.orders);
            },
            error: function (jqXHR, textStatus) {
                alert("Order filter changed call" + jqXHR.statusText);
            }
        }
    )
}

function ApplyFilter()
{
    var filterVal = $('#profFilters').children('.fSelector').children('option[selected=selected]').html();
    var cookieVal = $.cookie('oHist');
    cookieVal = cookieVal.replace(/filt=[a-z]{0,}/i, 'filt=' + filterVal);
    $.cookie.raw = true;
    $.cookie('oHist', cookieVal);

    var tableRows = $('.orderTable:first').children().children().not('tr:first-child');
    var found = false;

    $(tableRows).each(function () {
        if (filterVal!="All" && $(this).children('.status').html() != filterVal)
            $(this).css('display', 'none');
        else
        {
            $(this).css('display', 'table-row');
            found = true;
        }
    });

    if (!found)
        $('.orderTable:first .noFoundRow:first').css('display', 'table-row');
    else
        $('.orderTable:first .noFoundRow:first').css('display', 'none');
}

function UpdateOrders(orders) {
    var orderTable = $('.orderTable:first');
    var header = orderTable.children().children('tr:first-child').clone(true);//Optimizing selectors
    orderTable.html('');
    orderTable.append(header);

    $(orders).each(function () {
        var str = "<tr class='itemQuantity'><td class='ordNo'>";
        str += (this.oid + "</td><td class='addr'>");
        str += (this.addr + "</td><td class='date'>");
        str += (this.tm + "</td><td class='amount'>");
        str += (this.amo + "</td><td class='status'>");
        str += (this.stat + "</td><td class='inter'>");

        var status = this.stat;
        var interaction = "";
        if (status == "Unconfirmed") {
            interaction += "<span class=\"imgButtonsContainer\" onclick=\"window.location.href='OrderPage.aspx?ed=t&oid=" + this.oid + "'\"><img class=\"imgButtons\" src=\"Images/edit Icon.png\" /></span>";
            interaction += "<span class=\"itemInteractionButton rOrder\">Remove</span>";
        }

        interaction += "<span class=\"itemInteractionButton\" onclick=\"window.location.href='OrderPage.aspx?ed=f&oid=" + this.oid + "'\">View details</span>"
        str += (interaction + "</td></tr>");
        orderTable.append(str);
    });

    Attach();
    ApplyFilter();
}
