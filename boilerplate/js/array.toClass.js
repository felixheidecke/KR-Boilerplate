import { isEmpty, isUndefined } from 'lodash-es';

Array.prototype.toClass = function (props = {}) {

  if (props['ex-class']) {
    this[0] = props['ex-class']
  }

  if (props.class) {
    this.push(props.class)
  }

  return this
    .filter((item) => {
      return !isEmpty(item) && !isUndefined(item) && item !== false;
    })
    .join(' ');
}