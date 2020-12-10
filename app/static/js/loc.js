localStorage.getItem('lat');
localStorage.getItem('lon');

promise.then((response) => {

    return response.json();

}).then((data) => {

    return data.data

}).then((data) => {
    
        let country = data.country;
        let state=data.state;
    });

    let promise = fetch(`/geo/findName?lat=${lat}&lon=${lan}`)

insert_cord(country,state)
{element = document.getElementById("loc");
console.log(country,state);
}
insert_cord();

