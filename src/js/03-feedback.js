import throttle from 'lodash.throttle';
import * as storage from '../services/localStorage';

const STORAGE_KEY = 'feedback-form-state';

const feedbackFormRef = document.querySelector('.feedback-form');

function onInput(e) {
  const { name, value } = e.target;

  const parsedData = storage.get(STORAGE_KEY) || {};

  const formData = {
    ...parsedData,
    [name]: value,
  };

  storage.save(STORAGE_KEY, formData);
}

function rehydrateData() {
  const parsedData = storage.get(STORAGE_KEY);

  const {
    elements: { email, message },
  } = feedbackFormRef;

  email.value = parsedData?.email || '';
  message.value = parsedData?.message || '';
}
rehydrateData();

function onSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const finalData = {};

  for (const [key, value] of formData.entries()) {
    if (!value) {
      alert('Please fill in all the fields');
      return;
    }

    finalData[key] = value;
  }
  console.log(finalData);

  storage.remove(STORAGE_KEY);
  form.reset();
}

feedbackFormRef.addEventListener('input', throttle(onInput, 500));
feedbackFormRef.addEventListener('submit', onSubmit);
