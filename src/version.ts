export const APP_VERSION = {
  type: 'alpha',
  version: '0.1.6'
};

export const getVersionString = () => `${APP_VERSION.type} v${APP_VERSION.version}`; 