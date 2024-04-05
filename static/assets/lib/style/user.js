// La recuperation des elements

const form = document.querySelector("#form-register");
const username = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password-confirm');

// Evenements
form.addEventListener('submit',e=>{
    e.preventDefault();

    form_verify();
})

// Fonstions
function form_verify() {
    // Obtenir toutes les valeurs des inputs
    const userValue = username.value.trim();
    const emailValue = email.value.trim();
    const pwdValue = password.value.trim();
    const pwd2Value = password2.value.trim();

    // Username verify
    if (userValue === "") {
        let message ="Username ne peut pas être vide";
        setError(username,message);
    }else if(!userValue.match(/^[a-zA-Z]/)){
        let message ="Username doit commencer par une lettre";
        setError(username,message)
    }else{
        let letterNum = userValue.length;
        if (letterNum <= 3) {
            let message ="Username doit avoir au moins 3 caractères";
            setError(username,message)
        } else {
            setSuccess(username);
        }
    }

    // email verify
    if (emailValue === "") {
        let message = "Email ne peut pas être vide";
        setError(email,message);
    }else if(!email_verify(emailValue)){
        let message = "Email non valide";
        setError(email,message);
    }else{
        setSuccess(email)
    }

    // password verify
    if (pwdValue ==="") {
        let message ="Le passeword ne peut pas être vide";
        setError(password,message)
    }else if(!password_verify(pwdValue)){
        let message = "Le mot de passe est trop faible (8 à 12 caractères)";
        setError(password,message)
    }else{
        setSuccess(password);
    }
    // pwd confirm
    if (pwd2Value ==="") {
        let message ="Le passeword confirm ne peut pas être vide";
        setError(password2,message)
    }else if( pwdValue !== pwd2Value){
        let message ="Les mot de passes ne correspondent pas";
        setError(password2,message)
    }else{
        setSuccess(password2)
    }
}

function setError(elem,message) {
    const col_md_12 = elem.parentElement;
    const small = col_md_12.querySelector('small');

    // Ajout du message d'erreur
    small.innerText = message

    // Ajout de la classe error
    col_md_12.className = "col-md-12 error";
}

function setSuccess(elem) {
    const col_md_12 = elem.parentElement;
    col_md_12.className ='col-md-12 success'
}

function email_verify(email) {
    /*
    * r_rona.22-t@gmail.com
        /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    */
    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
}
function password_verify(passeword) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(passeword);
}



/*$('#register-user').click(function(){
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var password_confirm = $('#password-confirm').val();
    var passwordLength = password.Length;
    var AgreeIterm = $('#AgreeIterm');

    if(name != ""){
       $('#name').removeClass('is-invalid');
       $('#name').addclass('is-invalid');
       $('#error-register-name').text("")


       if(email != ""){
           $('#email').removeClass('is-invalid');
           $('#email').addclass('is-invalid');
           $('#error-register-email').text("")


           if(passwordLength >= 8){
               $('#password').removeClass('is-invalid');
               $('#password').addclass('is-invalid');
               $('#error-register-password').text("")

               if(password == password_confirm){
                   $('#password-confirm').removeClass('is-invalid');
                   $('#password-confirm').addclass('is-invalid');
                   $('#error-register-password-confirm').text("")

                   if(AgreeIterm.is(':checked')){
                       $('#AgreeIterm').removeClass('is-invalid');
                       $('#error-register-AgreeIterm').text('')

                   }else{
                       $('#AgreeIterm').addclass('is-invalid');
                       $('#error-register-AgreeIterm').text('You should agree our terms and conditions!')
                   }

                   alert('You data is send');

                   $('#form-register').submit();

               }else{
                   $('#password-confirm').addclass('is-invalid');
                   $('#password-confirm').removeClass('is-invalid');
                   $('#error-register-password-confirm').text("Your password must be identical!")
               }

            }else{
               $('#password').addclass('is-invalid');
               $('#password').removeClass('is-invalid');
               $('#error-register-password').text("password must be at last 8 characters!")
            }

        }else{
           $('#email').addclass('is-invalid');
           $('#email').removeClass('is-invalid');
           $('#error-register-email').text("email is invalid")
        }

    }else{
       $('#name').addclass('is-invalid');
       $('#name').removeClass('is-invalid');
       $('#error-register-name').text("Name is invalid")

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

});*/
