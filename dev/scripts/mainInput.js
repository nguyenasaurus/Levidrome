import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';

const key = '10faf101cb01f99e61fe0358e0807373';
//'b7b40e21fdccd7460635c749a5dbb44b'; first key
const id = 'ba5599bf';
//'a31a2791'; first id
const definitionURL = 'entries';
const wordURL = 'inflections';
// let definition = res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]

class MainInput extends React.Component {
	constructor() {
	super();
		this.state = {
			firstWord : '',
			firstDefinition : '',
			flippedWord : '',
			secondDefinition : ''
		}
		this.submitWord = this.submitWord.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.verifyWord = this.verifyWord.bind(this);
		this.flipWord = this.flipWord.bind(this);
		this.getDefinition = this.getDefinition.bind(this);
	}

	handleChange(e) {
		const wordSubmitted = e.target.value
		this.setState({
			firstWord: wordSubmitted
		})
	}

	runRequest(urlSection, word) {
		return axios({
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
		}).then((result) => {
			return result
		})
		// .catch((error) => {
		// 	console.log(error.response);
		// 	// 	// POPUP MODULE TO SAY "word is not valid. Try again"
		// });
	}

	// first API request to check if the submitted word is valid or not
	verifyWord(wordURL, word) {
		return this.runRequest(wordURL, word);
	}

	// get definition function to run request
	getDefinition(definitionURL, word) {
		return this.runRequest(definitionURL, word);
	}

	//write a function that takes the firstWord and flip it
	flipWord(str) {
		var splitString = str.split("");
		var reverseArray = splitString.reverse();
		var flippedWord = reverseArray.join("");
		this.setState({
			flippedWord
		})
	}

	submitWord(e) {
		e.preventDefault();
		//Get the word that was typed in and check if it is a real word
		this.verifyWord(wordURL, this.state.firstWord)
		
		// flip the word
		this.flipWord(this.state.firstWord);

		//verify word
		this.verifyWord(wordURL, this.state.flippedWord);
		
		// get definitions for first word
		this.getDefinition(definitionURL, this.state.firstWord).then((firstDefinition) => {
			firstDefinition = firstDefinition.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
			console.log(firstDefinition)
			this.setState({
				firstDefinition
			})
		})

		// get definition for second word
		this.getDefinition(definitionURL, this.state.flippedWord).then((secondDefinition) => {
			secondDefinition = secondDefinition.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
			console.log(secondDefinition)
			this.setState({
				secondDefinition
			})
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
			<h2>{this.state.firstDefinition}</h2>
			<h3>{this.state.flippedWord}</h3>
			<h3>{this.state.secondDefinition}</h3>
			</div>
		)
	}
}


export default MainInput