import React from 'react';
import ReactDOM from 'react-dom';
import MainInput from './MainInput';
import ResultsDisplay from './resultsDisplay';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import List from './list';
import About from './about';
import Credits from './credits';



class App extends React.Component {
    render() {
      return (
        <Router> 
				<div>
					<h1>LEVIDROME</h1>
					{/* <MainInput /> */}
					<Link to="/MainInput">MainInput</Link>
					<Route exact path="/maininput" component={MainInput} />
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

// Text for about.js file
// class About extends React.Component {
//   render() {
//     return (
//       <section>
//         <h3>What is a levidrome?</h3>
//         <p>A levidrome, pronounced lev-ih-drome, is a word that spells another word backwards. They're littered throughout the english language, but it wasn't until Levi Budd from Vancouver, Canada, asked his parents for the accurate term to describe such a word, that they realized that such a term did not exist in the dictionary. Thus, levidrome was born, named after the inquisitive boy who was thought to ask his parents, "What do we call a word that spells another word backwards?".</p>
//         {/* Video from the Budd family about Levidromes */}
//         <iframe width="560" height="315" src="https://www.youtube.com/embed/jpZ3bh1R6Kk?rel=0" frameborder="0" allowfullscreen></iframe>
//         <h3>Make 'levidrome' dictionary-worthy!</h3>
//       </section>
//     )
//   }
// }
ReactDOM.render(<App />, document.getElementById('app'));
