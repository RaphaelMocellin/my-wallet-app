import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="flex flex-col items-center bg-stone-200 min-h-screen">
        <h2
          className="text-7xl
        mb-6 text-black-500 mt-12 font-extrabold"
        >
          My Wallet Overview

        </h2>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
