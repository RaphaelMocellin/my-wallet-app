export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
export const CURRENCIES_REQUEST_SUCCESSFUL = 'CURRENCIES_REQUEST_SUCCESSFUL';
// export const CURRENCIES_REQUEST_FAILED = 'CURRENCIES_REQUEST_FAILED';
export const EXPENSE_REQUEST_SUCCESSFUL = 'EXPENSE_REQUEST_SUCCESSFUL';
export const EXPENSE_TOTAL_CALC = 'EXPENSE_TOTAL_CALC';
export const EXPENSE_DELETE = 'EXPENSE_DELETE';

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

const expenseRequestSuccessful = (newExpense) => ({
  type: EXPENSE_REQUEST_SUCCESSFUL,
  payload: newExpense,
});

const expenseTotalCalc = () => ({
  type: EXPENSE_TOTAL_CALC,
});

const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const rawCurrencies = await response.json();
  const currencies = Object.keys(rawCurrencies).filter((cur) => cur !== 'USDT');
  //   console.log(currencies);
  dispatch(currenciesRequestSuccessful(currencies));
};

const fetchExpense = (expenseInfo) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const rawCurrencies = await response.json();

  const { expenseValue,
    expenseDescription,
    expenseCurrency,
    expenseMethod,
    expenseTag,
    expenses } = expenseInfo;

  const newExpense = {
    id: expenses.length,
    value: expenseValue,
    description: expenseDescription,
    currency: expenseCurrency,
    method: expenseMethod,
    tag: expenseTag,
    exchangeRates: rawCurrencies,
  };
  dispatch(expenseRequestSuccessful(newExpense));
  dispatch(expenseTotalCalc());
};

const expenseDelete = (id) => ({
  type: EXPENSE_DELETE,
  payload: id,
});

const expenseDeleteProtocol = (id) => (dispatch) => {
  dispatch(expenseDelete(id));
  dispatch(expenseTotalCalc());
};

export { submitEmail, fetchCurrencies, fetchExpense, expenseDeleteProtocol };
