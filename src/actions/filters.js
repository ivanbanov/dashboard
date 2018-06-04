import { ACTIONS } from '../constants';

export const filterName = name => ({
  type: ACTIONS.FILTER_NAME,
  payload: { name },
});

export const filterIsActive = isActive => ({
  type: ACTIONS.FILTER_IS_ACTIVE,
  payload: { isActive },
});
