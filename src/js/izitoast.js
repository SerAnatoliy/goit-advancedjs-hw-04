import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  timeout: 4000,
  position: 'topRight',
  maxWidth: '400px',
  titleSize: '16px',
  messageSize: '16px',
});

const warning = message => {
  iziToast.warning({
    title: 'Attention!',
    message,
  });
};

const error = message => {
  iziToast.error({
    title: 'Error!',
    message,
  });
};

const success = message => {
  iziToast.success({
    title: 'Success!',
    message,
  });
};

export const toast = {
  emptyList: message => {
    warning(
      message ||
        'We have not found any images matching your request. Please try again.'
    );
  },

  endCollection: message => {
    warning(
      message || "That is all for now. Would you like to search more?"
    );
  },

  fetchError: message => {
    error(message || 'Sorry. Something went wrong.');
  },

  foundTotal: total => {
    success(`Hooray! We found ${total} images.`);
  },
};