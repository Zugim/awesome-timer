const timerElements = document.querySelectorAll(".timer");

const creationForm = document.querySelector(".creation-form");
const creationName = document.querySelector('.creation-form input[type="text"]');
let creationDuration = document.querySelectorAll(".creation-time input");
const creationButton = document.querySelector(".creation-create-btn");

const main = document.querySelector("main");

const timers = [];

// initialize existing timers
timerElements.forEach((timer, index) => initializeTimer(timer, index));

creationForm.addEventListener("submit", event => {
    // stops the page refreshing on submit
    event.preventDefault();

    // adds leading 0s to the time units ready for display
    creationDuration.forEach(timeUnit => {
        if (timeUnit.value <= 9) timeUnit.value = "0" + Number(timeUnit.value);
    });

    // adds the new timer to the document
    let tmpTimer = document.createElement("div");
    tmpTimer.setAttribute("id", `timer${timers.length}`);
    tmpTimer.classList.add("timer");
    main.appendChild(tmpTimer);

    let tmpElement = document.createElement("h3");
    tmpElement.classList.add("timer-name");
    tmpElement.textContent = creationName.value;
    tmpTimer.appendChild(tmpElement);

    tmpElement = document.createElement("div");
    tmpElement.classList.add("timer-display");
    tmpElement.textContent = `${creationDuration[0].value}:${creationDuration[1].value}:${creationDuration[2].value}`;
    tmpTimer.appendChild(tmpElement);

    tmpWrapper = document.createElement("div");
    tmpWrapper.classList.add("wrapper", "timer-btns");
    tmpTimer.appendChild(tmpWrapper);

    tmpElement = document.createElement("button");
    tmpElement.classList.add("timer-start-stop-btn");
    tmpElement.textContent = "Start";
    tmpWrapper.appendChild(tmpElement);

    tmpElement = document.createElement("button");
    tmpElement.classList.add("timer-reset-btn");
    tmpElement.textContent = "Reset";
    tmpWrapper.appendChild(tmpElement);

    // initialize created timer
    initializeTimer("", timers.length);

    // resets the creation form
    creationName.value = "";
    creationDuration.map(timeUnit => (timeUnit.value = ""));
});

function initializeTimer(element, index) {
    // adds the timer to the timers array
    timers.push({
        timer: document.querySelector(`#timer${index}`),
        name: document.querySelector(`#timer${index} .timer-name`),
        display: document.querySelector(`#timer${index} .timer-display`),
        startStopBtn: document.querySelector(`#timer${index} .timer-start-stop-btn`),
        resetBtn: document.querySelector(`#timer${index} .timer-reset-btn`),
        duration: "00:00:00",
        time: "00:00:00",
        interval: null,
    });

    // sets the timers duration so the timer can be reset later
    timers[index].duration = timers[index].display.textContent;
    // splits the timer duration into secs, mins and hrs
    timers[index].time = timers[index].duration.split(":");

    timers[index].startStopBtn.addEventListener("click", () => timerFunctionality(element, index));

    timers[index].resetBtn.addEventListener("click", () => resetTimer(element, index));
}

function timerFunctionality(element, index) {
    timers[index].startStopBtn.classList.toggle("timing");

    if (timers[index].startStopBtn.classList.contains("timing")) {
        timers[index].display.classList.add("timing");
        timers[index].display.classList.remove("paused");

        timers[index].interval = setInterval(() => {
            // converts time units into numbers to remove leading zeros
            timers[index].time = timers[index].time.map(timeUnit => Number(timeUnit));

            // check if timer has finished
            if (timers[index].time[0] <= 0 && timers[index].time[1] <= 0 && timers[index].time[2] == 1) {
                timers[index].time[2]--;

                timers[index].timer.classList.add("finished");

                timers[index].display.classList.add("finished");
                timers[index].display.classList.remove("timing");

                timers[index].startStopBtn.disabled = true;

                clearInterval(timers[index].interval);
            }
            // secs
            else if (timers[index].time[2] > 0) timers[index].time[2]--;
            // mins
            else if (timers[index].time[1] > 0) {
                timers[index].time[1]--;
                timers[index].time[2] = 59;
            }
            // hrs
            else if (timers[index].time[0] > 0) {
                timers[index].time[0]--;
                timers[index].time[1] = 59;
                timers[index].time[2] = 59;
            }

            // adds leading 0s to the time units ready for display
            timers[index].time = timers[index].time.map(timeUnit => {
                if (timeUnit <= 9) return "0" + timeUnit;
                return timeUnit;
            });

            // prettier-ignore
            //displays the time
            timers[index].display.textContent = `${timers[index].time[0]}:${timers[index].time[1]}:${timers[index].time[2]}`;
        }, 1000);

        timers[index].startStopBtn.textContent = "Stop";
    } else {
        timers[index].display.classList.add("paused");
        timers[index].display.classList.remove("timing");

        timers[index].startStopBtn.textContent = "Start";

        clearInterval(timers[index].interval);
    }
}

function resetTimer(element, index) {
    timers[index].timer.classList.remove("finished");

    timers[index].display.classList.remove("finished");
    timers[index].display.classList.remove("paused");
    timers[index].display.classList.remove("timing");

    timers[index].startStopBtn.classList.remove("timing");

    timers[index].startStopBtn.textContent = "Start";

    timers[index].startStopBtn.disabled = false;

    clearInterval(timers[index].interval);

    timers[index].display.textContent = timers[index].duration;
    timers[index].time = timers[index].duration.split(":");
}
