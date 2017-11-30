import React from 'react';
import ReactDOM from 'react-dom';
import LevidromeValidator from './levidromevalidator';
import ResultsDisplay from './resultsDisplay';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import List from './list';
import About from './about';
import Credits from './credits';
import  ListButton  from './featureButtons';

const Nav = () => {
	return (
		<nav>
			<Link to="/about">About</Link>
			<Route exact path="/about" component={About} />
			<Link to="/list">List</Link>
			<Route exact path="/list" component={List} />
			<Link to="/credits">Credits</Link>
			<Route exact path="/credits" component={Credits} />
		</nav>
	)
}
 


class App extends React.Component {
    render() {
      return (
        <Router> 
				<div>
					<h1>LEVIDROME</h1>
          <Link to="/">Main</Link>
          <Route exact path="/" component={LevidromeValidator} />
					<Link to="/about">About</Link>
					<Route exact path="/about" component={About} />
					<Link to="/list">List</Link>
					<Route exact path="/list" component={List} />
					<Link to="/credits">Credits</Link>
					<Route exact path="/credits" component={Credits} />
				</div>
			</Router>

      )
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
