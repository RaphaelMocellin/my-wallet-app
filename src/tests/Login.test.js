import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Login from '../pages/Login';

describe('Testando a página de login', () => {
  test('Saber se há 2 inputs na página', () => {
    renderWithRedux(<Login />);

    const emailInput = screen.getByLabelText('Email:');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText('Password:');
    expect(passwordInput).toBeInTheDocument();
  });

  test('Saber se há um button Entrar na página e se está disabled incialmente', () => {
    renderWithRedux(<Login />);

    const entrarBtn = screen.getByRole('button');
    expect(entrarBtn).toBeInTheDocument();
    expect(entrarBtn).toBeDisabled();
  });

  test('Teste se botão fica enabled após inserir dados', () => {
    renderWithRedux(<Login />);

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const entrarBtn = screen.getByRole('button');

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123456');

    expect(entrarBtn).toBeEnabled();
  });

  test('Testa se atualiza o estado blobal e navega para /carteira', () => {
    renderWithRouterAndRedux(<App />);

    const TEST_EMAIL = 'teste@teste.com';
    const TEST_PASSWORD = '123456';

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const entrarBtn = screen.getByRole('button');

    userEvent.type(emailInput, TEST_EMAIL);
    userEvent.type(passwordInput, TEST_PASSWORD);
    userEvent.click(entrarBtn);

    expect(screen.getByText('Wallet')).toBeInTheDocument();
  });
});
