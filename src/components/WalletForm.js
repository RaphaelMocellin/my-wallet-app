import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenseValue: 0,
    expenseDescription: '',
    expenseCurrency: 'USD',
    expenseMethod: 'Dinheiro',
    expenseTag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { expenseValue,
      expenseDescription,
      expenseCurrency,
      expenseMethod,
      expenseTag } = this.state;

    const { currencies } = this.props;

    const onChangeHandler = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
    };

    return (
      <form>
        <label htmlFor="expenseValue">
          Valor:
          <input
            id="expenseValue"
            type="number"
            name="expenseValue"
            value={ expenseValue }
            onChange={ onChangeHandler }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="expenseDescription">
          Descrição:
          <input
            id="expenseDescription"
            type="text"
            name="expenseDescription"
            value={ expenseDescription }
            onChange={ onChangeHandler }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="expenseCurrency">
          Moeda:
          <select
            id="expenseCurrency"
            name="expenseCurrency"
            value={ expenseCurrency }
            onChange={ onChangeHandler }
            data-testid="currency-input"
          >
            {
              currencies.map((currency) => (
                <option key={ currency } value={ currency }>{currency}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="expenseMethod">
          Método de Pagamento:
          <select
            id="expenseMethod"
            name="expenseMethod"
            value={ expenseMethod }
            onChange={ onChangeHandler }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="expenseTag">
          Tag:
          <select
            id="expenseTag"
            name="expenseTag"
            value={ expenseTag }
            onChange={ onChangeHandler }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
export default connect(mapStateToProps)(WalletForm);
