$('document').ready(function () {
    Master();

    $('#addCatBut').click(function () {
        var js = { "name": $('#newCatNameTextBox').val() , "added" : "t"};
        var redirectUrl = $(location).attr('href');

        if (redirectUrl.indexOf('?')!=-1)
            redirectUrl = redirectUrl.substring(0, redirectUrl.indexOf('?'));

        redirectUrl += "?" + $.param(js);
        $(location).attr('href', redirectUrl);
    });

    $('.catDisplayTable .dropDownList').change(function()
    {
        var js = { "preSel": $(this).attr('data-prev-val'), "newSel": $(this).children('option[selected=selected]').val(), "catDispCh": "t" };
        var redirectUrl = $(location).attr('href');

        if (redirectUrl.indexOf('?') != -1)
            redirectUrl = redirectUrl.substring(0, redirectUrl.indexOf('?'));

        redirectUrl += "?" + $.param(js);
        $(location).attr('href', redirectUrl);
    })
});

$(window).load(function () {
    OnMasterLoad();
});

function AttachEvents() {
    $('.itemInteractionButton').click(function () {
        DisplayNormal(GetParentRow($(this)));
    });
}

var prevUpRowElem = null;
function GetParentRow(elem)
{
    return elem.parent().parent('.itemQuantity');
}

function InitiateCatUpdate(elem) {
    var parentRow=GetParentRow($(elem));
    var origName = parentRow.attr('data-orig-name');
    var newName = parentRow.children('.catNameCol').children('input').val();

    var js = { "name": origName, "nName": newName, "up": "t" };
    var redirectUrl = $(location).attr('href');

    if (redirectUrl.indexOf('?') != -1)
        redirectUrl = redirectUrl.substring(0, redirectUrl.indexOf('?'));

    redirectUrl += "?" + $.param(js);
    $(location).attr('href', redirectUrl);
}

function InitiateCatRemove(elem) {
    var origName=GetParentRow($(elem)).attr('data-orig-name');

    var js = { "name": origName, "rem": "t" };
    var redirectUrl = $(location).attr('href');

    if (redirectUrl.indexOf('?') != -1)
        redirectUrl = redirectUrl.substring(0, redirectUrl.indexOf('?'));

    redirectUrl += "?" + $.param(js);
    $(location).attr('href', redirectUrl);
}

function ChangeToEdit(elem)
{
    if (prevUpRowElem != null)
        BackFromEdit(prevUpRowElem);

    var row = GetParentRow($(elem));
    DisplayNormal(row);
    prevUpRowElem = elem;
    var toDisp = row.attr('data-orig-name');
    row.children('.catNameCol').html('<input type=\"text\" class=\"inputTextBox\" value=\"'+toDisp+'\" />');
}

function BackFromEdit(elem)
{
    var row = GetParentRow($(elem));
    DisplayNormal(row);
    var col = row.children('.catNameCol');
    var textVal = col.children('input').val();
    col.html(row.attr('data-orig-name'));
    prevUpRowElem = null;
}

function DisplayNormal(row) {
    var interCol = row.children('td.interCol');

    if (interCol.children().length == 1)
        return;

    interCol.children('.itemInteractionButton').toggle();
}