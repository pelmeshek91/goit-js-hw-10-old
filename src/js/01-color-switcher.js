const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = null;
const timer = {
  start() {
    timerId = setInterval(() => {
      const body = document.querySelector('body');
      let color = getRandomHexColor();
      body.style.backgroundColor = color;
    }, 1000);
    btnStart.setAttribute('disabled', 'disabled');
    btnStop.removeAttribute('disabled'); //спросить у Руслана почему 2 раза нужно писать
  },
  stop() {
    clearInterval(timerId);
    btnStop.setAttribute('disabled', 'disabled');
    btnStart.removeAttribute('disabled');
  },
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
btnStart.addEventListener('click', event => {
  event.preventDefault();
  timer.start();
});

btnStop.addEventListener('click', event => {
  event.preventDefault();
  timer.stop();
});
