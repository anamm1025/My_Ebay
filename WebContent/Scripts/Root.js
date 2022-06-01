function Master() 
{
    var menuSync = false;
    var curSelTab = null;
    SetTopMenu();
    AttachEventToCatsSelectors('#searchCatDropDown', '#searchSubcatDropDown', true, false, true);

    SetSearchSelected();
    function SetSearchSelected() {
        var logSect = $('.loginSection:first');
        if (typeof logSect.attr('data-txt') != "undefined") {
            var cat = logSect.attr('data-cat');
            var sc = logSect.attr('data-scat');
            var txt = logSect.attr('data-txt');
            $('#searchCatDropDown').children('option[value=' + cat + ']').attr('selected', 'selected');
            $('#searchCatDropDown').trigger('change');
            $('#searchSubcatDropDown').children('option[value=' + sc + ']').attr('selected', 'selected');
            $('.searchTextBox:first').val(txt);
        }
    }

    function SetTopMenu()
    {
        var topCatsInfo = $('.loginSection .hidden[data-top=true]');
        var container = $('#catDispDiv');
        container.html('');

        topCatsInfo.each(function()
        {
            var menuItem = "<div class=\"integratedDiv\">" + $(this).data('categoryname') + "<div style=\"display : none\">";
            var subCats = $(this).children().not('[value=-1]');

            var count = 0;

            subCats.each(function () {
                if (count % 5 == 0)
                {
                    if(count != 0)
                        menuItem += "</div>";

                    menuItem += "<div>";
                }    
                
                menuItem += "<a href=\"Categorypage.aspx?sc=" + $(this).val() + "\">" + $(this).html() + "</a>";
                count++;
            });

            if(count%5!=5)
                menuItem += "</div>";

            menuItem += "</div></div>";
            container.append(menuItem);
        })
    }

    $('.categories .integratedDiv').mouseover(function () {
        if (curSelTab != null)
            curSelTab.removeClass('hoverIntegratedStyle');

        menuSync = true;
        var cont = $('div.subCategoryHoverMenu:first');

        curSelTab = $(this);
        curSelTab.addClass("hoverIntegratedStyle");
        cont.html($(this).children("div").html());
        $('.subCategoryHoverMenu').slideDown();
    });

    $('.searchTextBox').focusin(function () {
        $('.searchTextBox').val('');
    });

    $('.searchTextBox').focusout(function () {
        if ($('.searchTextBox').val() == '') {
            $('.searchTextBox').val('Search');
        }
    });

    $('.loginBut').click(function () {
        if ($('.loginHover').css('display') == 'none') {
            $('.loginHover input').val('');
            $('.loginHover .informer').html('');
            $('.loginHover').fadeIn();
        }
        else
        {
            var em = $('#loginERow input').val();
            var pass = $('#loginPRow input').val();

            var infMsg = "Invalid email or password.";
            if (checkEmail(em) && checkPasswordUsingString(pass) == '')
            {
                $('.lReq').click();
                return;
            }

            $('.loginHover .informer').html(infMsg);
        }
    });

    $('.loginHover img').click(function () {//Close login hover
        $('.loginHover').fadeOut();
    });

    $('.subCategoryHoverMenu').mouseleave(function () {
        menuSync = false;
        setTimeout(HideMenu, 150);
    });

    $('.subCategoryHoverMenu').mouseenter(function () {
        menuSync = true;
    });

    function HideMenu() {
        var cont = $('.subCategoryHoverMenu');
        if (!menuSync) {
            if(curSelTab!=null)
                curSelTab.removeClass('hoverIntegratedStyle');
            curSelTab = null;
            cont.slideUp();
        }
    }

    $('.integratedDiv').mouseout(function () {
        menuSync = false;
        setTimeout(HideMenu, 300);
    });

    $('.tabDescriptor').click(function () {
        var toHide = $('.tabHeaders').children().index($('.selTab'));
        $('.selTab').removeClass('selTab');
        $(this).addClass('selTab');
        var indToLoad=$('.tabHeaders').children().index(this);
        
        $($('.tabsContentContainer').children().get(toHide)).css('display', 'none');
        $($('.tabsContentContainer').children().get(indToLoad)).css('display', 'block');
    });

    function TabsInit()
    {
        var tab = $('.tabHeaders .tabDescriptor:visible:first').eq(0);
        tab.addClass('selTab');
        $($('.tabsContentContainer').children().get($('.tabHeaders').children().index(tab))).css('display', 'block');
    }

    TabsInit();
}

function OnMasterLoad()
{
    var searchImgDim = GetAttrInInt('.searchSection img', 'height');
    $('.searchSection img').css('height', searchImgDim - 2);
    $('.searchSection img').css('width', searchImgDim);
    $('.searchTextBox').css('padding-right', searchImgDim + 3);
    var catSecHeight = GetAttrInInt('#catSection', 'height');
    $('.integratedDiv').css('height', catSecHeight);
    
}

function OnAdsLoad()
{
    var totalFeatured = 0;
    var curFeaturedImg = 0;
    var recentItemCount = 3;
    var mostSellingItemCount = 2;
    var totalHeight = GetAttrInInt('.adsContainerCollection', 'height');
    var totalWidth = GetAttrInInt('.adsContainerCollection', 'width');
    InitializeFeaturedAds(totalHeight, totalWidth);
    InitializeMostSellingAds(totalHeight, totalWidth);
    InitializeRecentAds(totalHeight, totalWidth);
    setTimeout(slideRecent, 15000);

    $('#recentUpArrow').click(function () {
        shiftRecentUp();
    });

    $('#recentDownArrow').click(function () {
        shiftRecentDown();
    });

    function shiftMostSellingRight() {
        if ($('.mostSellingItem').length > mostSellingItemCount) {
            var up = $('.mostSellingItemCollection').children().first();
            up.animate({ 'width': 'toggle' }, function () {
                $('.mostSellingItemCollection').append(up);

                var x = $('.mostSellingItem');
                $(x[mostSellingItemCount - 1]).animate({ 'width': 'toggle' });
            });
        }
    };

    function shiftMostSellingLeft() {
        if ($('.mostSellingItem').length > mostSellingItemCount) {
            var x = $('.mostSellingItem');
            var width = $('.mostSellingItem').css('width');
            $(x[mostSellingItemCount - 1]).animate({
                'width': 'toggle',
            }, function () {
                var up = $('.mostSellingItemCollection').children().last();
                $('.mostSellingItemCollection').prepend(up);
                up.animate({
                    'width': 'toggle',
                });
            });

        }
    };

    $('#mostSellingRightArrow').click(function () {
        shiftMostSellingRight();
    });

    $('#mostSellingLeftArrow').click(function () {
        shiftMostSellingLeft();
    });

    function slideRecent() {
        shiftRecentDown();
        setTimeout(slideRecent, 15000);
    }

    function shiftRecentDown() {
        if ($('.recentItem').length > recentItemCount) {
            var up = $('.recentItemCollection').children().first();
            up.slideUp('normal', function () {
                $('.recentItemCollection').append(up);
            });

            var x = $('.recentItem');
            $(x[recentItemCount]).slideDown();
        }
    };

    function shiftRecentUp() {
        if ($('.recentItem').length > recentItemCount) {
            var x = $('.recentItem');
            $(x[recentItemCount - 1]).slideUp();
            var up = $('.recentItemCollection').children().last();
            $('.recentItemCollection').prepend(up);
            up.slideDown();
        }
    };

    function AutoFeaturedItems()
    {
        var clicked = (curFeaturedImg + 1) % totalFeatured;
        ChangeFeaturedImg(clicked);
        setTimeout(AutoFeaturedItems, 10000);
    }

    function InitializeFeaturedAds(AdsHeight, AdsWidth) {
        $('.featuredAdsContainer').css('width', (AdsWidth - $('.recentlyAddedContainer').outerWidth() - 15) + 'px');
        var headerHeight = $('.featuredAdsContainer .containerHeader').outerHeight();
        $('.featuredItemsCollection').css('height', GetAttrInInt('.featuredAdsContainer', 'height') - headerHeight);

        //Displaying first image.
        var img = $('.featuredItem');
        $(img[0]).fadeIn();

        //Adding selectors.
        totalFeatured = img.length;
        var selectorDiv = '<div class="featureImgSelector" />';
        var toApp = '';
        for (var x = 0; x < img.length; ++x) {
            toApp += selectorDiv;
        }
        $('.featuredImageSelectorContainer').html(toApp);
        $('.featureImgSelector').css('height', $('.featureImgSelector').css('width'));
        var selectors = $('.featureImgSelector');
        $(selectors[curFeaturedImg]).addClass('selectedFeatureImgSelector');
        setTimeout(AutoFeaturedItems, 10000);
        //Binding click event to selectors.
        $('.featureImgSelector').click(function () {
            var clickedIndex = selectors.index(this);
            ChangeFeaturedImg(clickedIndex);
        });
    };

    function ChangeFeaturedImg(clickedIndex) {
        if (curFeaturedImg != clickedIndex) {
            var selectors = $('.featureImgSelector');
            var image = $('.featuredItem');
            $(selectors[curFeaturedImg]).removeClass('selectedFeatureImgSelector');
            $(image[curFeaturedImg]).fadeOut(1000);
            curFeaturedImg = clickedIndex;
            $(selectors[curFeaturedImg]).addClass('selectedFeatureImgSelector');
            $(image[curFeaturedImg]).fadeIn(1000);
        }
    }

    function InitializeMostSellingAds(AdsHeight, AdsWidth) {
        var featuredAdsHeight = GetAttrInInt('.featuredAdsContainer', 'height');
        var featuredAdsWidth = GetAttrInInt('.featuredAdsContainer', 'width') + GetAttrInInt('.featuredAdsContainer', 'border-left-width');
        var totalHeight = AdsHeight - featuredAdsHeight - 10;
        var headerHeight = $('.mostSellingItemAds .containerHeader').outerHeight();
        var containerHeight = totalHeight - headerHeight - GetAttrInInt('.mostSellingItemAds', 'border-top-width') - GetAttrInInt('.mostSellingItemAds', 'border-bottom-width');
        var arrowsWidth = $('.mostSellingArrow').outerWidth();
        arrowsWidth += arrowsWidth;

        $('.mostSellingItemAds').css('width', featuredAdsWidth);
        $('.mostSellingItemAds').css('height', totalHeight);
        $('.mostSellingContentContainer').css('height', containerHeight);

        var mostSellingOutermostContainerWidth = GetAttrInInt('.mostSellingContentContainer', 'width');
        var collectionWidth = mostSellingOutermostContainerWidth - arrowsWidth - 1;
        var perItemWidth = collectionWidth / mostSellingItemCount;
        perItemWidth -= GetAttrInInt('.mostSellingItem', 'border-right-width');

        $('.mostSellingItemCollection').css('width', collectionWidth + 'px');
        $('.mostSellingItemCollection').css('height', containerHeight);
        $('.mostSellingItem').css('width', perItemWidth + 'px');

        var its = $('.mostSellingItem');
        for (var x = 0; x != mostSellingItemCount; ++x) {
            $(its[x]).fadeIn();
        }
    };

    function InitializeRecentAds(AdsHeight, AdsWidth) {
        var recentHeaderHeight = $('#recentSliderHeader').outerHeight();
        var arrowHeight = GetAttrInInt('.recentItemArrow', 'height');
        var totalItemContainerHeight = AdsHeight - recentHeaderHeight - arrowHeight - arrowHeight;

        $('.recentItemCollection').css('height', totalItemContainerHeight + 'px');

        var heightPerItem = (totalItemContainerHeight) / recentItemCount;
        var extra = GetAttrInInt('.recentItem', 'padding-top') + GetAttrInInt('.recentItem', 'padding-bottom') + GetAttrInInt('.recentItem', 'margin-bottom');
        $('.recentItem').css('height', (heightPerItem) + 'px');

        //Displaying necessary
        var its = $('.recentItem');
        for (var x = 0; x != recentItemCount; ++x) {
            $(its[x]).fadeIn();
        }

        //Setting image width=height
        var heightImg = $('.recentItem img').outerHeight();

        $('.recentItem img').css('width', heightImg);
    };
}

function OnCategoryItemsLoad()
{
    var itWidth = GetAttrInInt('.item', 'width');
    var imgWidth = GetAttrInInt('.item .itemImg', 'width');
    var iteractionWidth = GetAttrInInt('.itPrice', 'width');
    var describerWidth = itWidth - imgWidth - iteractionWidth - GetAttrInInt('.itemDescriber', 'padding-left') - 20 - GetAttrInInt('.itemDescriber', 'padding-right');
    $('.itemDescriber').css('width', describerWidth);
    $('.itPrice div').css('width', iteractionWidth);

    var imgButHeightWidth = $('.itemInteractionButton').outerHeight();
    $('.imgButtonsContainer').css('height', imgButHeightWidth);
    $('.imgButtonsContainer').css('width', imgButHeightWidth);
}


function OnItemPageLoad()
{
    var mImgWidth = GetAttrInInt('.itemImg.mainImg', 'width');
    $('.itemImg.mainImg').css('height', mImgWidth);

    var smalImgWidth = (mImgWidth - (GetAttrInInt('#imgSection div img', 'margin-right') * 4)-24) / 4;
    $('#imgSection div img').css('width', smalImgWidth).css('height', smalImgWidth);
    var imgButHeightWidth = $('.itemInteractionButton').outerHeight();
    $('.imgButtonsContainer').css('height', imgButHeightWidth);
    $('.imgButtonsContainer').css('width', imgButHeightWidth);
}

function GetAttrInInt(element, cssProp) {
    return parseFloat($(element).css(cssProp));
};

function AttachCommonUserInfoTextEvents() {
    $('#contactRow input').change(function () {
        var inp = $(this).val();
        CheckNumber(inp);
    });

    $('#nameRow input').change(function () {
        var name = $(this).val();
        var inf = $(this).siblings('.informer');
        var infMsg = 'Must have 0-60 characters consisting of alphabets,digts and spaces.';
        if (CheckName(name)) {
            infMsg = '';
        }

        inf.html(infMsg);
    });

    function CheckMatch() {
        var pass = $('#passRow input').val();
        var cPass = $('#confirmPassRow input').val();
        if (pass.length != 0 && cPass.length != 0) {
            if (pass != cPass)
                $('#confirmPassRow .informer').html("Passwords don't match.");
        }
    }

    //Used on passwords where they must match.Used in Change setting and Registration page.
    $('.matchPass input[type=password]').change(function () {
        var inf = $(this).siblings('.informer');
        var pass = $(this).val();
        var msg = checkPasswordUsingString(pass);
        inf.html(msg);

        if (pass.length == 0)
            inf.html('');
        else if ($('#confirmPassRow .informer').html().length == 0 && $('#passRow .informer').html().length == 0)
            CheckMatch();
    });
};

function CheckName(name) {
    var regEx = /^[a-z0-9 _-]{0,60}$/gi;
    return regEx.test(name);
}

//Used in registration and changeProfile pages
function CheckNumber(num)//-,_,space and digits allowed.Length {0-100}
{
    var regExString = /^([0-9 _+#*\-]){7,30}$/g;
    var ret = regExString.test(num);
    str = 'Enter valid phone number.';

    if (ret)
        str = '';

    $('#contactRow .informer').html(str);
    return ret;
}

//Used in login and registration page.
function checkEmail(email) {
    if (email.length < 6 || email.length > 100)
        return false;

    var regExString = /^([0-9a-z-_.]+[@]{1}[0-9a-z-_.]+[.]{1}[a-z0-9]+)$/gi;
    return regExString.test(email);//Start with digits or alphabets containing exactly 1 @ between and atleast 1 . and some characters after last .
}

function checkPasswordUsingString(password) {//Returns informer message.
    var toRet = 'You must enter password of 6 to 25 characters containing atleast 1 character and number.';

    if (password.length > 5 && password.length < 26) {
        var regEx = /([a-z]{1,}[0-9]{1,})|([0-9]{1,}[a-z]{1,})/gi;
        if (regEx.test(password))
            toRet = '';
    }

    return toRet;
};

function CheckPasswordValidity() {
    var pass = $('#passRow input').val();
    var cPass = $('#confirmPassRow input').val();
    var passMsg = checkPasswordUsingString(pass);
    var cPassMsg = checkPasswordUsingString(cPass);

    $('#passRow .informer').html(passMsg);
    if (passMsg.length == 0 && cPassMsg.length == 0) {
        if (pass != cPass)
            cPassMsg = "Passwords don't match.";
    }

    $('#confirmPassRow .informer').html(cPassMsg);
    return (cPassMsg.length == 0);
}

function AttachEventToCatsSelectors(catSelector, subCatSelector, loadAllCatName, loadEmptyCatName, loadAllInSubCat) {
    var catContainer = $(catSelector);
    var subCatContainer = $(subCatSelector);
    AttachEventToCatsSelectorsWithActualSelector(catContainer, subCatContainer, loadAllCatName, loadEmptyCatName, loadAllInSubCat);
}

function AttachEventToCatsSelectorsWithActualSelector(catContainer, subCatContainer, loadAllCatName, loadEmptyCatName, loadAllInSubCat) {
    catContainer.attr('data-allinsubcats', loadAllInSubCat);
    var filteredCats = $('.loginSection:first').children('select.hidden');
    var sel = false;

    if (loadEmptyCatName == false)
        filteredCats = filteredCats.not('[data-empty=true]');
    if (loadAllCatName == true) {
        catContainer.append("<option selected=\"selected\" value=\"-1\">All</option>");
        sel = true;
    }

    filteredCats.each(function () {
        var str = "<option value=\"" + $(this).data('categoryname') + "\"";

        if (!sel)
            str += " selected=\"selected\"";

        str += ">" + $(this).data('categoryname') + "</option>";
        catContainer.append(str);
    });

    //Now attaching change event.
    catContainer.change(function () {
        var showAll = $(this).data('allinsubcats');
        var selectedValue = $(this).val();
        LoadinSubCatsDropDown(subCatContainer, showAll, selectedValue);
    });

    catContainer.trigger("change");
}

function LoadinSubCatsDropDown(subCatSelector, showAll, selectedValue)
{
    var subCatItems = $('.loginSection:first').children('.hidden[data-categoryname=' + selectedValue + "]'");
    subCatSelector.html(subCatItems.html());

    if (selectedValue == "-1")
    {
        subCatSelector.css('display', 'none');
        subCatSelector.prev('.listDescriber').css('display', 'none');
    }
    else
    {
        subCatSelector.css('display', 'inline');
        subCatSelector.prev('.listDescriber').css('display', 'inline');
        if (showAll == false)
            subCatSelector.children()[0].remove();
    }
    
    subCatSelector.trigger("change");
}

function CreateButton(text, func, disp) {
    var but = "<div class=\"itemInteractionButton\" onclick=\"" + func + "\" ";

    if (disp != null)
        but += "style=\"display : " + disp + "\"";

    but += ">" + text + "</div>";

    return but;
}

function NamingChecks(maxLen, minLen, str, inf) {
    var toRet = true;

    if (str.length < minLen || str.length > maxLen)
        toRet = false;
    else {
        var regex = /^[a-z 0-9_.,?()-]{0,}$/gi;
        toRet = regex.test(str);
    }

    if (typeof inf != "undefined")
        inf.html("Invalid input");

    return toRet;
}

function SearchItem() {
    var txt = $('.searchTextBox:first').val();

    if (txt == 'Search')
        txt = '';

    var cat = $('.searchCatDropDown:first').val();
    var subDrop = $('.searchSubcatDropDown:first');
    var sc = -1;

    if (subDrop.css('display') != 'none')
        sc = subDrop.val();

    $(location).attr('href', 'CategoryPage.aspx?cat=' + cat + '&sc=' + sc + '&search=' + txt);
}

function IsCorrectNumber(str) {
    var regex = /^[0-9.]{1,}$/i;
    return regex.test(str);
}

function AddItemToCart(elem)
{
    var but = $(elem);
    var id = but.parent('div').parent('div').attr('data-id');
    var quanBox = but.siblings('.quantityTextBox').children('input');
    var quan = quanBox.val();
    AddToCartActual(id, quan, but, quanBox)
}

function AddToCartActual(itId, quan, but, quanBox) {
    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/AddItemToCart",
                data: { "strItID": itId, "strQuan": quan },
                contenttype: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    but.remove();
                    quanBox.css('visibility', 'hidden');
                },
                error: function (jqXHR, textStatus) {
                    alert(jqXHR.statusText);
                }
            }
        )
}

function AddToCompareList(elem) {
    var parentCont = $(elem).parent('div').parent('div');
    var id = parentCont.attr('data-id');

    if (typeof id == "undefined")
        id = parentCont.parent('div');

    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/AddItemToComparelist",
                data: { "strItid": id },
                contenttype: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    if ($(data).text() == "")
                        elem.remove();
                    else
                        alert($(data).text());
                },
                error: function (jqXHR, textStatus) {
                    alert(jqXHR.statusText);
                }
            }
        )
}

function AddToWishlist(elem)
{
    var div = $(elem).parent('div').parent('div');
    var id = div.attr('data-id');

    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/AddToWishList",
                data: { "strItID": id },
                contenttype: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    if ($(data).text() == "")
                        elem.remove();
                    else
                        alert($(data).text());
                },
                error: function (jqXHR, textStatus) {
                    alert(jqXHR.statusText);
                }
            }
        )
}

function RemoveItem(elem)
{
    var parentCont=$(elem).parent('div').parent('div');
    var id = parentCont.attr('data-id');
    if (typeof id == "undefined")
        id = parentCont.parent('div').attr('data-id');

    
    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/RemoveItem",
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