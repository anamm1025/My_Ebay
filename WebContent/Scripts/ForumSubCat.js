$('document').ready(function () {
    Master();
    LoadDropDowns();
});

$(window).load(function () {
    OnMasterLoad();
});

function LoadDropDowns() {
    var cat = $('.curCat:first').html();
    var sCat = $('.curSubcat:first').attr('data-id');

    $('.mCat').each(function () {
        var correspondingSubCat = $(this).parent('span').parent('span').next().children('span').children('.mSCat');
        AttachEventToCatsSelectorsWithActualSelector($(this), correspondingSubCat, false, false, false);

        $(this).children('option[value=' + cat + ']').attr('selected', 'selected');
        $(this).trigger('change');
        correspondingSubCat.children('option[value=' + sCat + ']').attr('selected', 'selected');
    });
}

function QuestionMove(elem)
{
    var qid = $(elem).attr('data-id');
    var sid = $(elem).parent('span').prev('span').children('span').children('select').val();
    
    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/MoveQuestion",
                data: { "strQid": qid ,"strSc" : sid},
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

function QuestionStatusChanged(elem) {
    var qid = $(elem).attr('data-id');
    var stat = $(elem).val();

    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/QuestionStatusChanged",
                data: { "strQid": qid, "newStat": stat },
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

function QuestionRemoved(elem)
{
    var qid = $(elem).attr('data-id');
        
    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/QuestionRemoved",
                data: { "strQid": qid },
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