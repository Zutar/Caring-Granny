function setDate() {
    let blockDate = document.getElementById('current-date');
    let current_date = new Date();
    console.log(blockDate, current_date);

    let year = current_date.getFullYear();
    let day = current_date.getDate();
    let mounth = current_date.getMonth();

    blockDate.innerHTML = `${day}.${mounth + 1}.${year} <i class="far fa-calendar-alt"></i>`;
}

setDate()