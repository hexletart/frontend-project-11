/* eslint-disable no-param-reassign */
import spinner from '../htmlElements/spinner';
import buildHtml from '../utilities/htmlBuilder';

export default (elements, axiosState) => {
  if (!axiosState) {
    elements.formSubmitContainer.textContent = '';
  } else {
    elements.formSubmitContainer.append(buildHtml(spinner));
  }
};
