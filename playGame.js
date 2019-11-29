
$(document).ready(function () {
    $('#showGame').hide();
    $("#playButton").on('click', function() {
        $('#showGame').unhide();
    });
});