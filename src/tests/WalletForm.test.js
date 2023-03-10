import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import WalletForm from '../components/WalletForm';

describe('Testando o componente WalletForm', () => {
  test('Saber se todos os inputs e o button estão na página corretamente', () => {
    renderWithRedux(<WalletForm />);

    const expenseValue = screen.getByLabelText('Valor:');
    const expenseDescription = screen.getByLabelText('Descrição:');
    const expenseCurrency = screen.getByLabelText('Moeda:');
    const expenseMethod = screen.getByLabelText('Método de Pagamento:');
    const expenseTag = screen.getByLabelText('Tag:');
    const addBtn = screen.getByRole('button');

    expect(expenseValue).toBeInTheDocument();
    expect(expenseDescription).toBeInTheDocument();
    expect(expenseCurrency).toBeInTheDocument();
    expect(expenseMethod).toBeInTheDocument();
    expect(expenseTag).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();
  });

  test('Teste se dá fecth corretament no didMount', () => {
    const initialEntries = ['/carteira'];
    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
      wallet: {
        expenseTotal: 0,
        currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
        expenses: [],
      },
    };
    const { store } = renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    expect(store.getState().wallet.currencies).toHaveLength(15);
  });

  //   test('Saber se atualiza o estado global corretamente', () => {
  //     const initialEntries = ['/carteira'];
  //     const initialState = {
  //       user: {
  //         email: 'teste@teste.com',
  //       },
  //       wallet: {
  //         expenseTotal: 0,
  //         currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
  //         expenses: [],
  //       },
  //     };
  //     const { store } = renderWithRouterAndRedux(<App />, { initialState, initialEntries });

  //     const expenseValue = screen.getByLabelText('Valor:');
  //     const expenseDescription = screen.getByLabelText('Descrição:');
  //     const addBtn = screen.getByRole('button');

  //     expect(expenseValue).toBeInTheDocument();
  //     expect(expenseDescription).toBeInTheDocument();
  //     expect(addBtn).toBeInTheDocument();

  //     userEvent.type(expenseValue, 10);
  //     userEvent.type(expenseDescription, 'descrição teste');
  //     userEvent.click(addBtn);

//     expect(store.getState().wallet.expenses).toHaveLength(1);
//   });
});
