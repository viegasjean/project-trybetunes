import React from 'react';
import Header from '../components/Header';

export default class NotFound extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-not-found">
          <h1>404 OPS - Página não encontrada!</h1>
        </div>
      </>
    );
  }
}
