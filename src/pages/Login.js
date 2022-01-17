import React from 'react';
import PropTypes from 'prop-types';

import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

const MIN_CHAR = 3;

export default class Login extends React.Component {
  constructor() {
    super();
    this.changeRoute = this.changeRoute.bind(this);
    this.state = {
      nome: '',
      isLoading: false,
    };
  }

  async changeRoute(evt) {
    const { nome } = this.state;
    const { history } = this.props;
    evt.preventDefault();
    this.setState({ isLoading: true });
    await createUser({ name: nome });
    history.push('/search');
  }

  render() {
    const { nome, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        {
          isLoading ? <Loading /> : (
            <form>
              <label htmlFor="nome">
                <input
                  data-testid="login-name-input"
                  id="nome"
                  value={ nome }
                  onChange={ (e) => this.setState({ nome: e.target.value }) }
                />
              </label>
              <button
                data-testid="login-submit-button"
                type="submit"
                disabled={ nome.length < MIN_CHAR }
                onClick={ (evt) => this.changeRoute(evt) }
              >
                Entrar
              </button>
            </form>
          )
        }

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};
