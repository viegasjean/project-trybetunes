import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.showUser = this.showUser.bind(this);
    this.state = {
      userName: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.showUser();
  }

  async showUser() {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({
      userName: user.name,
      isLoading: false,
    });
  }

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search"> Search </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
        <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
        {
          isLoading ? <Loading /> : <h4 data-testid="header-user-name">{userName}</h4>
        }
      </header>);
  }
}
