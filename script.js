let targetDate;
let countdownInterval;

let prev_days, prev_hours, prev_minutes, prev_seconds;

function startCountdown() {
    const yearSelect = document.getElementById('year-select').value;
    const monthSelect = document.getElementById('month-select').value;
    const daySelect = document.getElementById('day-select').value;
    const hourSelect = document.getElementById('hour-select').value;
    const minuteSelect = document.getElementById('minute-select').value;
    
    targetDate = new Date(yearSelect, monthSelect, daySelect, hourSelect, minuteSelect);

    document.getElementsByClassName('container1')[0].style.visibility = 'visible';
    document.getElementsByClassName('container2')[0].remove();

    const now = new Date();
    const diff = targetDate - now;
    
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    prev_days = d;
    prev_hours = h;
    prev_minutes = m;
    prev_seconds = s;

    init_clock_digits(prev_days, prev_hours, prev_minutes, prev_seconds);
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(
        () => {getTime()},
        1000
    );
}

function init_clock_digits(d, h, m, s) {
    const elements = {
        days: document.querySelectorAll('.days'),
        hours: document.querySelectorAll('.hours'),
        minutes: document.querySelectorAll('.minutes'),
        seconds: document.querySelectorAll('.seconds')
    };

    for (let i = 0; i < elements.hours.length; i++) {
        if (d - 2 + i < 0) {
            elements.days[i].textContent = '';
        } else {
            elements.days[i].textContent = ((d - 2 + i)).toString().padStart(3, '0');
        }
        if (h - 2 + i < 0 && d == 0) {
            elements.hours[i].textContent = '';
        } else {
            elements.hours[i].textContent = ((h - 2 + i + 24) % 24).toString().padStart(2, '0');
        }
        if (d == 0 && h == 0 && m - 2 + i < 0) {
            elements.minutes[i].textContent = '';
        } else {
            elements.minutes[i].textContent = ((m - 2 + i + 60) % 60).toString().padStart(2, '0');
        }
        if (d == 0 && h == 0 && m == 0 && s - 2 + i < 0) {
            elements.seconds[i].textContent = ''
        } else {
            elements.seconds[i].textContent = ((s - 2 + i + 60) % 60).toString().padStart(2, '0');
        }
    }
}

function getTime() {
    const elements = {
        days: document.querySelectorAll('.days'),
        hours: document.querySelectorAll('.hours'),
        minutes: document.querySelectorAll('.minutes'),
        seconds: document.querySelectorAll('.seconds')
    };

    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(countdownInterval);

        document.getElementById('myModal').style.display = 'block';
        document.getElementById('modalText').textContent = 'Time is up!';

        var audio = new Audio('alarm.mp3');
        audio.play();
        
        return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const animations = ['slideInTo50', 'slideInTo100', 'slideOutTo50', 'slideOutTo0'];

    if (d !== prev_days) {
        prev_days = d;
        for (let i = 0; i < elements.days.length; i++) {
            if (d - 2 + i < 0) {
                changeTime(elements.days[i], '', animations[i], 3, '');
            } else {
                changeTime(elements.days[i], (d - 2 + i), animations[i], 3, '0');
            }
        }
    }
    if (h !== prev_hours) {
        prev_hours = h;
        for (let i = 0; i < elements.hours.length; i++) {
            if (d == 0 && h - 2 + i < 0) {
                changeTime(elements.hours[i], '', animations[i], 2, '');
            } else {
                changeTime(elements.hours[i], (h - 2 + i + 24) % 24, animations[i], 2, '0');
            }
        }
    }

    if (m !== prev_minutes) {
        prev_minutes = m;
        for (let i = 0; i < elements.minutes.length; i++) {
            if (d == 0 && h == 0 && m - 2 + i < 0) {
                changeTime(elements.minutes[i], '', animations[i], 2, '')
            } else {
                changeTime(elements.minutes[i], (m - 2 + i + 60) % 60, animations[i], 2, '0');
            }
        }
    }

    if (s !== prev_seconds) {
        prev_seconds = s;
        for (let i = 0; i < elements.seconds.length; i++) {
            if (d == 0 && h == 0 && m == 0 && s - 2 + i < 0) {
                changeTime(elements.seconds[i], '', animations[i], 2, '')
            } else {
                changeTime(elements.seconds[i], (s - 2 + i + 60) % 60, animations[i], 2, '0');
            }
        }
    }
}

function changeTime(element, value, animation, pad, fill) {
    element.classList.add(animation);
    element.addEventListener('animationend', function handler() {
        element.classList.remove(animation);
        element.removeEventListener('animationend', handler);
        element.textContent = value.toString().padStart(pad, fill);
    });
}
