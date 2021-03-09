validateEmail = (mail) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)
}

window.addEventListener('load', () => {

    let form = document.querySelector('.loginForm');

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        let email = document.querySelector('.loginUser');
        let checkEmail = validateEmail(email.value);
        let msg = document.querySelector('div.email');
        let err = null;

        if (!checkEmail) {

            msg.innerHTML = 'Formato de email incorrecto';
            msg.style.display = 'block';
            err = 'X';
        } else msg.style.display = 'none';

        let psw = document.querySelector('.loginPassword');
        msg = document.querySelector('div.psw');
        if (psw.value.length < 4) {

            msg.innerHTML = 'El password debe tener al menos 4 caracteres';
            msg.style.display = 'block';
            err = 'X';
        } else msg.style.display = 'none';

        if (err == null) form.submit();
    })
})