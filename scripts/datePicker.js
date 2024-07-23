document.addEventListener('DOMContentLoaded', function() {
    const yearSelect = document.getElementById('year-select');
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');
    const hourSelect = document.getElementById('hour-select');
    const minuteSelect = document.getElementById('minute-select');
    const currentYear = new Date().getFullYear();

    // populate year section with next 10 years
    for (let year = currentYear; year <= currentYear + 10; year++) {
        const option = document.createElement('option');
        option.value = year.toString();
        option.textContent = year.toString();
        yearSelect.appendChild(option);
    }

    const monthsNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ]
    // Populate month section with Jan - Dec
    for (let i = 0; i <= 11; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = monthsNames[i];
        monthSelect.appendChild(option);
    }

    // We skip populating days section for now since amount of days depends on month

    // Populate hour section with 00 - 23
    for (let i = 0; i <= 23; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString().padStart(2, '0');
        hourSelect.appendChild(option);
    }

    // Populate minute section with 00 - 59
    for (let i = 0; i <= 59; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString().padStart(2, '0');
        minuteSelect.appendChild(option);
    }

    // Populate day section basing on selected month
    function populateDays() {
        const selectedYear = parseInt(yearSelect.value);
        const selectedMonth = parseInt(monthSelect.value);
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

        daySelect.innerHTML = '';

        // Populate day section with 1 - 28/29/30/31
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day.toString();
            option.textContent = day.toString();
            daySelect.appendChild(option);
        }
    }

    // Every time new year or month is selected, populate day section
    yearSelect.addEventListener('change', populateDays);
    monthSelect.addEventListener('change', populateDays);

    // By default, select closest 30th of August
    let time;

    if (new Date().getTime() < new Date(currentYear, 7, 30)) {
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

/**
 * @description Check if selected date is in the future
 */
function validateDate() {
    const yearSelect = document.getElementById('year-select').value;
    const monthSelect = document.getElementById('month-select').value;
    const daySelect = document.getElementById('day-select').value;
    const hourSelect = document.getElementById('hour-select').value;
    const minuteSelect = document.getElementById('minute-select').value;
    
    targetDate = new Date(yearSelect, monthSelect, daySelect, hourSelect, minuteSelect);

    let now = new Date()

    if (targetDate - now <= 0) {
        // If past date, show pop-up
        document.getElementById('popup-container').style.display = 'block';
        document.getElementById('popup-text').textContent = 'Past date entered. Please try again.';
    } else {
        // Else show clock counting down
        startCountdown();
    }
}

// If event close button or window clicked, hide pop-up
let span = document.getElementsByClassName('close-button')[0];

span.onclick = function() {
    let popup = document.getElementById('popup-container');

    popup.style.display = 'none';
}

window.onclick = function(event) {
    let popup = document.getElementById('popup-container');

    if (event.target === popup) {
        popup.style.display = 'none';
    }
}