var primaryImage = null;
var additionalImages = [];
var additionalImgSelector;
var priImgSelector;
var catSel;
var subcatSel;
var itNameBox;
var brandNameBox;
var priceBox;
var quanBox;
var overViewBox;
var additionalImagesClearFix;
var featureBefore;
var specBefore;
var imgIds = 0;
var formData;
var first = true;

$('document').ready(function () {
    Master();
    
    priImgSelector = $('#priImageFile');
    additionalImgSelector = $('#addImgSelect');
    brandNameBox = $('.brandName:first');
    priceBox = $('.itPric:first');
    quanBox = $('.itQuan:first');
    catSel = $('.adItCat:first');
    subcatSel = $('.adItSubcat:first');
    itNameBox = $('.itName:first');
    overViewBox = $('.inputTextBoxMultiline.inputTextBox');
    additionalImagesClearFix = $('#addImagesClearFix');
    featureBefore = $('.addFeatureTable:first .itemQuantity:last-child');
    specBefore = $('.specNameTable:first .itemQuantity:last-child');

    subcatSel.change(function () {
        if (first)
            return;
        var value = $(this).val();
        if (value == $('#preVal').attr('data-scatid'))
            $('.addFilterTable').html($('#preVal').html());
        else
        {
            $.ajax
            (
                {
                    type: "POST",
                    url: "Handler.asmx/LoadSubcategoryFilters",
                    data: { "subCatId": value },
                    success: function (data) {
                        var txt = $(data).text();
                        var parsed = $.parseJSON(txt);
                        //If user haven't tampered then correct filter and order will already be selected.So we don't need to update it separately.
                        AddFiltersToDropDown(parsed.arr);
                    },
                    error: function (jqXHR, textStatus) {
                        alert(jqXHR.statusText);
                    }
                }
            )
        }
    });

    AttachEventToCatsSelectors('.adItCat', '.adItSubcat', false, false, false);
    SelectCatSubCat();

    additionalImgSelector.change(function () {
        if (this.files && this.files[0]) {

            var reader = new FileReader();
            reader.readAsDataURL(this.files[0]);

            var obj = { img: this.files[0], id : imgIds++ };
            additionalImages.push(obj);

            reader.onload = function (e) {
                var tmp = e.target.result;
                $(DisplayAdditionalImg(tmp,obj.id)).insertBefore(additionalImagesClearFix);
            }
        }
    });

//==============================================================================================
//IMAGE UPLOAD
    priImgSelector.change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            primaryImage = this.files[0];
            reader.readAsDataURL(primaryImage);

            reader.onload = function (e) {
                $('.primDisplayer').css('display','block').attr('src', e.target.result);
            }
        }
    });
//==============================================================================================
    $('#appChanges').click(function () {
        if (ValidateOverview())
        {
            $('.informer').html('');
            formData = new FormData();
            AddImagesToFormData();
            AddOverviewToFormData();
            AddRemovedImagesToForm();
            AddFeaturesInfoToFormData();
            AddSpecificationsToFormData();
            AddFiltersToFormData();
            
            $.ajax(
            {
                ///server script to process data
                url: "Handler.ashx", //web service
                type: 'POST',
                complete: function () {
                    //on complete event     
                },
                progress: function (evt) {
                    //progress event    
                },
                ///Ajax events
                beforeSend: function (e) {
                    //before event  
                },
                success: function (e) {
                    if (e.indexOf('.aspx') >= 0)
                        $(location).attr('href', e);
                    else
                        $('.informer').html(e);
                },
                error: function (e) {
                    alert(e.statusText);
                },
                ///Form data
                data: formData,
                ///Options to tell JQuery not to process data or worry about content-type
                cache: false,
                contentType: false,
                processData: false
            });
        }
    });
});

$(window).load(function () {
    OnMasterLoad();
});

function AddRemovedImagesToForm() {
    var imgCont = $('.itemAdditionalImgContainer:first');
    var idsOfImgsToRem = [];
    imgCont.children('.itemAdditionalImg').each(function () {
        if($(this).attr('data-rem')=="true")
            idsOfImgsToRem.push($(this).attr('data-id'));
    });

    formData.append("addImgsToRem", JSON.stringify(idsOfImgsToRem));
}

function AddImagesToFormData()
{
    for (var x = 0; x < additionalImages.length; x++)
        formData.append(additionalImages[x].id, additionalImages[x].img);
}

function AddFeaturesInfoToFormData()
{
    var cont = $('.addFeatureTable:first tr.itemQuantity');
    var rem = [];
    var added = [];

    cont.each(function () {
        if($(this).attr('data-rem')=="true")
            rem.push($(this).attr('data-id'));
        else if($(this).attr('data-added')=="true")
            added.push($(this).children('.featureVal').html());
    })

    formData.append("remFeat", JSON.stringify(rem));
    formData.append("addFeat", JSON.stringify(added));
}

function AddSpecificationsToFormData()
{
    var cont = $('.specNameTable:first tr.itemQuantity');
    var rem = [];
    var added = [];

    cont.each(function () {
        var childs = $(this).children('.specValCol').children('.specValTable').children('tbody').children('tr').not(':last-child');

        if($(this).attr('data-added')=="true")
        {
            var specVals = [];
            var obj = {};
            obj.SpecName = $(this).children('.specName').html();

            childs.each(function () {
                specVals.push($(this).children('.specVal:first-child').html());
            });

            obj.Specs=specVals;

            if(obj.Specs.length>0)
                added.push(obj);
        }
        else if($(this).attr('data-rem')=="true")
        {
            childs.each(function () {
                if (typeof $(this).attr('data-id') != "undefined")
                    rem.push($(this).attr('data-id'));
            });
        }
        else
        {
            var obj = {};
            obj.specName = $(this).children('.specName').html();
            var SpecVals = [];

            childs.each(function () {
                if ($(this).attr('data-added') == "true")
                    specVals.push($(this).children('.specVal:first-child').html());
                else if ($(this).attr('data-rem') == "true")
                    rem.push($(this).attr('data-id'));
            });

            obj.Specs = SpecVals;
            if (obj.Specs.length > 0)
                added.push(obj);
        }
    });

    formData.append("specRem", JSON.stringify(rem));
    formData.append("specAdded", JSON.stringify(added));
}

function AddFiltersToFormData() {
    var cont = $('.addFilterTable:first tr.itemQuantity');
    var rem = [];
    var added = [];
    var partialRem = [];

    cont.each(function () {
        var childs = $(this).children('.filterValCol').children('.filterValTable').children('tbody').children('tr').not(':last-child');

        if ($(this).attr('data-added') == "true") {
            var filterVals = [];
            var obj = {};
            obj.FilterID = $(this).attr('data-id');

            childs.each(function () {
                filterVals.push($(this).children('.filterVal:first-child').html());
            });

            obj.FilterValues = filterVals;
            if (obj.FilterValues.length > 0)
                added.push(obj);
        }
        else if ($(this).attr('data-rem') == "true") {
            rem.push($(this).attr('data-id'));
        }
        else {
            var obj = {};
            var filterVals = [];
            var objParRem = {};
            var parRemText = [];
            obj.FilterID = $(this).attr('data-id');
            objParRem.FilterID = $(this).attr('data-id');


            childs.each(function () {
                if ($(this).attr('data-added') == "true")
                    filterVals.push($(this).children('.filterVal:first-child').html());
                else if ($(this).attr('data-rem') == "true")
                    parRemText.push($(this).children('td.filterVal').html());
            });

            obj.FilterValues = filterVals;
            objParRem.FilterValues = parRemText;
            if (obj.FilterValues.length > 0)
                added.push(obj);
            if (parRemText.length > 0)
                partialRem.push(objParRem);
        }
    });

    formData.append("filterRem", JSON.stringify(rem));
    formData.append("filterParRem", JSON.stringify(partialRem));
    formData.append("filterAdded", JSON.stringify(added));
}

function AddOverviewToFormData() {
    formData.append("priImage", primaryImage);
    formData.append("subcat", subcatSel.val());
    formData.append("name", itNameBox.val());
    formData.append("brand", brandNameBox.val());
    formData.append("price", priceBox.val());
    formData.append("quantity", quanBox.val());
    formData.append("overView", overViewBox.val());
    formData.append("itId", $('.ovTable').attr('data-itemid'));
}

function SaveState()
{
    var pre = $('#preVal');
    var sCatID = $('.ovTable').attr('data-subcat');
    pre.attr('data-scatid', sCatID);
    var htm = $('.addFilterTable').html();
    pre.html(htm);
}

function UpdateUnit(elem)
{
    var val = $(elem).children('option[selected=selected]').attr('data-unit');
    var sib = $(elem).parent('.filtName').siblings('.filtUnit').html(val);
    first = false;
}

function AddFiltersToDropDown(arrOfObjs)
{
    if (!first)
    {
        var htm = "<tr class=\"containerContentDescriber\"><th class=\"filtName\">Filter Name</th><th class=\"filtUnit\">Filter Unit</th><th class=\"filterValCol\">Details</th><th class=\"interCol\"></th></tr>";
        htm += "<tr class=\"itemQuantity\"><td class=\"filtName\"><select class=\"filterValsDrop dropDownList\" onchange=\"javascript:UpdateUnit(this);\">";
        htm += "</select></td>";
        htm += "<td class=\"filtUnit\"></td>";
        htm += "<td class=\"filterValCol\"></td>";
        htm += "<td class=\"interCol\">";
        htm += CreateButton("Add", "javascript:AddNewFilter(this);", null);
        htm += "</td>";
        $('.addFilterTable').html(htm);
    }

    var dropSel = $('.addFilterTable tr:last-child').children('.filtName').children('select');
    var ht = "";
    $(arrOfObjs).each(function () {
        ht += "<option data-unit=\""+this.uni+"\" value=\""+this.filtId+"\">"+this.filtName+"</option>";
    });

    dropSel.html(ht);
    $('.addFilterTable .filtName').children('select').trigger("change");
}

function AddFilterVal(elem)
{
    var bef = $(elem).parent('td').parent('tr');
    var value = $(elem).parent('td').siblings('.filterVal').children('input').val();

    if(NamingChecks(50,1,value,$('.filtInf')))
    {
        $('.filtInf').html('');
        var toIns="<tr data-added=\"true\"><td class=\"filterVal\">"+value+"</td><td class=\"interCol\">";
        toIns += CreateButton("Remove", "javascript:Remove(this);", null);
        toIns += "</td></tr>";
        $(toIns).insertBefore(bef);
    }
}

function AddNewFilter(elem)
{
    var sel = $(elem).parent('td').siblings('.filtName').children('select');
    var value = sel.val();
    var r = $(elem).parent('td').parent('tr');
    if(IsCorrectNumber(value))
    {
        $('.filtInf').html('');
        var rows = $('.addFilterTable tr');
        var present = false;
        $(rows).each(function () {
            if($(this).attr('data-id')==value)
            {
                $('.filtInf').html('This filter is already present.');
                present = true;
                return;
            }
        });

        if (present)
            return;
        
        var toIns = "<tr class=\"itemQuantity\" data-id=\"" + value + "\" data-added=\"true\"><td class=\"filtName\"></td><td class=\"filtUnit\">" + $(elem).parent('td').siblings('.filtUnit').html() + "</td>";
        toIns += "<td class=\"filterValCol\"><table class=\"filterValTable\" cellspacing=\"0\"><tr><td class=\"filterVal\"><input type=\"text\" class=\"inputTextBox\" /></td><td class=\"interCol\">";
        toIns += CreateButton("Add", "javascript:AddFilterVal(this);", null);
        toIns += "</td></tr></table></td><td class=\"interCol\">";
        toIns += CreateButton("Remove", "javascript:Remove(this);", null);
        toIns += "</td></tr>";
        $(toIns).insertBefore(r);

        var rAbove = r.prev('.itemQuantity');
        var drop = rAbove.children('.filtName');
        drop.html(sel.children('option[selected=selected]').html());
    }
    else
        $('.filtInf').html('Invalid input.');
}

function SelectCatSubCat()
{
    var tab = $('.ovTable').attr('data-cat');
    
    if (typeof tab != "undefined") {
        catSel.children('option[selected=selected]').removeAttr('selected');
        catSel.children('option[value=' + tab + ']').attr('selected', 'selected');
        catSel.trigger('change');
        tab = $('.ovTable').attr('data-subcat');
        subcatSel.children('option[value=' + tab + ']').attr('selected', 'selected');
        $.ajax
            (
                {
                    type: "POST",
                    url: "Handler.asmx/LoadSubcategoryFilters",
                    data: { "subCatId": tab },
                    success: function (data) {
                        var txt = $(data).text();
                        var parsed = $.parseJSON(txt);
                        //If user haven't tampered then correct filter and order will already be selected.So we don't need to update it separately.

                        AddFiltersToDropDown(parsed.arr);
                        SaveState();
                    },
                    error: function (jqXHR, textStatus) {
                        alert(jqXHR.statusText);
                    }
                }
            )
    }
    else
        first = false;
}

function ValidateOverview()
{
    var itName = itNameBox.val();
    var brName = brandNameBox.val();
    var price = priceBox.val();
    var cat = catSel.val();
    var ovView = overViewBox.val();
    var quantity = quanBox.val();
    var itId=$('.ovTable:first').attr('data-itemID');
    var inf= $('.ovInf:first');

    if ((primaryImage != null || typeof itId != "undefined") && NamingChecks(100, 2, cat, inf) && NamingChecks(100, 2, brName, inf) && NamingChecks(150, 2, itName, inf) && NamingChecks(5000, 0, ovView, inf) && IsCorrectNumber(price) && IsCorrectNumber(quantity))
    {
        inf.html('');
        return true;
    }
    else
    {
        inf.html('Invalid input');
        return false;
    }
}

function DisplayAdditionalImg(img,path)
{
    var toRet = "<div data-identifier=\"" + path + "\" class=\"itemAdditionalImg\"><div><img class=\"image itemImg\" src=\"" + img + "\" /></div><div>";
    toRet+=CreateButton("Remove","javascript:RemoveAdditionalImage(this);",null);
    toRet += "</div></div>";
    return toRet;
}

function RemoveAdditionalImage(elem) {
    var par = $(elem).parent().parent('.itemAdditionalImg');
    var id = par.attr('data-identifier');
    
    if(typeof id=="undefined")//Image on server.
    {
        par.css('display', 'none');
        par.attr('data-rem', 'true');
    }
    else
    {
        for(var x=0;x<additionalImages.length;++x)
        {
            if(additionalImages[x].id==id)
            {
                par.remove();
                additionalImages.splice(x, 1);
                break;
            }
        }
    }
};

function Remove(elem)
{
    var par = $(elem).parent().parent('tr');

    if(par.attr('data-added')=="true")
        par.remove();
    else
    {
        par.attr('data-rem', 'true');
        par.css('display', 'none');
    }
}

function AddFeature(elem)
{
    var txt = $(elem).parent().siblings('td:first-child').children('input').val();
    var inf = $('.feaInf:first');

    if (NamingChecks(500, 2, txt, inf))
    {
        inf.html('');
        var htm = "<tr class=\"itemQuantity\" data-added=\"true\"><td class=\"featureVal\">" + txt + "</td><td class=\"interCol\">";
        htm += CreateButton("Remove", "javascript:Remove(this);", null);
        htm += "</td></tr>";
        $(htm).insertBefore(featureBefore);
    }
}

function AddSpecVal(elem)
{
    var txt = $(elem).parent().siblings('td:first-child').children('input').val();
    var inf = $('.specInf:first');

    if (NamingChecks(1000, 2, txt, inf)) {
        var insBefore = $(elem).parent().parent('tr').parent().children('tr:last-child');
        inf.html('');
        var htm = "<tr data-added=\"true\"><td class=\"specVal\">"+txt+"</td><td class=\"interCol\">";
        htm += CreateButton("Remove", "javascript:Remove(this);", null);
        htm += "</td></tr>";
        $(htm).insertBefore(insBefore);
    }
}

function AddSpecName(elem)
{
    var txt = $(elem).parent().siblings('td:first-child').children('input').val();
    var inf = $('.specInf:first');

    if (NamingChecks(100, 2, txt, inf)) {
        inf.html('');
        var htm = "<tr class=\"itemQuantity\" data-added=\"true\"><td class=\"specName\">" + txt + "</td><td class=\"specValCol\"><table class=\"specValTable\" cellspacing=\"0\"><tr><td class=\"specVal\"><input type=\"text\" class=\"inputTextBox\" /></td><td class=\"interCol\">";
        htm += CreateButton("Add", "javascript:AddSpecVal(this);", null);
        htm += "</td></tr></table></td><td class=\"interCol\">";
        htm += CreateButton("Remove", "javascript:Remove(this);", null);
        htm+="</td></tr>";
        $(htm).insertBefore(specBefore);
    }
}