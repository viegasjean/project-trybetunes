import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends React.Component {
  constructor() {
    super();
    this.handleMusicList = this.handleMusicList.bind(this);
    this.handleFavMusicList = this.handleFavMusicList.bind(this);
    this.state = {
      artistName: '',
      albumName: '',
      musics: [],
      favorites: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.handleMusicList();
    this.handleFavMusicList();
  }

  async handleMusicList() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musics,
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
    });
  }

  async handleFavMusicList() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

addToFavorite = async (event, music) => {
  const isChecked = event.target.checked;
  const { favorites } = this.state;
  if (isChecked) {
    // this.setState({ favorites: [...favorites, event.target.value], isLoading: true });
    this.setState({ isLoading: true, favorites: [...favorites, music] });
    await addSong(music);
    // this.setState({ isLoading: false });
  } else {
    const index = favorites.indexOf(event.target.value);
    favorites.splice(index, 1);
    this.setState({ favorites });
    this.setState({ isLoading: true });
    await removeSong(music);
  }
  this.setState({ isLoading: false });
  /* this.setState({ isLoading: true }, () => this.handleFavMusicList());
    await addSong(music);
    this.setState({ isLoading: false }); */
}

render() {
  const { musics, artistName, albumName, isLoading, favorites } = this.state;
  return (
    <>
      <Header />
      <div data-testid="page-album">
        <h1 data-testid="artist-name">{artistName}</h1>
        <h2 data-testid="album-name">{albumName}</h2>
        {isLoading && <Loading />}
        {
          musics.map((music, index) => (
            index > 0 && (
              <div key={ music.trackId }>
                <h5>{ music.trackName }</h5>
                <audio
                  data-testid="audio-component"
                  src={ music.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor="favorite">
                  Favorita
                  <input
                    name="favorite"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    type="checkbox"
                    onChange={ (event) => this.addToFavorite(event, music) }
                    checked={
                      favorites.some((favorite) => music.trackId === favorite.trackId)
                    }
                  />
                </label>
              </div>)
          ))
        }
      </div>
    </>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
