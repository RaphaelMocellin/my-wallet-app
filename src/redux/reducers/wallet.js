// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_REQUEST_SUCCESSFUL,
  EXPENSE_REQUEST_SUCCESSFUL,
  EXPENSE_TOTAL_CALC,
  EXPENSE_DELETE,
  EXPENSE_EDITOR,
  EXPENSE_EDIT } from '../actions';

const INITIAL_STATE = {
  expenseTotal: 0,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const updateExpenseInfo = (expArray, payload) => expArray.reduce((acc, cur) => {
  if (cur.id === payload.idToEdit) {
    cur.value = payload.expenseValue;
    cur.description = payload.expenseDescription;
    cur.currency = payload.expenseCurrency;
    cur.method = payload.expenseMethod;
    cur.tag = payload.expenseTag;
  }
  acc.push(cur);
  return acc;
}, []);

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_REQUEST_SUCCESSFUL: {
    return {
      ...state,
      currencies: action.payload,
    };
  }
  case EXPENSE_REQUEST_SUCCESSFUL: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  }
  case EXPENSE_TOTAL_CALC: {
    return {
      ...state,
      expenseTotal: state.expenses.reduce((acc, cur) => {
        const { value, exchangeRates, currency } = cur;
        const realCurrency = exchangeRates[currency];
        const finalValue = value * realCurrency.ask;
        return acc + finalValue;
      }, 0),
    };
  }
  case EXPENSE_DELETE: {
    return {
      ...state,
      expenses: [...state.expenses.filter((exp) => exp.id !== action.payload)],
    };
  }
  case EXPENSE_EDITOR: {
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  }
  case EXPENSE_EDIT: {
    return {
      ...state,
      editor: false,
      expenses: [...updateExpenseInfo(state.expenses, action.payload)],
    };
  }
  default:
    return state;
  }
};

export default wallet;
