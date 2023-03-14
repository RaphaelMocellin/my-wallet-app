import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testando a página de Wallet', () => {
  const descriptionTxt = 'Descrição:';

  test('Saber se todos os inputs e o button estão na página corretamente', () => {
    renderWithRedux(<Wallet />);

    const expenseValue = screen.getByLabelText('Valor:');
    const expenseDescription = screen.getByLabelText(descriptionTxt);
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

  test('Teste se o fetch carregou as currencies no didMount', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRedux(<Wallet />);

    expect(global.fetch).toBeCalledTimes(1);

    const currInput = await screen.findByLabelText('Moeda:');
    expect(currInput).toBeVisible();
  });

  test('Teste se adiciona uma expense corretamente no estado global', async () => {
    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
      wallet: {
        expenseTotal: 0,
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    expect(global.fetch).toBeCalledTimes(1);
    expect(store.getState().wallet.expenses).toHaveLength(0);

    const expenseValue = screen.getByLabelText('Valor:');
    const expenseDescription = screen.getByLabelText(descriptionTxt);
    const addBtn = screen.getByRole('button');

    userEvent.type(expenseValue, '10');
    userEvent.type(expenseDescription, 'Teste');
    userEvent.click(addBtn);

    const expense1 = await screen.findByText('Teste');
    expect(expense1).toBeInTheDocument();
  });

  test('Testando se edita corretamente uma exnpense', async () => {
    const testExpense = {
      id: 0,
      value: '10',
      description: 'teste',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: mockData,
    };

    const initialState = {
      user: {
        email: 'rapha@teste.com',
      },
      wallet: {
        expenseTotal: 0,
        currencies: [],
        expenses: [testExpense],
        editor: false,
        idToEdit: 0,
      },
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const editBtn = await screen.findByRole('button', { name: 'Edit' });
    expect(editBtn).toBeInTheDocument();

    userEvent.click(editBtn);

    const expenseDescription = await screen.findByLabelText(descriptionTxt);
    expect(expenseDescription).toBeInTheDocument();

    userEvent.type(expenseDescription, '1');

    const editExpBtn = screen.getByRole('button', { name: 'Editar despesa' });
    expect(editExpBtn).toBeInTheDocument();
    userEvent.click(editExpBtn);

    const expNewDescription = await screen.findByText('teste1');
    expect(expNewDescription).toBeInTheDocument();
  });

  test('Testando se exclui corretamente uma exnpense', async () => {
    const testExpense = {
      id: 0,
      value: '10',
      description: 'teste',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: mockData,
    };

    const initialState = {
      user: {
        email: 'rapha@teste.com',
      },
      wallet: {
        expenseTotal: 0,
        currencies: [],
        expenses: [testExpense],
        editor: false,
        idToEdit: 0,
      },
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const expDescription = await screen.findByText('teste');
    expect(expDescription).toBeInTheDocument();

    const deleteBtn = await screen.findByRole('button', { name: 'Excluir' });
    expect(deleteBtn).toBeInTheDocument();

    userEvent.click(deleteBtn);

    expect(expDescription).not.toBeInTheDocument();
  });
});
