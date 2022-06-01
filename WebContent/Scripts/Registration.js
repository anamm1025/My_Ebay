$('document').ready(function () {
    Master();
});

$(window).load(function () {
    OnMasterLoad();
    setTimeout(SuccessRedirect, 1000);

    function SuccessRedirect()
    {
        var url = $(location).attr('href');
        if (url.indexOf("stat=suc") != -1)
            location.href = 'homepage.aspx';
    }

    $('#resetBut').click(function () {
        $('.inputTable input').val('');
        $('.informer').html('');
    });

    function CheckAvail() {
        var def = $.Deferred();
        $.ajax
        (
            {
                type: "POST",
                url: "Handler.asmx/CheckAvail",
                data: { "uid": $('#emailRow input').val() },
                contenttype: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    var txt = $(data).text();
                    $('#emailRow .informer').html(txt);
                    def.resolve();
                },
                error: function (jqXHR, textStatus) {
                    alert("CheckAvail call"+jqXHR.statusText);
                    def.resolve();
                }
            }
        )
        return def;
    }

    function CheckEmailValidity()
    {
        var valE = checkEmail($('#emailRow input').val());
        var str = '';

        if (!valE)
            str = 'Plase enter valid email.';

        $('#emailRow .informer').html(str);
        var def = $.Deferred();
        if (valE)
        {
            CheckAvail().done(function () {
                def.resolve();
            });
        }
        else
            def.resolve();

        return def;
    }

    $('#emailRow input').change(function () {
        if ($(this).val().length != 0)//If something entered.
            CheckEmailValidity();
        else
            $(this).siblings('.informer').html('');
    });

    $('#submit').click(function () {//Also display if something not entered.
        var def=CheckEmailValidity();
        var correctPass = CheckPasswordValidity();
        var cSN = CheckName($('#nameRow input').val());

        //Contact checking
        var cCont = CheckNumber($('#contactRow input').val());//Function in Root.js
        var correctE;

        def.done(function () {
            correctE = ($('#emailRow .informer').html().length == 0);
            if (correctPass && correctE && cSN && cCont)
                $('.serverSub').click();
        })
    });

    AttachCommonUserInfoTextEvents();//Attach event to validation.Found in Root.js
});