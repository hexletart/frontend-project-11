/* eslint-disable no-param-reassign */

// import _ from 'lodash';

import handleResponseData from './handlers/handleData/handleResponseData';

const handleProcess = (elements, process) => {
  switch (process) {
    case 'filling':
      elements.formSubmit.disabled = false;
      elements.input.disabled = false;
      break;
    case 'sending':
      elements.formSubmit.disabled = true;
      elements.input.disabled = true;
      break;
    case 'sent':
      elements.formSubmit.disabled = false;
      elements.input.disabled = false;
      elements.form.reset();
      elements.form.focus();
      break;
    default:
      throw new Error(`Unknown process - ${process}`);
  }
};

const handleNotification = (elements, notice) => {
  const { notification } = elements;
  notification.textContent = '';
  notification.classList.remove('text-danger', 'text-success');
  const getNoticeColor = (el) => ((el instanceof Error)
    ? 'text-danger' : 'text-success');
  if (!notice.message) return;
  notification.classList.add(getNoticeColor(notice));
  notification.textContent = notice.message;
};

const getWordMapByElements = (words) => ({
  formSubmit: words.t('aggregator.form.submit'),
  header: words.t('aggregator.header'),
  description: words.t('aggregator.description'),
  hint: words.t('aggregator.hint'),
  formLabel: words.t('aggregator.form.label'),
});

const renderBaseView = (elements, wordHandler) => {
  const wordMap = getWordMapByElements(wordHandler);
  Object.entries(wordMap)
    .forEach(([key, value]) => { elements[key].textContent = value; });
};

export default (elements, wordHandler) => (path, value) => {
  switch (path) {
    case 'form.response': handleResponseData(elements, wordHandler, value);
      break;
    case 'form.processError': handleNotification(elements, value.notice);
      break;
    case 'form.processState': handleProcess(elements, value);
      break;
    case 'formNotifications': handleNotification(elements, value.notice);
      break;
    case 'lng': renderBaseView(elements, wordHandler);
      break;
    default:
      break;
  }
};
