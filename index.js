const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');
const pomoCountDisplay = document.querySelector('.pomoCountDisplay');


const WORK_TIME = 2 * 60;
const BREAK_TIME = 0.1 * 60;
let timerId = null;
let oneRoundCompleted = false;
let totalCount = 0;
let paused = false;


//function to update title
const updateTitle = (msg) => {
    title.textContent = msg;
}


//function to save pomodoro counts to local storage
const saveLocalCounts = () => {
    let counts = JSON.parse(localStorage.getItem("pomoCounts"));
    counts !== null ? counts++ : counts = 1;
    counts++;
    localStorage.setItem("pomoCounts", JSON.stringify(counts));

}

// function to show completed pomodoro to screen from local storage
const showPomoCounts = () => {
    const counts = JSON.parse(localStorage.getItem("pomoCounts"));
    if (counts > 0) {
        pomoCountDisplay.style.document = "flex";

    }
    pomoCountDisplay.firstElementChild.textContent = counts;
}
showPomoCounts();


// making countdown function
const countDown = (time) => {
    return () => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        timer.textContent = `${mins}:${secs}`;
        time--;
        if (time < 0) {
            stopTimer();
            if (oneRoundCompleted === false) {
                timerId = startTimer(BREAK_TIME);
                oneRoundCompleted = true;
                updateTitle("It's Break Time");

            }
            else {
                updateTitle("Completed 1 round of Pomodoro Technique");
                setTimeout(() => updateTitle("Start Timer Again"), 2000);
                totalCount++;
                saveLocalCounts();
                showPomoCounts();
            }

        }
    }
}

//aroow function to stop timer
const stopTimer = () => {
    clearInterval(timerId);
    timerId = null;
}
//function to get time in second
const getTimeInSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(":");
    return parseInt(minutes * 60) + parseInt(seconds);

}
//arrow function to start timer
const startTimer = (startTime) => {
    if (timerId != null) {
        stopTimer();
    }
    return setInterval(countDown(startTime), 1000);
}
//adding event listener to start button
startBtn.addEventListener('click', () => {
    timerId = startTimer(WORK_TIME);
    updateTitle("It's Work Time");

});

//resetBtn  add event listener
resetBtn.addEventListener('click', () => {
    stopTimer();
    timer.textContent = "25:00";
});

//pauseBtn  add event listener
pauseBtn.addEventListener('click', () => {
    stopTimer();
    paused = true;
    updateTitle("Timer Paused");

});

//resumeBtn  add event listener
resumeBtn.addEventListener('click', () => {

    if (paused = true) {
        const currentTime = getTimeInSeconds(timer.textContent);
        timerId = startTimer(currentTime);
        paused = false;
        (!oneRoundCompleted) ? updateTitle("It's Work Time") : updateTitle("It's Break Time")



    }


});


