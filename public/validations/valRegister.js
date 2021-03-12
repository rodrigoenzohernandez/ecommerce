validateEmail = (mail) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)
}

window.addEventListener('load', () => {

    let form = document.querySelector('.registerForm');

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        let err = null;
        let msg = document.querySelector('div.name');
        let name = document.querySelector('.registerName');

        if (name.value.length < 2) {

            msg.innerHTML = 'El nombre debe tener al menos 2 caracteres';
            msg.style.display = 'block';
            err = 'X';
        } else msg.style.display = 'none';

        let ape = document.querySelector('.registerApe');
        msg = document.querySelector('div.ape');

        if (ape.value.length < 2) {

            msg.innerHTML = 'El apellido debe tener al menos 2 caracteres';
            msg.style.display = 'block';
            err = 'X';
        } else msg.style.display = 'none';

        let email = document.querySelector('.registerEmail');
        let checkEmail = validateEmail(email.value);
        msg = document.querySelector('div.email');

        if (!checkEmail) {

            msg.innerHTML = 'Formato de email incorrecto';
            msg.style.display = 'block';
            err = 'X';
        } else msg.style.display = 'none';

        let psw = document.querySelector('.registerPsw');
        msg = document.querySelector('div.psw');
        if (psw.value.length < 4) {

            msg.innerHTML = 'La contraseña debe tener al menos 4 caracteres';
            msg.style.display = 'block';
            err = 'X';
        } else msg.style.display = 'none';

        let rpsw = document.querySelector('.registerRpsw');
        msg = document.querySelector('div.rpsw');
        if (rpsw){

            if (psw.value != rpsw.value) {

                msg.innerHTML = 'Las contraseñas no coinciden';
                msg.style.display = 'block';
                err = 'X';
            } else msg.style.display = 'none';
        }
        
        if (err == null) form.submit();
    })
})