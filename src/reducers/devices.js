import { ACTIONS } from '../constants';

const initialState = {
  devices: [],
  devicesUpdating: [],
  error: null,
  isLoading: false,
};

export default function devices(
  state = initialState,
  action: { payload: null },
) {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.GET_DEVICES_SUCCESS: {
      return {
        ...state,
        devices: payload.devices,
        error: null,
        isLoading: false,
      }
    }
    
    case ACTIONS.GET_DEVICES_FAIL: {
      return {
        ...state,
        devices: [],
        error: payload.error,
        isLoading: false,
      }
    }
    
    case ACTIONS.GET_DEVICES: {
      return {
        ...state,
        devices: [],
        error: null,
        isLoading: true,
      }
    }

    case ACTIONS.UPDATE_DEVICE: {
      const filteredDevices = [...state.devicesUpdating].filter(item => payload.name !== item.name);
      
      return {
        ...state,
        devicesUpdating: [...filteredDevices, {
          name: payload.name,
          error: null,
          isUpdating: true,
        }]
      }
    }

    case ACTIONS.UPDATE_DEVICE_SUCCESS: {
      const filteredDevices = [...state.devicesUpdating].filter(item => payload.name !== item.name);

      return {
        ...state,
        devicesUpdating: filteredDevices,
        devices: [...state.devices].map(item => {
          if (item.name === payload.name) {
            item.active = payload.isActive;
          }
          
          return item;
        }),
      }
    }

    case ACTIONS.UPDATE_DEVICE_FAIL: {
      return {
        ...state,
        devicesUpdating: [...state.devicesUpdating].map(item => {
          if (item.name === payload.name) {
            item.error = payload.error
          }

          item.isUpdating = false;
          
          return item;
        })
      }
    }

    default:
      return state;
  }
}
