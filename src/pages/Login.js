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
      <div className=" flex items-center justify-center bg-stone-200 min-h-screen">
        <form
          className="bg-white px-16 py-12 rounded-2xl shadow-xl text-center"
          onSubmit={ (e) => {
            e.preventDefault();

            dispatch(submitEmail(emailInput));
            history.push('/carteira');
          } }
        >
          <h1 className="text-5xl mb-6 text-blue-500">My Wallet Login</h1>
          <fieldset>
            <label
              htmlFor="emailInput"
              className="font-semibold"
            >
              Email
              <input
                id="emailInput"
                type="email"
                name="emailInput"
                value={ emailInput }
                onChange={ onChangeHandler }
                data-testid="email-input"
                className="w-full bg-black p-1 rounded text-white  mt-1 mb-3"
              />
            </label>
          </fieldset>
          <fieldset>
            <label
              htmlFor="passwordInput"
              className="font-semibold"
            >
              Password
              <input
                id="passwordInput"
                type="password"
                name="passwordInput"
                value={ passwordInput }
                onChange={ onChangeHandler }
                data-testid="password-input"
                className="w-full bg-black p-1 rounded text-white mt-1 mb-3"
              />
            </label>
          </fieldset>
          <button
            disabled={ !btnDisabled }
          >
            Entrar

          </button>
        </form>
      </div>
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
