'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class Help extends React.Component {
  render() {
    return <div className="help-page">
      <div className="tip-text">
        <span>HELP</span>
      </div>
    </div>;
  }
}

ReactDOM.render(<Help />, document.getElementById('container'));
