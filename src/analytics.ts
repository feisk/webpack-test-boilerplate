import * as $ from 'jquery';

const createAnalytics = (): Record<string, any> => {
  type IsDestroyed = boolean;

  let counter: number = 0;

  let isDestroyed: IsDestroyed = false;

  const listener = (): number => counter++;

  document.addEventListener('click', listener);

  return {
    destroy() {
      document.removeEventListener('click', listener);
      isDestroyed = true;
    },

    getClicks() {
      return isDestroyed ? 'Analytics is destroyed!' : counter;
    },
  };
};

window['analytics'] = createAnalytics();
