String.prototype.isTrue = function () {
  if (this === 'false') {
    return false;
  }

  return !!this;
};
