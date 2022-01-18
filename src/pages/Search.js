import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

export default class Search extends React.Component {
  constructor() {
    super();
    this.handleSerch = this.handleSerch.bind(this);
    this.state = {
      search: '',
      artistName: '',
      isLoading: false,
      loaded: false,
      albuns: [],
    };
  }

  async handleSerch(evt) {
    evt.preventDefault();
    const { search } = this.state;
    this.setState({ isLoading: true });
    const albuns = await searchAlbumsAPI(search);
    this.setState({
      artistName: search,
      search: '',
      isLoading: false,
      albuns,
    });
    if (albuns.length > 0) {
      this.setState({ loaded: true });
    }
  }

  render() {
    const { search, isLoading, loaded, albuns, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ (evt) => this.handleSerch(evt) }>
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
        { isLoading && <Loading /> }
        { loaded ? (<h1>{`Resultado de álbuns de: ${artistName}`}</h1>
        ) : (<h1>Nenhum álbum foi encontrado</h1>)}
        <section id="albuns">
          {
            albuns.map((album) => (
              <Link
                key={ album.collectionId }
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                {album.collectionName}
              </Link>
            ))
          }
        </section>
      </div>

    );
  }
}
