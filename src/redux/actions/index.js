export const USER_DATA = 'USER_DATA';
export const USER_TOKEN = 'USER_TOKEN';
export const CALCULATION = 'CALCULATION';
export const fetchUserData = data => ({
  type: USER_DATA,
  payload: data,
});
export const fetchUserToken = data => ({
  type: USER_TOKEN,
  payload: data,
});
export const updatecalculation = data => ({
  type: CALCULATION,
  payload: data,
});