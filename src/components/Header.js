import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenseTotal } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{email}</h3>
        <h5 data-testid="total-field">{expenseTotal.toFixed(2)}</h5>
        <h5 data-testid="header-currency-field">BRL</h5>
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
