function getGeolocation(){
    fetch('https://geolocation-db.com/json/')
    .then((response) => {
        return response.json();
    }).then((data) => {
        const lat = data.latitude,
        lon = data.longitude;

        localStorage.setItem('lat', lat);
        localStorage.setItem('lon', lon);
        
    
let promise = fetch(`/geo/findName?lat=${lat}&lon=${lon}`)   

promise.then((response) => {
    return response.json();
}).then((data) => {
    return data.data;
}).then((data) => {
        let city = data.city;
        if(city===undefined)  city=data.town;
        let state=data.state;
        let wrapper = document.getElementById("loc");
        wrapper.innerHTML =`${city}, ${state}`;    
    });

});
}
getGeolocation();


