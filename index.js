let notifier = require('node-notifier');
let moment = require('moment');

const argTime = process.argv.slice(2);

const POMODORO_DURATION = argTime[0];
const BREAK_DURATION = argTime[1];

let isworking = false;
let runingTime = 0;

function formatingTime(totalSecond) {
  const duration = moment.duration(totalSecond, 'seconds');
  const hours = duration.hours().toString().padStart(2, '0');
  const minutes = duration.minutes().toString().padStart(2, '0');
  const seconds = duration.seconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function startTimer(duration) {
  isworking = !isworking;
  runingTime = duration * 60;

  const timer = setInterval(() => {
    runingTime--;
    const formatTime = formatingTime(runingTime);
    console.log(`${isworking ? 'Working' : 'Break'}: ${formatTime}`);
    if (runingTime === 0) {
      clearInterval(timer);
      notifier.notify({
        title: isworking ? 'Work Time' : 'Break Time',
        message: isworking ? 'Work Time Over' : 'Break Time Over',
        sound: true,
        wait: true,
        tplType: 'ejs',
      });
      startTimer(isworking ? BREAK_DURATION : POMODORO_DURATION);
    }
  }, 1000);
}

startTimer(POMODORO_DURATION);
