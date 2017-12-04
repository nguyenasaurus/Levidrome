import React from 'react';
import ReactDOM from 'react-dom';
import LevidromeValidator from './levidromevalidator';
import ResultsDisplay from './resultsDisplay';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import List from './list';
import About from './about';
// import Credits from './credits';
// import  ListButton  from './featureButtons';

const Nav = () => {
	return (
		<nav>
			<Link to="/">Main</Link>
			<Link to="/about">About</Link>
			{/* <Link to="/list">List</Link>
			<Link to="/credits">Credits</Link> */}
			<Route exact path="/" component={LevidromeValidator} />
			<Route exact path="/about" component={About} />
			{/* <Route exact path="/list" component={List} />
			<Route exact path="/credits" component={Credits} /> */}
		</nav>
	)
}
 


class App extends React.Component {
    render() {
      return (
        <Router> 
				<div>
					<h1>Levidrome <br/>Validator</h1>
					<Nav />
          {/* <Link to="/">Main</Link>
					<Link to="/about">About</Link>
					<Link to="/list">List</Link>
					<Link to="/credits">Credits</Link>
          <Route exact path="/" component={LevidromeValidator} />
					<Route exact path="/about" component={About} />
					<Route exact path="/list" component={List} />
					<Route exact path="/credits" component={Credits} /> */}
				</div>
			</Router>

      )
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
