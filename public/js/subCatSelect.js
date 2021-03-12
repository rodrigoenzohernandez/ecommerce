/*
Objetivo: En el formulario de carga o modificación de producto, hay dos select, el de categorías y el de subcategorías. Lo que permite este código es que al seleccionar una categoría, se muestren solamente las categorias
*/
window.addEventListener('load', function () {

    fetch('http://localhost:3001/api/categorias')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            let subCat = data.data.subcategorias;
            let catSel = document.getElementById('cat');
            let subSel = document.getElementById('subCat');

            catSel.addEventListener('change', () => {

                console.log(catSel.value);
                subSel.options.length = 0;
                var opt = document.createElement("option");
                opt.value = 'subcategoria';
                opt.innerHTML = 'Subcategorias';
                subSel.appendChild(opt);

                for (var element of subCat) {

                    console.log(element.categoriaID);

                    if (element.categoriaID == catSel.value) {

                        var opt = document.createElement("option");
                        opt.value = element.ID;
                        opt.innerHTML = element.nombre;

                        subSel.appendChild(opt);
                    }
                }
            })
        })
        .catch(function (error) {

            console.log("Error: " + error);
        })

})