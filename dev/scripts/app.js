import React from 'react';
import ReactDOM from 'react-dom';
import MainInput from './MainInput';

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
