import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { expenseDeleteProtocol, expenseEditor } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;

    return (
      <div className="flex bg-stone-400 rounded-xl px-2 w-5/6 my-12">
        <table className="flex flex-col bg-stone-400 rounded-xl px-2 w-full">
          <thead>
            <tr className="flex justify-between text-lg mt-6">
              <th className="w-1/12">Descrição</th>
              <th className="w-1/12">Tag</th>
              <th className="w-2/12">Método de pagamento</th>
              <th className="w-1/12">Valor</th>
              <th className="w-2/12">Moeda</th>
              <th className="w-1/12">Câmbio utilizado</th>
              <th className="w-1/12">Valor convertido</th>
              <th className="w-1/12">Moeda de conversão</th>
              <th className="w-2/12">Editar/Excluir</th>
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
                  <tr
                    className="flex items-center justify-between
                    text-center my-3 border-b border-black
                    hover:font-bold hover:bg-stone-300 hover:rounded"
                    key={ exp.id }
                  >
                    <td className="w-1/12">{exp.description}</td>
                    <td className="w-1/12">{exp.tag}</td>
                    <td className="w-2/12">{exp.method}</td>
                    <td className="w-1/12">{Number(exp.value).toFixed(2)}</td>
                    <td className="w-2/12">{exp.exchangeRates[exp.currency].name}</td>
                    <td className="w-1/12">{fixedRate}</td>
                    <td className="w-1/12">{fixedConvertedRate}</td>
                    <td className="w-1/12">Real</td>
                    <td className="w-2/12">
                      <button
                        onClick={ () => dispatch(expenseEditor(exp.id)) }
                        data-testid="edit-btn"
                        className="bg-green-500 p-2 m-2
                        rounded-lg drop-shadow-xl
                        hover:bg-green-800 hover:text-white border border-black"
                      >
                        Edit
                      </button>
                      <button
                        onClick={ () => {
                          dispatch(expenseDeleteProtocol(exp.id));
                          Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Expense Deleted',
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        } }
                        data-testid="delete-btn"
                        className="bg-red-500 p-2 mx-2
                        rounded-lg drop-shadow-xl
                        hover:bg-red-800 hover:text-white border border-black"
                      >
                        Deletar
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
