import React from 'react';
import ReactDOM from 'react-dom';
import LevidromeValidator from './levidromevalidator';
import ResultsDisplay from './resultsDisplay';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import List from './list';
import About from './about';
import Credits from './credits';


export const Nav = () => {
	return (
		<nav>
			<ul className="headerSection">
				<li><Link to="/about">About</Link></li>
				<li><Link to="/list">Levidrome List</Link></li>
			</ul>
		</nav>
	)
}



export const FooterNav = () => {
	return (
		<nav>
			<ul className="footerSection">
				<li><Link to="/about">About</Link></li>
				<li><Link to="/list">Levidrome List</Link></li>
				<li><Link to="/credits">Credits</Link></li>
			</ul>
		</nav>
	)
}

class App extends React.Component {
    render() {
    	return (
				<Router> 
					<div>
						<main>
							<Route exact path="/" component={LevidromeValidator} />
						</main>
							<Route exact path="/about" component={About} />
							<Route exact path="/list" component={List} />
							<Route exact path="/credits" component={Credits} />
						<footer className="footer clearfix">
							<div className="wrapper">
								<FooterNav />
							</div>
						</footer>
					</div>
				</Router>

		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
