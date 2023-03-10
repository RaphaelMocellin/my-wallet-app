import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    emailInput: '',
    passwordInput: '',
  };

  render() {
    const { emailInput, passwordInput } = this.state;
    const { history, dispatch } = this.props;

    const onChangeHandler = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
    };

    const pswMinLeng = 5;
    const validRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const btnDisabled = passwordInput.length > pswMinLeng && emailInput.match(validRegex);

    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault();

          dispatch(submitEmail(emailInput));
          history.push('/carteira');
        } }
      >
        <label htmlFor="emailInput">
          Email:
          <input
            id="emailInput"
            type="email"
            name="emailInput"
            value={ emailInput }
            onChange={ onChangeHandler }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="passwordInput">
          Password:
          <input
            id="passwordInput"
            type="password"
            name="passwordInput"
            value={ passwordInput }
            onChange={ onChangeHandler }
            data-testid="password-input"
          />
        </label>
        <button
          disabled={ !btnDisabled }
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
