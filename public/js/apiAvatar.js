window.addEventListener('load', function () {

    fetch('https://timezone.abstractapi.com/v1/current_time?api_key=f66483b34d034ce982d92793935e4a77&location=Buenos Aires, Argentina')
        .then(function (response) {
            return response.json()
        })
        .then(function (information) {

            console.log(information.datetime);
            let time = information.datetime;
            let zone = information.requested_location;

            let timeZone = document.querySelector('div.api');
            timeZone.innerHTML = time + ' - ' + zone;

        })
        .catch(function (error) {
            console.log("Error: " + error);
        })

})