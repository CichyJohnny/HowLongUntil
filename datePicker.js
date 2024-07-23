document.addEventListener('DOMContentLoaded', function() {
    const yearSelect = document.getElementById('year-select');
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');
    const hourSelect = document.getElementById('hour-select');
    const minuteSelect = document.getElementById('minute-select');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();

    for (let year = currentYear; year <= currentYear + 10; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    const monthsNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ]
    for (let i = 0; i <= 11; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = monthsNames[i];
        monthSelect.appendChild(option);
    }

    for (let i = 0; i <= 23; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i.toString().padStart(2, '0');
        hourSelect.appendChild(option);
    }

    for (let i = 0; i <= 59; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i.toString().padStart(2, '0');
        minuteSelect.appendChild(option);
    }

    

    function populateDays() {
        const selectedYear = parseInt(yearSelect.value);
        const selectedMonth = parseInt(monthSelect.value);
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

        daySelect.innerHTML = '';

        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day;
            daySelect.appendChild(option);
        }
    }

    yearSelect.addEventListener('change', populateDays);
    monthSelect.addEventListener('change', populateDays);

    let time;
    if (new Date().getTime() < new Date(currentYear, 8, 30)) {
        time = new Date(currentYear, 7, 30);
    } else {
        time = new Date(currentYear + 1, 7, 30);
    }

    yearSelect.value = time.getFullYear();
    monthSelect.value = time.getMonth();
    populateDays();
    daySelect.value = time.getDate();
    hourSelect.value = time.getHours();
    minuteSelect.value = time.getMinutes();
    
});

function checkDate() {
    const yearSelect = document.getElementById('year-select').value;
    const monthSelect = document.getElementById('month-select').value;
    const daySelect = document.getElementById('day-select').value;
    const hourSelect = document.getElementById('hour-select').value;
    const minuteSelect = document.getElementById('minute-select').value;
    
    targetDate = new Date(yearSelect, monthSelect, daySelect, hourSelect, minuteSelect);

    now = new Date()

    if (targetDate - now <= 0) {
        var modal = document.getElementById('myModal');
        modal.style.display = 'block';
    } else {
        startCountdown();
    }
}

var span = document.getElementsByClassName('close')[0];

span.onclick = function() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}