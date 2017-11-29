import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';

const key = 'b7b40e21fdccd7460635c749a5dbb44b';
const id = 'a31a2791';
const definitionURL = 'entries';
const wordURL = 'inflections';

class MainInput extends React.Component {
   constructor() {
      super();
      this.state = {
			firstWord : '',
			firstWordDefinition : '',
			flippedWord : '',
			flippedWordDefinition : ''
      }
      this.submitWord = this.submitWord.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.verifyFirstWord = this.verifyFirstWord.bind(this);
		// this.checkDefinition = this.checkDefinition.bind(this);
		this.flipWord = this.flipWord.bind(this);
		this.runRequest = this.runRequest.bind(this);
		this.flipTheWord = this.flipTheWord.bind(this);
	}
	
	runRequest(urlSection, word) {
		axios({
			method: 'GET',
			url: 'https://proxy.hackeryou.com',
			dataResponse: 'json',
			paramsSerializer: function (params) {
				return Qs.stringify(params, { arrayFormat: 'brackets' })
			},
			params: {
				reqUrl: `https://od-api.oxforddictionaries.com/api/v1/${urlSection}/en/${word}`,
				proxyHeaders: {
					'header_params': 'value',
					'app_key': key,
					'app_id': id
				},
				xmlToJSON: false
			}
		}).then ((result) => {
			console.log(result);
			return result
		}).catch((error) => {
				console.log(error.response);
			// 	// POPUP MODULE TO SAY "word is not valid. Try again"
		});
	}
	
	flipTheWord(word) {
		this.flipWord(word);
	  console.log(this.flipWord(word));
  }

	// first API request to check if the submitted word is valid or not
	verifyFirstWord(wordURL, word) {
		this.runRequest(wordURL, word);
	}
 
	// If the first word is valid, then flip the word.

	


	// Check the flipped word is valid
	// If the flipped word is valid, get the definition of the first and the flipped word

















	// .then((res) => {
	// 	// this is a real word
	// 	const checkWord = res.data.results[0].id;
	// 	const firstDefinition = this.checkDefinition(checkWord);
	// 	// const wordFlipped = this.flipWord(checkWord);
	// 	// const flippedDefinition = this.checkDefinition(wordFlipped);
	// 	this.setState ({
	// 		firstWordDefinition : firstDefinition,
	// 		// flippedWord : wordFlipped,
	// 		// flippedWordDefinition : flippedDefinition
	// 	})
	// }).catch((error) => {
	// 	console.log(error.response);
	// 	// POPUP MODULE TO SAY "word is not valid. Try again"
	// });
	// else statement?


















	//second API request to check for the definition of the first word
	// checkDefinition(word) {
	// 	axios({
	// 		method: 'GET',
	// 		url: 'https://proxy.hackeryou.com',
	// 		dataResponse: 'json',
	// 		paramsSerializer: function (params) {
	// 			return Qs.stringify(params, { arrayFormat: 'brackets' })
	// 		},
	// 		params: {
	// 			reqUrl: `https://od-api.oxforddictionaries.com/api/v1/entries/en/${word}`,
	// 			proxyHeaders: {
	// 			'header_params': 'value',
	// 			'app_key': key,
	// 			'app_id': id
	// 			},
	// 			xmlToJSON: false
	// 		}
	// 	}).then((res) => {
	// 		let definition = res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
	// 		console.log(definition)
	// 		// this.setState ({
	// 		// 	firstWordDefinition : definition
	// 		// })
	// 	})
	// }

	//write a function that takes the firstWord and flip it
  flipWord(str) {
	var splitString = str.split("");
	var reverseArray = splitString.reverse();
	var flippedWord = reverseArray.join("");
	return flippedWord;
  }

  	//run first API call again to check if flippedWord is valid

	submitWord(e) {
		e.preventDefault();
		console.log(this.state.firstWord)
		const submittedWord = this.state.firstWord
		this.verifyFirstWord(wordURL, submittedWord);
	}
	
   handleChange(e) {
      const wordSubmitted = e.target.value
      this.setState({
         firstWord : wordSubmitted
      })

	}
	
   render() {
      return (
         <div>
			<form action="" 
			onSubmit={this.submitWord}>

			<input type="text" 
			className="firstWord" 
			onChange ={this.handleChange}
			value={this.state.firstWord}/>

			<button type="submit">Submit</button>
			</form>
			{/* <FirstWordValidator submittedWord={this.state.firstWord} /> */}
			<h2>{this.state.firstWordDefinition}</h2>
			<h3>{this.state.flippedWord}</h3>
			<h3>{this.state.secondWordDefinition}</h3>
         </div>
      )
   }
}


export default MainInput