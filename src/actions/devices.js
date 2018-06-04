import { ACTIONS, API_HOST } from '../constants';

const getDevicesSuccess = devices => ({
  type: ACTIONS.GET_DEVICES_SUCCESS,
  payload: { devices },
});

const getDevicesFail = error => ({
  type: ACTIONS.GET_DEVICES_FAIL,
  payload: { error },
});

export const getDevices = () => dispatch => {
  dispatch({ type: ACTIONS.GET_DEVICES });
  
  fetch(`${API_HOST}/device`)
    .then(resp => {
      if (resp.status === 200) {
        return resp.json()
      }
      
      throw "Ocurred a problem while trying to fetch the devices.";
    })
    .then(json => dispatch(getDevicesSuccess(json.data)))
    .catch(error => dispatch(getDevicesFail(error)));
};

export const updateDevice = (name, isActive) => dispatch => {
  dispatch({
    type: ACTIONS.UPDATE_DEVICE,
    payload: { name },
  });
  
  fetch(
    `${API_HOST}/device/${name}?active=${isActive}`,
    { method: 'PATCH' }
  )
    .then(resp => {
      if (resp.status === 200 || resp.status === 204) {
        return resp.json()
      }
      
      throw "Failed while trying to update.";
    })
    .then(json => dispatch(updateDeviceSuccess(name, isActive)))
    .catch(error => dispatch(updateDeviceFail(name, error)));
};

const updateDeviceSuccess = (name, isActive) => ({
  type: ACTIONS.UPDATE_DEVICE_SUCCESS,
  payload: { name, isActive },
});

const updateDeviceFail = (name, error) => ({
  type: ACTIONS.UPDATE_DEVICE_FAIL,
  payload: { name, error },
});