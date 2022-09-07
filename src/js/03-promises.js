import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputForm = document.querySelector('.form');

inputForm.addEventListener('submit', e => {
  e.preventDefault();

  const { delay, step, amount } = e.target.elements;
  let nextStep = delay.valueAsNumber;
  console.dir(delay);
  for (let position = 1; position <= amount.valueAsNumber; position += 1) {
    createPromise(position, nextStep)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    nextStep += step.valueAsNumber;
  }
  e.target.reset();
});

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
