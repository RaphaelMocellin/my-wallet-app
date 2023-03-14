import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenseTotal } = this.props;
    return (
      <div
        className="flex items-center
      justify-between w-1/2 bg-stone-400 rounded-xl px-2 mb-12 shadow-xl"
      >
        <h3 className="m-2 font-semibold" data-testid="email-field">{email}</h3>
        <div className="flex items-center">
          <h5
            className="m-2 text-2xl text-green-700"
            data-testid="total-field"
          >
            {expenseTotal.toFixed(2)}

          </h5>
          <h5 className="m-2 font-semibold" data-testid="header-currency-field">BRL</h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenseTotal: state.wallet.expenseTotal,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenseTotal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
