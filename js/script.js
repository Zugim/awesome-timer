const timerElements = document.querySelectorAll(".timer");

const timers = [];

let interval = [];

timerElements.forEach((element, index) => {
    timerFunctionality(element, index);
});

const creationForm = document.querySelector(".timer-creation-form");
const creationName = document.querySelector(
    '.timer-creation-form input[type="text"]'
);
let creationDuration = document.querySelectorAll(".timer-creation-time input");
let creationTime;
const creationButton = document.querySelector(".timer-creation-create-btn");
const main = document.querySelector("main");

creationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    creationDuration.forEach((timeUnit) => {
        if (timeUnit.value <= 9) timeUnit.value = "0" + Number(timeUnit.value);
    });

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

    creationName.value = "";
    creationDuration.forEach((timeUnit) => (timeUnit.value = ""));

    timerFunctionality("", timers.length);
});

function timerFunctionality(element, index) {
    timers.push({
        name: document.querySelector(`#timer${index} .timer-name`),
        display: document.querySelector(`#timer${index} .timer-display`),
        startStopBtn: document.querySelector(
            `#timer${index} .timer-start-stop-btn`
        ),
        resetBtn: document.querySelector(`#timer${index} .timer-reset-btn`),
        duration: "00:00:00",
        time: "00:00:00",
    });

    timers[index].duration = timers[index].display.textContent;
    timers[index].time = timers[index].duration.split(":");
    timers[index].time = timers[index].time.map((timeUnit) => Number(timeUnit));

    timers[index].startStopBtn.addEventListener("click", () => {
        timers[index].startStopBtn.classList.toggle("timing");

        if (timers[index].startStopBtn.classList.contains("timing")) {
            timers[index].display.classList.add("timing");
            timers[index].display.classList.remove("paused");

            interval[index] = setInterval(() => {
                console.log(`Timing ${timers[index].name.textContent}!`);

                timers[index].time = timers[index].time.map((timeUnit) =>
                    Number(timeUnit)
                );

                if (timers[index].time[2] > 0) {
                    timers[index].time[2]--;
                } else if (timers[index].time[1] > 0) {
                    timers[index].time[1]--;
                    timers[index].time[2] = 59;
                } else if (timers[index].time[0] > 0) {
                    timers[index].time[0]--;
                    timers[index].time[1] = 59;
                    timers[index].time[2] = 59;
                } else {
                    timers[index].display.classList.add("finished");
                    timers[index].display.classList.remove("paused");
                    timers[index].display.classList.remove("timing");

                    clearInterval(interval[index]);
                }

                timers[index].time = timers[index].time.map((timeUnit) => {
                    if (timeUnit <= 9) return "0" + timeUnit;
                    return timeUnit;
                });

                timers[
                    index
                ].display.textContent = `${timers[index].time[0]}:${timers[index].time[1]}:${timers[index].time[2]}`;
            }, 1000);

            timers[index].startStopBtn.textContent = "Stop";

            console.log(`${timers[index].name.textContent} Timer Started!`);
        } else {
            timers[index].display.classList.add("paused");
            timers[index].display.classList.remove("timing");

            clearInterval(interval[index]);
            timers[index].startStopBtn.textContent = "Start";

            console.log(`${timers[index].name.textContent} Timer Stopped!`);
        }

        timers[index].resetBtn.addEventListener("click", () => {
            timers[index].display.classList.remove("finished");
            timers[index].display.classList.remove("paused");
            timers[index].display.classList.remove("timing");

            clearInterval(interval[index]);
            timers[index].startStopBtn.classList.remove("timing");
            timers[index].display.textContent = timers[index].duration;
            timers[index].startStopBtn.textContent = "Start";

            console.log(`${timers[index].name.textContent} Timer Reset!`);
        });
    });
}
