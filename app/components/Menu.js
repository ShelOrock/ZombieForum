import React, { Component } from 'react';

import { Button } from './styled/Button.js';
import { MenuContainer, Menu, MenuItem } from './styled/Menu.js';
import { Hr } from './styled/Div.js';

export default class extends Component {
  handleOnClick = e => {
    e.preventDefault();
  };

  render() {
    return (
      <MenuContainer>
        <Menu>
          <Button onClick={this.handleOnClick}>Start a Conversation</Button>
          <MenuItem to='/codeeditor'>Latest Conversations</MenuItem>
          <MenuItem to='/'>Bookmarked</MenuItem>
          <MenuItem to='/'>Conversations for you</MenuItem>
          <Hr />
          <MenuItem to='/'>Content buckets</MenuItem>
        </Menu>
      </MenuContainer>
    );
  }
}
