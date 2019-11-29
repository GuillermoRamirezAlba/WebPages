
$(document).ready(function () {
    $('#err').hide();
    $('#submit').click(function (e) {
        var err = '';
        var warning = '<span class="glyphicon glyphicon-exclamation-sign"></span>';
        var $fname = $('#firstname');
        var $lname = $('#lastname');
        var $email = $('#email');
        var $phone = $('#phone');
        var $startdate = $('#startdate');
        var $enddate = $('#enddate');

        if ($fname.val() == "") {
            err += warning + " Missing First Name<br>";
            $fname.addClass('alert-danger');
        }

        if ($lname.val() == "") {
            err += warning + " Missing Last Name<br>";
            $lname.addClass('alert-danger');
        }

        if ($email.val() == "") {
            err += warning + " Missing Email<br>";
            $email.addClass('alert-danger');
        }

        if ($phone.val() == "") {
            err += warning + " Missing Phone Number<br>";
            $phone.addClass('alert-danger');
        }

        if ($startdate.val() == "") {
            err += warning + " Missing Start Date<br>";
            $startdate.addClass('alert-danger');
        }

        if ($enddate.val() == "") {
            err += warning + " Missing End Date<br>";
            $enddate.addClass('alert-danger');
        }

        if ($enddate.val() < $startdate.val()) {
            err += warning + " End date must be after the Start Date<br>";
            $enddate.addClass('alert-danger');
        }
        $currentdate = Date();
        if (new Date($startdate.val()).getTime() < new Date($currentdate).getTime()) {
            err += warning + " Start date must be after today's date";
            $enddate.addClass('alert-danger');
        }

        if (err !== '') {
            $('#err').html(err).slideDown(600);
            e.preventDefault();
        }

        else {
            $('#reservationtitle').html('');
            $('#pleasetitle').html('');
            $('#content').attr('class', 'panel-group');
            $('#content').html('<br><br><br><br><div class="panel panel-primary"><div class="panel-heading"><h4 style="text-align:center;font-size:30px;">Reservation submitted.'
                + '</h4></div>'
                + '<div class="panel-body"><p style="text-align:center;color:black;">Thank you, '  + $fname.val() + " " + $lname.val() + '<br>' 
                + 'Your reservation will be between <br>' +  $startdate.val() + ' and  ' + $enddate.val() + '.<br><br>' + 'Expect a call from us soon!' 
                + '</p></div></div><br><br><br><br><br><br><br><br>');
        }
    });

    $('input:text').focus(function () {
        $(this).removeClass('alert-danger');
    });

    $('#email').focus(function () {
        $(this).removeClass('alert-danger');
    });

    $('#phone').focus(function () {
        $(this).removeClass('alert-danger');
    });

    $('#startdate').focus(function () {
        $(this).removeClass('alert-danger');
    });

    $('#enddate').focus(function () {
        $(this).removeClass('alert-danger');
    });
});