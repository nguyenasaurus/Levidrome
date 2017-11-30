import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class Credits extends React.Component {
   render () {
      return (
         <div>
            <h2>Credits</h2>
            <Link to="/">Main</Link>
         </div>
      )
   }
}

export default Credits