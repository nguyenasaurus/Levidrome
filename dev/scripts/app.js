import React from 'react';
import ReactDOM from 'react-dom';
import MainInput from './MainInput';
import FirstWordValidator from './firstWordValidator';
import ResultsDisplay from './resultsDisplay';

class App extends React.Component {
    render() {
      return (
        <div>
          <MainInput />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
