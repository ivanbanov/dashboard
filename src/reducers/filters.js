import { ACTIONS } from '../constants';

const initialState = {
  name: null,
  isActive: null,
};

export default function filters(
  state = initialState,
  action: { payload: null },
) {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.FILTER_NAME: {
      return {
        ...state,
        name: payload.name,
      };
    }
    
    case ACTIONS.FILTER_IS_ACTIVE: {
      return {
        ...state,
        isActive: payload.isActive,
      };
    }
    
    default: {
      return state;
    }
  }
}
