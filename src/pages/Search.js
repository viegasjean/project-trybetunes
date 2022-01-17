import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  render() {
    const { search } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              value={ search }
              onChange={ (e) => this.setState({ search: e.target.value }) }
            />
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ search.length < 2 }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}
