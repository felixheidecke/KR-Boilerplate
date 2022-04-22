import { isEmpty, isUndefined } from 'lodash-es';

/**
 * Format array to css class-list
 *
 * @param {array} base list of classes
 * @param {object} props $$props
 * @returns {string} \n separated values
 */

export const toClass = function (base = [], props = {}) {
  if (props['ex-class']) {
    base[0] = props['ex-class'];
  }

  if (props.class) {
    base.push(props.class);
  }

  return base
    .filter((item) => {
      return !isEmpty(item) && !isUndefined(item) && item !== false;
    })
    .join(' ');
};

export const isTrue = function (variable) {
  if (variable === 'false') return false;
  return !!variable;
};
