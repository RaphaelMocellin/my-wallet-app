import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseDeleteProtocol, expenseEditor } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((exp) => {
                const fixedRate = Number(exp.exchangeRates[exp.currency].ask).toFixed(2);
                const fixedConvertedRate = Number(
                  exp.value * exp.exchangeRates[exp.currency].ask,
                ).toFixed(2);
                return (
                  <tr key={ exp.id }>
                    <td>{exp.description}</td>
                    <td>{exp.tag}</td>
                    <td>{exp.method}</td>
                    <td>{Number(exp.value).toFixed(2)}</td>
                    <td>{exp.exchangeRates[exp.currency].name}</td>
                    <td>{fixedRate}</td>
                    <td>{fixedConvertedRate}</td>
                    <td>Real</td>
                    <td>
                      <button
                        onClick={ () => dispatch(expenseDeleteProtocol(exp.id)) }
                        data-testid="delete-btn"
                      >
                        Excluir
                      </button>
                      <button
                        onClick={ () => dispatch(expenseEditor(exp.id)) }
                        data-testid="edit-btn"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
