import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.handleMusicList = this.handleMusicList.bind(this);
    this.state = {
      artistName: '',
      albumName: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.handleMusicList();
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

  render() {
    const { musics, artistName, albumName } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1 data-testid="artist-name">{artistName}</h1>
          <h2 data-testid="album-name">{albumName}</h2>
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
