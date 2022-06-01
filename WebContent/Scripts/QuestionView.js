$('document').ready(function () {
    Master();
});

$(window).load(function () {
    OnMasterLoad();
});

function submitPostClientClick()
{
    var txt = $('.inputTextBoxMultiline.inputTextBox').val();
    if (txt.length > 2) {
        $('.postInf:first').html('');
        $('.postSubServ:first').click();
    }
    else
        $('.postInf:first').html('Please enter some useful post.');
}

function MarkSolved()//Postback.DB shared
{
    $('.qSolved:first').click();
}

function MarkClosed()//Postback.DB shared
{
    $('.qClosed:first').click();
}

function RemoveQuest()//Postback.DB shared
{
    $('.qRemoved:first').click();
}

function RemovePost(elem)//Ajax
{
    var pid = $(elem).parent('div.postFooter').parent('.qPost').attr('data-id');
    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/PostRemoved",
                data: { "strPid": pid },
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

function MarkBest(elem)//Ajax
{
    var pid = $(elem).parent('div.postFooter').parent('.qPost').attr('data-id');
    var qid=$('.topPages:first').attr('data-qid');
    $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/MarkBest",
                data: { "strPid": pid,"strQid" : qid },
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