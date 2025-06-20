export const APP_VERSION = {
  type: 'alpha',
  version: '0.1.7'
};

export const getVersionString = () => `${APP_VERSION.type} v${APP_VERSION.version}`; 