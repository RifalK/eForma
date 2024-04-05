$('#postule-user').click(function(){
    var logo = $('#logo').val();
    var name = $('#name').val();
    var lieu = $('#lieu').val();
    var postname = $('#postname').val();
    var typestage = $('#typestage').val();
    var tempstage = $('#tempstage').val();;
    var AgreeIterm = $('#AgreeIterm');


    if(logo != ""){
       $('#logo').removeClass('is-invalid');
       $('#logo').addclass('is-invalid');
       $('#error-postule-logo').text("")


       if(name != ""){
           $('#name').removeClass('is-invalid');
           $('#emanameil').addclass('is-invalid');
           $('#error-postule-name').text("")


           if(lieu = ""){
               $('#lieu').removeClass('is-invalid');
               $('#lieu').addclass('is-invalid');
               $('#error-postule-lieu').text("")

               if(postname = ""){
                   $('#postname').removeClass('is-invalid');
                   $('#postname').addclass('is-invalid');
                   $('#error-postule-postname').text("")

                   if(typestage = ""){
                       $('#typestage').removeClass('is-invalid');
                       $('#typestage').addclass('is-invalid');
                       $('#error-postule-typestage').text("")

                       if(tempstage = ""){
                           $('#tempstage').removeClass('is-invalid');
                           $('#tempstage').addclass('is-invalid');
                           $('#error-postule-tempstage').text("")

                                    if(AgreeIterm.is(':checked')){
                                        $('#AgreeIterm').removeClass('is-invalid');
                                        $('#error-register-AgreeIterm').text('')

                                    }else{
                                         $('#AgreeIterm').addclass('is-invalid');
                                         $('#error-register-AgreeIterm').text('You should agree our terms and conditions!')
                                    }

                                            //alert('You data is send');

                                            $('#form-postule').submit();
                        }else{
                             $('#tempstage').addclass('is-invalid');
                             $('#tempstage').removeClass('is-invalid');
                             $('#error-postule-tempstage').text(" duration is invalid")
                        }

                    }else{
                        $('#typestage').addclass('is-invalid');
                        $('#typestage').removeClass('is-invalid');
                        $('#error-postule-typestage').text("Your profil is invalid")
                    }

               }else{
                   $('#postname').addclass('is-invalid');
                   $('#postname').removeClass('is-invalid');
                   $('#error-postule-postname').text("Your postname is invalid")
               }

            }else{
               $('#lieu').addclass('is-invalid');
               $('#lieu').removeClass('is-invalid');
               $('#error-postule-lieu').text(" the localisation is invalid")
            }

        }else{
           $('#name').addclass('is-invalid');
           $('#name').removeClass('is-invalid');
           $('#error-postule-name').text("name is invalid")
        }

    }else{
       $('#logo').addclass('is-invalid');
       $('#logo').removeClass('is-invalid');
       $('#error-postule-logo').text("logo is invalid")

    }

});

$('#AgreeIterm').change(function(){
   var AgreeIterm = $('#AgreeIterm');

   if(AgreeIterm.is(':checked')){
       $('#AgreeIterm').removeClass('is-invalid');
       $('#error-register-AgreeIterm').text('')

   }else{
       $('#AgreeIterm').addclass('is-invalid');
       $('#error-register-AgreeIterm').text('You should agree our terms and conditions!')
   }

});
