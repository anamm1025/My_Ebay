$('document').ready(function () {
    Master();
    AttachEventToCatsSelectors('.categoryList', '.subCatList', false, false, false);

    $('#subReq').click(function () {
        var sCatId = $('.subCatList').val();
        var topic = $('td:last-child .qTopic:first').val();
        var text = $('td:last-child .quesText:first').val();
        var correct = false;
        

        if (IsCorrectNumber(sCatId) && NamingChecks(200, 2, topic))
        {
            if (text.length > 10)
                correct = true;
        }
        if (correct) {
            $('.newQuestInf:first').html('')
            $.cookie('newQuestSCat', sCatId);
            $('.quesServer').click();
        }
        else
        {
            $('.newQuestInf:first').html('There were errors in request.');
        }
            
    });
});

$(window).load(function () {
    OnMasterLoad();
});