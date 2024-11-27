let targetDate;
let countdownInterval;

// Global variable with last checked day, hour, minute and second for comparison
let prev_days, prev_hours, prev_minutes, prev_seconds;

/**
 * @description Show clock counting down
 */
function startCountdown() {
    const yearSelect = document.getElementById('year-select').value;
    const monthSelect = document.getElementById('month-select').value;
    const daySelect = document.getElementById('day-select').value;
    const hourSelect = document.getElementById('hour-select').value;
    const minuteSelect = document.getElementById('minute-select').value;
    
    targetDate = new Date(yearSelect, monthSelect, daySelect, hourSelect, minuteSelect);

    // Hide input, show clock
    document.getElementsByClassName('clock-container')[0].style.visibility = 'visible';
    document.getElementsByClassName('input-container')[0].remove();

    const now = new Date();
    const diff = targetDate - now;

    // Get days, hours, minutes and seconds of difference
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    prev_days = d;
    prev_hours = h;
    prev_minutes = m;
    prev_seconds = s;

    // Init clock with start time
    init_clock_digits(prev_days, prev_hours, prev_minutes, prev_seconds);

    // Start interval with getting current time every 1s
    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(
        () => {getTime()},
        1000
    );
}

/**
 * @description Fill clock with start time values
 *
 * @param d days number
 * @param h hours number
 * @param m minutes number
 * @param s seconds number
 */
function init_clock_digits(d, h, m, s) {
    const elements = {
        days: document.querySelectorAll('.days'),
        hours: document.querySelectorAll('.hours'),
        minutes: document.querySelectorAll('.minutes'),
        seconds: document.querySelectorAll('.seconds')
    };

    // Fill 4 clock columns - days, hours, minutes, seconds
    // With 5 boxes in it - 1st (now - 2), 2nd (now - 1), 3rd (now), ...
    // If no more days/hours/minutes/seconds, do now show next value
    for (let i = 0; i < elements.hours.length; i++) {
        if (d - 2 + i < 0) {
            elements.days[i].textContent = '';
        } else {
            elements.days[i].textContent = ((d - 2 + i)).toString().padStart(3, '0');
        }
        if (h - 2 + i < 0 && d === 0) {
            elements.hours[i].textContent = '';
        } else {
            elements.hours[i].textContent = ((h - 2 + i + 24) % 24).toString().padStart(2, '0');
        }
        if (d === 0 && h === 0 && m - 2 + i < 0) {
            elements.minutes[i].textContent = '';
        } else {
            elements.minutes[i].textContent = ((m - 2 + i + 60) % 60).toString().padStart(2, '0');
        }
        if (d === 0 && h === 0 && m === 0 && s - 2 + i < 0) {
            elements.seconds[i].textContent = ''
        } else {
            elements.seconds[i].textContent = ((s - 2 + i + 60) % 60).toString().padStart(2, '0');
        }
    }
}

/**
 * @description Check current time
 */
function getTime() {
    const elements = {
        days: document.querySelectorAll('.days'),
        hours: document.querySelectorAll('.hours'),
        minutes: document.querySelectorAll('.minutes'),
        seconds: document.querySelectorAll('.seconds')
    };

    const now = new Date();
    const diff = targetDate - now;

    // Check if time is up
    if (diff <= 0) {
        clearInterval(countdownInterval);

        document.getElementById('popup-container').style.display = 'block';
        document.getElementById('popup-text').textContent = 'Time is up!';

        // Alarm audio when time is up
        let audio = new Audio('res/alarm.mp3');
        audio.play();
        
        return;
    }

    // Get days, hours, minutes and seconds of difference
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    // 4 sliding animations (from 1st to 2nd element, from 2nd to 3rd element ... up to 5th)
    const animations = ['slideInTo50', 'slideInTo100', 'slideOutTo50', 'slideOutTo0'];

    // Change time if the value has changed
    // If no more days/hours/minutes/seconds, do now show next value
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
            if (d === 0 && h - 2 + i < 0) {
                changeTime(elements.hours[i], '', animations[i], 2, '');
            } else {
                changeTime(elements.hours[i], (h - 2 + i + 24) % 24, animations[i], 2, '0');
            }
        }
    }
    if (m !== prev_minutes) {
        prev_minutes = m;
        for (let i = 0; i < elements.minutes.length; i++) {
            if (d === 0 && h === 0 && m - 2 + i < 0) {
                changeTime(elements.minutes[i], '', animations[i], 2, '')
            } else {
                changeTime(elements.minutes[i], (m - 2 + i + 60) % 60, animations[i], 2, '0');
            }
        }
    }
    if (s !== prev_seconds) {
        prev_seconds = s;
        for (let i = 0; i < elements.seconds.length; i++) {
            if (d === 0 && h === 0 && m === 0 && s - 2 + i < 0) {
                changeTime(elements.seconds[i], '', animations[i], 2, '')
            } else {
                changeTime(elements.seconds[i], (s - 2 + i + 60) % 60, animations[i], 2, '0');
            }
        }
    }
}


/**
 * @description Play slide down animation for box
 * When animation ends, box returns to its position and immediately changes value
 * It gives illusion of smooth transition
 *
 * @param element document element
 * @param value new value for an element (here number or empty string)
 * @param animation animation to play
 * @param pad target length for string.padStart here(2 or 3)
 * @param fill string to fill for string.padStart (here 0 or empty string)
 */
function changeTime(element, value, animation, pad, fill) {
    element.classList.add(animation);
    element.addEventListener('animationend', function handler() {
        element.classList.remove(animation);
        element.removeEventListener('animationend', handler);
        element.textContent = value.toString().padStart(pad, fill);
    });
}
