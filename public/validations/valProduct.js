window.addEventListener('load', function () {

    let formProd = document.querySelector(".formProd");
    formProd.addEventListener('submit', (e) => {
        e.preventDefault();

        var error = "0";

        let nombre = document.querySelector(".nombre");
        // nombre.addEventListener('blur', function(){
        let errMens = document.querySelector("#errProd")
        if (nombre.value.length < 5) {
            errMens.innerHTML = "El nombre del producto debe tener al menos 5 caracteres";
            errMens.style.display = "block";

            console.log(errMens);
            error = "1";
        } else {
            errMens.style.display = "none";
        };
        // })

        let catProd = document.querySelector("#cat");
        // catProd.addEventListener('blur', function(){
        let errMens1 = document.querySelector('#errCat');
        if (catProd.value == "categoria") {
            errMens1.innerHTML = "Debe elegir una categoría válida";
            errMens1.style.display = "block";
            error = "1";
        } else {
            errMens1.style.display = "none";
        }

        // ! Aca debe modificarse el desplegable para que la validació sea automática       
        let subcatProd = document.querySelector("#subCat");
        let errMens11 = document.querySelector('#errSubcat');
        if (subcatProd.value == "subcategoria") {
            errMens11.innerHTML = "Debe elegir una subcategoría válida";
            errMens11.style.display = "block";
            error = "1";
        } else {
            errMens11.style.display = "none";
        };

        let marProd = document.querySelector("#marca");

        // marProd.addEventListener('blur', function(){
        let errMens10 = document.querySelector('#errMar');
        if (marProd.value == "marca") {
            errMens10.innerHTML = "Debe elegir una marca válida";
            errMens10.style.display = "block";

            console.log(errMens10);
            error = "1";
        } else {
            errMens10.style.display = "none";
        };
        // })

        let cantProd = document.querySelector(".cantidad");
        // cantProd.addEventListener('blur', function(){
        let errMens2 = document.querySelector('#errCant');
        if (cantProd.value < 1) {
            errMens2.innerHTML = "La cantidad debe ser mayor a 0";
            errMens2.style.display = "block";

            console.log(errMens2);
            error = "1";
        } else {
            errMens2.style.display = "none";
        };
        // })

        let umProd = document.querySelector("#um");
        // umProd.addEventListener('blur', function(){
        let errMens3 = document.querySelector('#errUM');
        console.log(umProd)
        if (umProd.value == "um") {
            errMens3.innerHTML = "Debe elegir una unidad de medida válida";
            errMens3.style.display = "block";

            console.log(errMens3);
            error = "1";
        } else {
            errMens3.style.display = "none";
        };
        // })

        let imgProd = document.querySelector("#imgProd");

        if (imgProd) {

            console.log(imgProd);

            let errMens12 = document.querySelector("#errImg");

            if (imgProd.value == "") {

                errMens12.innerHTML = "Debe seleccionar una imagen";
                errMens12.style.display = "block";
                error = "1";
            } else {

                errMens12.style.display = "none";
            };
        }

        let descProd = document.querySelector(".descripcion");
        // descProd.addEventListener('blur', function(){
        let errMens4 = document.querySelector('#errDesc');
        console.log(descProd.value);
        if (descProd.value.length < 5 || descProd.value == "Descripción") {

            errMens4.innerHTML = "Ingrese una descripcion de al menos 5 caracteres";
            errMens4.style.display = "block";

            console.log(errMens4);
            error = "1";
        } else {
            errMens4.style.display = "none";
        };
        // })

        let estProd = document.querySelector("#estado");
        // estProd.addEventListener('blur', function(){
        let errMens5 = document.querySelector('#errEst');
        console.log(estProd)
        if (estProd.value == 3) {
            errMens5.innerHTML = "Debe elegir un estado válido";
            errMens5.style.display = "block";

            console.log(errMens5);
            error = "1";
        } else {
            errMens5.style.display = "none";
        };
        // })

        let preProd = document.querySelector("#precio");
        // preProd.addEventListener('blur', function(){
        let errMens6 = document.querySelector('#errPre');
        if (preProd.value < 1) {
            errMens6.innerHTML = "El precio tiene que ser mayor a 1";
            errMens6.style.display = "block";

            console.log(errMens6);
            error = "1";
        } else {
            errMens6.style.display = "none";
        }
        // })

        let descuProd = document.querySelector("#descu");
        // descuProd.addEventListener('blur', function(){
        let errMens7 = document.querySelector('#errDescu');
        if (descuProd.value < 0 || descuProd.value > 75) {
            errMens7.innerHTML = "El descuento tiene que ser mayor a 0 y menor a 75";
            errMens7.style.display = "block";

            console.log(errMens7);
            error = "1";
        } else {
            errMens7.style.display = "none";
        }
        // })

        let stkProd = document.querySelector("#stock");
        // stkProd.addEventListener('blur', function(){
        let errMens8 = document.querySelector('#errStock');
        if (stkProd.value < 1) {
            errMens8.innerHTML = "El stock tiene que ser mayor a 0";
            errMens8.style.display = "block";

            console.log(errMens8);
            error = "1";
        } else {
            errMens8.style.display = "none";
        }
        // })

        let stkMinProd = document.querySelector("#stockMin");
        // stkMinProd.addEventListener('blur', function(){
        let errMens9 = document.querySelector('#errStockMin');
        if (stkMinProd.value < 1) {
            errMens9.innerHTML = "El stock mínimo tiene que ser mayor a 0";
            errMens9.style.display = "block";

            console.log(errMens9);
            error = "1";
        } else {
            errMens9.style.display = "none";
        }
        // })    
        if (error == "0") formProd.submit();
    })
})