$('document').ready(function () {
    Master();

    AttachEventToCatsSelectors('#catFeatSel', '#subCatFeatSel', false, false, false);

    $('#subCatFeatSel').change(function () {
        var sc = $(this).val();
        $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/GetSubcategoryItems",
                data: { "strSc": sc },
                contenttype: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    var ar = $.parseJSON($(data).text()).arr;
                    var dropDown = $('#itemSelecter');;
                    var str = '';
                    $(ar).each(function () {
                        str+='<option value="' + this.id + '">' + this.name + '</option>';
                    });
                    dropDown.html(str);
                },
                error: function (jqXHR, textStatus) {
                    alert(jqXHR.statusText);
                }
            }
        )
    });

    $('input[type=file]').change(function () {
        toSend = null;
        if (this.files && this.files[0]) {
            var reader = new FileReader();

            toSend = this.files[0];
            reader.readAsDataURL(toSend);

            var imgDisplayer = $(this).parent('span').parent('td').siblings('td.imgCol').children('img');
            reader.onload = function (e) {
                imgDisplayer.css('display', 'block').attr('src', e.target.result);
            }
        }
    });

    //$('#priImageFile').change(function () {
    //    toSend = null;
    //    if (this.files && this.files[0]) {
    //        var reader = new FileReader();

    //        toSend = this.files[0];
    //        reader.readAsDataURL(toSend);

    //        reader.onload = function (e) {
    //            $('#newItImage').css('display', 'block').attr('src', e.target.result);
    //        }
    //    }
    //});

    $('#subCatFeatSel').trigger('change');
});

var toSend = null;

$(window).load(function () {
    OnMasterLoad();
});

function Contact(it,check,allow)
{
    if (toSend==null && !allow)
    {
        $('#feaInf').html('Please select a image.');
        return;
    }
        
    $('#feaInf').html('');
    var formData = new FormData();
    formData.append('image', toSend);
    formData.append('itID', it);
    formData.append('price', check);

    $.ajax(
        {
            ///server script to process data
            url: "FeaturedAdsHandler.ashx", //web service
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
                $(location).attr('href', $(location).attr('href'));
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

function AddFeaturedAd(elem)
{
    var it = $('#itemSelecter').val();
    
    if($('.featuredAdManagerTable:first tr[data-id='+it+']').length!=0)
        $('#feaInf').html('This item is already in list.');
    else
    {
        var check = false;
        if ($('#disp').filter(':checked').html() != null)
            check = true;

        $('#priImageFile').trigger('change');
        Contact(it, check,false);
    }
}

function RemoveAds(elem)
{
    var it = $(elem).parent('td').parent('tr.itemQuantity').attr('data-id');
    toSend = null;
    Contact(it, null,true);
}

function UpdateAds(elem)
{
    var it = $(elem).parent('td').parent('tr.itemQuantity').attr('data-id');
    $(elem).next('span').children('input').trigger('change');
    var checked = false;

    if ($(elem).parent('td').siblings('.defPriceTabCol').children('input').filter(':checked').html() != null)
        checked = true;
        

    Contact(it, checked,true);
}