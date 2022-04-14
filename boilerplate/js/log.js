import { dev } from '$app/env';

const log = {
  error(component, message) {
    if (!dev) return;
    console.error('🔴', `<${component} />`, message);
  },

  warning(component, message) {
    if (!dev) return;
    console.warn('🟡', `<${component} />`, message);
  },

  info(component, message) {
    if (!dev) return;
    console.log('⚪', `<${component} />`, message);
  }
};

export default log;
