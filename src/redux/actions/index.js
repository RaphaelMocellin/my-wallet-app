import { v4 as uuidv4 } from 'uuid';

export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
export const CURRENCIES_REQUEST_SUCCESSFUL = 'CURRENCIES_REQUEST_SUCCESSFUL';
export const EXPENSE_REQUEST_SUCCESSFUL = 'EXPENSE_REQUEST_SUCCESSFUL';
export const EXPENSE_TOTAL_CALC = 'EXPENSE_TOTAL_CALC';
export const EXPENSE_DELETE = 'EXPENSE_DELETE';
export const EXPENSE_EDIT = 'EXPENSE_EDIT';
export const EXPENSE_EDITOR = 'EXPENSE_EDITOR';

const submitEmail = (email) => ({
  type: SUBMIT_EMAIL,
  payload: email,
});

const currenciesRequestSuccessful = (currencies) => ({
  type: CURRENCIES_REQUEST_SUCCESSFUL,
  payload: currencies,
});

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
  dispatch(currenciesRequestSuccessful(currencies));
};

const fetchExpense = (expenseInfo) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const rawCurrencies = await response.json();

  const { expenseValue,
    expenseDescription,
    expenseCurrency,
    expenseMethod,
    expenseTag } = expenseInfo;

  const newExpense = {
    id: uuidv4(),
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

const expenseEditor = (id) => ({
  type: EXPENSE_EDITOR,
  payload: id,
});

const expenseEdit = (info) => ({
  type: EXPENSE_EDIT,
  payload: info,
});

const expenseEditProtocol = (info) => (dispatch) => {
  dispatch(expenseEdit(info));
  dispatch(expenseTotalCalc());
};

export { submitEmail,
  fetchCurrencies,
  fetchExpense,
  expenseDeleteProtocol,
  expenseEditProtocol,
  expenseEditor };
