$('document').ready(function () {
    Master();

    $('.reqSubmit').click(function () {
        if (!NamingChecks(150, 2, $('.ITEM_NAME:first').val()) && !NamingChecks(100, 2, $('.Brand_Name:first').val())) {
            $('.reqPageInf').html('');
            $('.reqSubServer').click();
        }
        else
            $('.reqPageInf').html('Invalid item or brandname.');
    });
});

$(window).load(function () {
    OnMasterLoad();
});
