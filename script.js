//final

let workTime = 25;
let breakTime = 5;
let seconds = "00";
let timerInterval;

window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('reset').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent link behavior
        resetTimer();
        playClickSound();
    });
    document.getElementById('workButton').addEventListener('click', function() {
        toggleTimer('work');
        playClickSound();
    });
    document.getElementById('breakButton').addEventListener('click', function() {
        startBreakTimer();
        playClickSound();
    });
    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        toggleDarkMode();
        playClickSound();
    });

    // Initialize the timer display
    document.getElementById('minutes').textContent = workTime;
    document.getElementById('seconds').textContent = seconds;
});

function start() {
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";
    seconds = 59;
    startWorkTimer();
}

function startWorkTimer() {
    let workMinutes = workTime - 1;
    timerInterval = setInterval(() => {
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;
        seconds--;
        if (seconds < 0) {
            workMinutes--;
            seconds = 59;
            if (workMinutes < 0) {
                clearInterval(timerInterval);
                startBreakTimer();
            }
        }
    }, 1000);
}

function startBreakTimer() {
    clearInterval(timerInterval);
    let breakMinutes = breakTime - 1;
    seconds = 59;
    timerInterval = setInterval(() => {
        document.getElementById('minutes').innerHTML = breakMinutes;
        document.getElementById('seconds').innerHTML = seconds;
        seconds--;
        if (seconds < 0) {
            breakMinutes--;
            seconds = 59;
            if (breakMinutes < 0) {
                clearInterval(timerInterval);
                resetTimer();
            }
        }
    }, 1000);
}

function toggleWorkBreak() {
    const workButton = document.getElementById('workButton');
    const breakButton = document.getElementById('breakButton');
    workButton.classList.toggle('active');
    breakButton.classList.toggle('active');
    if (workButton.classList.contains('active')) {
        resetTimer();
        startWorkTimer();
    } else {
        resetTimer();
        startBreakTimer();
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('dark-mode-icon');
    const currentIcon = icon.getAttribute('src');
    const newIcon = currentIcon.includes('moon') ? 'sun.png' : 'moon.png';
    icon.setAttribute('src', 'assets/' + newIcon);
}

function playClickSound() {
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0;
    clickSound.play();
}
