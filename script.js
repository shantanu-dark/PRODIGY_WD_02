let timer;
let elapsed = 0;
let running = false;
let laps = [];

const stopwatchElement = document.getElementById('stopwatch');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsElement = document.getElementById('laps');

function updateStopwatch() {
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const milliseconds = Math.floor((elapsed % 1000) / 10);

    stopwatchElement.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function startStopwatch() {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            elapsed += 10;
            updateStopwatch();
        }, 10);
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(timer);
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(timer);
    running = false;
    elapsed = 0;
    updateStopwatch();
    laps = [];
    lapsElement.innerHTML = '';
}

function recordLap() {
    if (running) {
        laps.push(elapsed);
        const lapElement = document.createElement('li');
        lapElement.textContent = stopwatchElement.textContent;
        lapsElement.appendChild(lapElement);
    }
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

updateStopwatch();
