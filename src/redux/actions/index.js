export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
export const CURRENCIES_REQUEST_SUCCESSFUL = 'CURRENCIES_REQUEST_SUCCESSFUL';
// export const CURRENCIES_REQUEST_FAILED = 'CURRENCIES_REQUEST_FAILED';

const submitEmail = (email) => ({
  type: SUBMIT_EMAIL,
  payload: email,
});

const currenciesRequestSuccessful = (currencies) => ({
  type: CURRENCIES_REQUEST_SUCCESSFUL,
  payload: currencies,
});

// const currenciesRequestFalied = (error) => ({
//   type: CURRENCIES_REQUEST_FAILED,
//   payload: error,
// });

const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const rawCurrencies = await response.json();
  const currencies = Object.keys(rawCurrencies).filter((cur) => cur !== 'USDT');
  //   console.log(currencies);
  dispatch(currenciesRequestSuccessful(currencies));
};

export { submitEmail, fetchCurrencies };
