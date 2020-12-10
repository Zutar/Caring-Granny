/*function getGeolocation(){
    fetch('https://geolocation-db.com/json/')
    .then((response) => {
        return response.json();
    }).then((data) => {
        const lat = data.latitude,
        lon = data.longitude;

        console.log(localStorage.getItem('lat'));

        localStorage.setItem('lat', lat);
        localStorage.setItem('lon', lon);
        
    });
}*/

navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude,
     lon = position.coords.longitude;


let promise = fetch(`/geo/findName?lat=${lat}&lon=${lon}`)   

promise.then((response) => {

    return response.json();

}).then((data) => {

    return data.data

}).then((data) => {
    
        let country = data.country;
        let state=data.state;
        insert_cord(country,state)
    {       let wrapper = document.getElementById("loc");
            wrapper.innerHTML =`${country},${state}`;
            console.log(country,state);
}
    insert_cord(country,state);
    });

})



