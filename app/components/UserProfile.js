import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from './styled/Form.js';
import { MainContainer } from './styled/Div.js';
import { Image } from './styled/Image.js';
import { Header, Title, Paragraph } from './styled/Font.js';
import { HrBlue } from './styled/Div.js';
import SmallButton from './styled/SmallButton.js';

class UserProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <MainContainer>
        <Container>
          {user.image ? (
            <Image src={user.image} />
          ) : (
            <Image src="https://cdn3.iconfinder.com/data/icons/iconset-1-1/24/icon_set_outlinder-05-512.png" />
          )}
          <HrBlue />
          <Header>{user.name}</Header>
          <Title>{user.email}</Title>
          <HrBlue />
          {user.bio ? <Paragraph>{user.bio}</Paragraph> : null}
          <HrBlue />
          <SmallButton onClick={() => this.props.history.push('/edituser')}>
            Edit Profile
          </SmallButton>
        </Container>
      </MainContainer>
    );
  }
}
const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, null)(UserProfile);
