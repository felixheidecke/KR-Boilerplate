const ICON_TAG = 'i';
const ICON_CLASS = '-icon';
const HAS_ICON_CLASS = '--has-icon';

const createIconElement = (icon) => {
  const $el = document.createElement(ICON_TAG);
  $el.setAttribute('class', `${ICON_CLASS} ${icon}`);

  return $el;
};

export default () => {
  document.querySelectorAll('ul[data-icon]:not(.--has-icon)').forEach(($el) => {
    const children = $el.querySelectorAll('li');
    const icon = createIconElement($el.dataset.icon);

    children.forEach((child) => child.prepend(icon.cloneNode()));

    $el.classList.add(HAS_ICON_CLASS);
  });

  document.querySelectorAll('li[data-icon]:not(.--has-icon)').forEach(($el) => {
    const icon = createIconElement($el.dataset.icon);

    $el.prepend(icon);
    $el.classList.add(HAS_ICON_CLASS);
  });
};
