/*
Objetivo: JS que permite la funcionalidad del menú en celular.
- Al presionar el botón del menu, pasa de display: none a display: block
- display: block --> el menú esta desplegado
- display: none --> el menú no esta desplegado
*/

window.addEventListener('load', () => {

    let burger = document.querySelector('.menuIc');
    let navMen = document.querySelector('.navMenuListMobile');

    if (burger) {
        burger.onclick = () => {

            if (navMen.style.display === "block") {
                navMen.style.display = "none";
            } else {
                navMen.style.display = "block";
            }
        }
    }
})