$('document').ready(function () {
    Master();
});

$(window).load(function () {
    OnMasterLoad();
    OnItemPageLoad();
});

function AddComment(elem)
{
    var id = $('#itemInteractionContainer .itemInteraction').attr('data-id');
    $.ajax
       (
           {
               type: "POST",
               url: "Handler.asmx/AddComment",
               data: { "strItID": id, "text": $('.comText:first').val() },
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

function RemoveComment(elem) {
    var cont = $(elem).parent('div').parent('div');
    var id = cont.attr('data-id');

    $.ajax
       (
           {
               type: "POST",
               url: "Handler.asmx/RemoveComment",
               data: { "comId": id },
               contenttype: 'application/json; charset=utf-8',
               datatype: 'json',
               success: function (data) {
                   cont.remove();
               },
               error: function (jqXHR, textStatus) {
                   alert(jqXHR.statusText);
               }
           }
       )
}