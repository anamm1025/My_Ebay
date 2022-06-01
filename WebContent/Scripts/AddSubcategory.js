var filtNameBox;
var filtUnitBox;
var filtRowWithAdd;
var subcatNameBox;
var catDropDown;

$('document').ready(function () {
    Master();

    filtNameBox = $('.sCatFilterTable #filtName');
    filtUnitBox = $('.sCatFilterTable #filtUnit');
    filtRowWithAdd = $('.sCatFilterTable .itemQuantity:last-child');
    subcatNameBox = $('.subcatName:first');
    catDropDown = $('.subcatCategory:first');
    var reg=/sc=[0-9]{1,}/i;

    $('#addFilter').click(function () {
        AddFilter(filtNameBox.val(), filtUnitBox.val());
        filtNameBox.val('');
        filtUnitBox.val('');
    });

    $('#appChanges').click(function () {
        if (prevUpRowElem != null) {
            BackFromEdit(prevUpRowElem,false);
        }

        var regexCatName = /^[a-z _-]{2,100}$/gi;
        var regexSubcatatName = /^[a-z _-]{2,50}$/gi;
        var inf = $('.informer:first');
        inf.html('');
        var corrSub = regexSubcatatName.test(subcatNameBox.val());
        var corrCat = regexCatName.test(catDropDown.val());
        
        if (!(corrCat && corrSub))
        {
            inf.html('Invalid category or subcategory name.');
            return;
        }

        //$('.commitSubcat').click();
        $.ajax
       (
           {
               type: "POST",
               url: "Handler.asmx/HandleSubCategoryRequest",
               data: PrepareJson(),
               success: function (data) {
                   var txt = $(data).text();
                   if (txt.indexOf('.aspx') >= 0)
                       $(location).attr('href', txt);
                   else
                       inf.html(txt);
               },
               error: function (jqXHR, textStatus) {
                   alert("Addsubcategory call" + jqXHR.statusText);
               }
           }
       )
    });
});

function PrepareJson() {
    var json = new Array;
    var rows = $('.sCatFilterTable tr');

    for (var x = 1; x < rows.length - 1; ++x) {
        var datarem = $(rows[x]).attr('data-rem');
        var fid = $(rows[x]).attr('data-fid');
        var filName = $(rows[x]).children('.filName').html();
        var filUnit = $(rows[x]).children('.filUnit').html();
        json.push(GetStr(datarem));
        json.push(GetStr(fid));
        json.push(filName);
        json.push(filUnit);
    }

    var categoryName = catDropDown.val();
    var DTO = { filtersData: JSON.stringify(json), catName: categoryName, subCatName: subcatNameBox.val(), sCatID : GetStr(subcatNameBox.attr('data-sCatID')) };
    return DTO;
}

function GetStr(value) {
    if (typeof value == "undefined")
        return "undefined";

    return value;
}


function CheckFilterNames(str)
{
    var regex = /^[a-z _$%-]{0,50}$/ig;
    var result = regex.test(str);
    var inf = $('.informer:first');
    inf.html('');

    if(!result)
        inf.html('Enter correct filter and unit name.');
    
    return result;
}

$(window).load(function () {
    OnMasterLoad();
});

function RemoveFilter(elem) {
    var row = GetParentRow($(elem));
    if (typeof row.attr('data-fid') == "undefined")//Newly added row deleted.
        row.remove();
    else {
        row.css('display', 'none');
        row.attr('data-rem', 'true');
    }
}

var prevUpRowElem = null;

function GetParentRow(elem) {
    return elem.parent().parent('.itemQuantity');
}

function UpdateFilter(elem) {
    BackFromEdit(elem, true);
}

function ChangeToEdit(elem) {
    if (prevUpRowElem != null) {
        BackFromEdit(prevUpRowElem,false);
    }

    var row = GetParentRow($(elem));
    DisplayNormal(row);
    prevUpRowElem = elem;
    ChangeToTextBox(row.children('.filName'));
    ChangeToTextBox(row.children('.filUnit'));
}

function ChangeToTextBox(cell) {
    var toDisp = cell.html();
    cell.html('<input type=\"text\" class=\"inputTextBox\" value=\"' + toDisp + '\" />');
}

function ChangeToNormal(cell,retain) {
    var toDisp = cell.children('input').val();

    if (retain == true && CheckFilterNames(toDisp))
        cell.attr('data-preval', toDisp);

    cell.html(cell.attr('data-preval'));
}


function CancelEdit(elem)
{
    BackFromEdit(elem, false);
}

function BackFromEdit(elem,retain) {
    var row = GetParentRow($(elem));
    ChangeToNormal(row.children('.filName'), retain);
    ChangeToNormal(row.children('.filUnit'), retain);
    DisplayNormal(row);
    prevUpRowElem = null;
}

function DisplayNormal(row) {
    var interCol = row.children('td.interCol');

    if (interCol.children().length == 1)
        return;

    interCol.children('.itemInteractionButton').toggle();
}

function AddFilter(filtName,filUnit)
{
    if (!(CheckFilterNames(filtName) && CheckFilterNames(filUnit)))//Error
        return;

    var row = "<tr class=\"itemQuantity\" >";
    row += "<td class=\"filName\" data-preval=\"" + filtName + "\">" + filtName + "</td>";
    row += "<td class=\"filUnit\" data-preval=\"" + filUnit + "\">" + filUnit + "</td>";
    row += "<td class=\"interCol\">";
    row += CreateButton("Remove", "javascript:RemoveFilter(this);", null);
    row += CreateButton("Edit", "javascript:ChangeToEdit(this);", null);
    row += CreateButton("Update", "javascript:UpdateFilter(this);", "none");
    row += CreateButton("Cancel", "javascript:CancelEdit(this);", "none");
    row += "</td>";
    $(row).insertBefore(filtRowWithAdd);
}