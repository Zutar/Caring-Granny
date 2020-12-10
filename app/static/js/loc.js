navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude,
        lan = position.coords.longitude;
        console.log(lan,lat);
})

let promise = fetch(`/geo/findName?lat=${lat}&lon=${lan}`)

promise.then((response) => {

    return response.json();

}).then((data) => {

    return data.data

}).then((data) => {
    
        let country = data.country;
        let state=data.state;
    });
    
insert_cord(country,state)
{element = document.getElementById("loc");
console.log(country,state);
}

