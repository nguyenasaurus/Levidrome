import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';

class About extends React.Component {
       render() {
          return (

			<div>
				<header>
					<h2>About</h2>
					{/* <Link to="/">Main</Link> */}
				</header>
				<section>
					<h3>What is a levidrome?</h3>
					<p>A levidrome, pronounced lev-ih-drome, is a word that spells another word backwards. They're littered throughout the English language, but it wasn't until Levi Budd from Vancouver, Canada, asked his parents for the accurate term to describe such a word, that they realized that such a term did not exist in the dictionary. Thus, levidrome was born, named after the inquisitive boy who was thought to ask his parents, "What do we call a word that spells another word backwards?".</p>
					{/* Video from the Budd family about Levidromes */}
					<iframe width="400" height="215" src="https://www.youtube.com/embed/jpZ3bh1R6Kk?rel=0" frameBorder="0"></iframe>
				</section>
				<section>
					<h3>Make 'levidrome' dictionary-worthy!</h3>
					<p>Both the Merriam-Webster Dictionary and the Oxford English Dictionary have been contacted regarding the possibility of having levidrome officially accepted as a formal word in the dictionary. The response has been the same - to have earn a spot in their dictionaries, the word has to be used by a group of people for an extended period of time. It isn't in the dictionary yet, but if we start using it today, that may change!</p>
					<iframe width="400" height="215" src="https://www.youtube.com/embed/JJkV9HwtM4k?rel=0" frameBorder="0"></iframe>
				</section>
			</div>

		)
	}
}

export default About