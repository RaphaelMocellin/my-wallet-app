// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_REQUEST_SUCCESSFUL,
  EXPENSE_REQUEST_SUCCESSFUL,
  EXPENSE_TOTAL_CALC,
  EXPENSE_DELETE } from '../actions';

const INITIAL_STATE = {
  expenseTotal: 0,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

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
        // console.log(finalValue);
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
  default:
    return state;
  }
};

export default wallet;
