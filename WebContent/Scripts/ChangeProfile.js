$('document').ready(function () {
    Master();
});

$(window).load(function () {
    OnMasterLoad();
    AttachCommonUserInfoTextEvents();//Attach event to validation.Found in Root.js

    function checkPasswordsUsingRow(row) {
        var password = $('#' + row + ' input').val();
        var returned = checkPasswordUsingString(password);
        $('#' + row + ' .informer').html(returned);
        return returned.length == 0;
    }

    $('#prePassRow input').change(function () {
        if ($('#prePassRow input').val().length == 0)
            $('#prePassRow .informer').html('');
        else
            checkPasswordsUsingRow("prePassRow");
    })

    $('#upSetting').click(function () {
        var correctPass = true;
        var cPrePass = true;
        var cSN = CheckName($('#nameRow input').val());

        //If any 3 of password text box not empty, then user must provide correct values of all three.
        if ($('#passRow input').val().length != 0 || $('#confirmPassRow input').val().length != 0 || $('#prePassRow input').val().length!=0)
        {
            correctPass = CheckPasswordValidity();
            cPrePass = checkPasswordsUsingRow("prePassRow");
        }

        var cCont = CheckNumber($('#contactRow input').val());//Contact can't be empty.

        if (correctPass && cPrePass && cSN && cCont)
            $('.updateSet').click();
    });

});