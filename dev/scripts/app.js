import React from 'react';
import ReactDOM from 'react-dom';
import MainInput from './MainInput';
import ResultsDisplay from './resultsDisplay';
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from 'header';


class App extends React.Component {
    render() {
      return (
        <div>
          <Header />
          <MainInput />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
