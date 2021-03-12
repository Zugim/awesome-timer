const timerElements = document.querySelectorAll(".timer");

const timers = [];

let interval = [];

timerElements.forEach((element, index) => {
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
            clearInterval(interval[index]);
            timers[index].startStopBtn.textContent = "Start";

            console.log(`${timers[index].name.textContent} Timer Stopped!`);
        }

        timers[index].resetBtn.addEventListener("click", () => {
            clearInterval(interval[index]);
            timers[index].startStopBtn.classList.remove("timing");
            timers[index].display.textContent = timers[index].duration;
            timers[index].startStopBtn.textContent = "Start";

            console.log(`${timers[index].name.textContent} Timer Reset!`);
        });
    });
});
