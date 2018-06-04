const actions: Array<string> = [
  'GET_DEVICES',
  'GET_DEVICES_SUCCESS',
  'GET_DEVICES_FAIL',
  'UPDATE_DEVICE',
  'UPDATE_DEVICE_SUCCESS',
  'UPDATE_DEVICE_FAIL',
  'FILTER_NAME',
  'FILTER_IS_ACTIVE',
];

export const ACTIONS = actions.reduce((obj, action) => {
  obj[action] = action;
  return obj;
}, {});

export const API_HOST = "//localhost:8888";