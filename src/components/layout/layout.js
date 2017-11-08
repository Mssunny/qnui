'use strict';

import React from 'react';

import Header from 'components/header/header';
import SideMenu from 'components/side-menu/side-menu';
import classnames from 'classnames';
import './layout.scss';
import $ from 'jquery';
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folden: false
    }
  }
  onMenuFolden(flag) {
    this.setState({
      folden: flag
    })
  }
  render() {
    let { folden } = this.state;
    let className = classnames({
      "right-content": true,
      "right-content-full": !folden
    });
    // console.log("this.props.children:",this.props.children);
    return (
      <div className="main container">
        <Header />
        <div className="main-content">
          <SideMenu onMenuFolden={this.onMenuFolden.bind(this)} folden={this.state.folden} />
          <div className={className} style={{minHeight:'800px'}}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
