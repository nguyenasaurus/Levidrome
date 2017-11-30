import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { PlayAgain , RandomPair } from './featureButtons'


// Initialize Firebase
var config = {
apiKey: "AIzaSyBFxEo8gLNFkJ-sw5jCqGnewR3l9YInPs4",
authDomain: "levidromeapp.firebaseapp.com",
databaseURL: "https://levidromeapp.firebaseio.com",
projectId: "levidromeapp",
storageBucket: "",
messagingSenderId: "231325881110"
};
firebase.initializeApp(config);

const key = '10faf101cb01f99e61fe0358e0807373';
//'b7b40e21fdccd7460635c749a5dbb44b'; first key
const id = 'ba5599bf';
//'a31a2791'; first id
const definitionURL = 'entries';
const wordURL = 'inflections';
// let definition = res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]

export default class LevidromeValidator extends React.Component {
	constructor() {
		super();
		this.state={
			words:[],
			definitions: []
		}
		this.verifyWord = this.verifyWord.bind(this);
		this.getDefinition = this.getDefinition.bind(this);
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
			return console.log(result)
		})
		// .catch((error) => {
		// 	console.log(error.response);
		// 	// 	// POPUP MODULE TO SAY "word is not valid. Try again"
		// });
	}

	// first API request to check if the submitted word is valid or not
	verifyWord(words) {
		console.log(words)
		words.map((i) => {
			this.runRequest(wordURL, i);
		})

		// return this.runRequest(wordURL, word);
	}

	// get definition function to run request
	getDefinition(definitionURL, word) {
		return this.runRequest(definitionURL, word);
	}

	render() {
		return (
			<div>
				{/* main input for word */}
				<MainInput submitWord={this.verifyWord} />

				{/* adding definitions to page */}
				{this.state.definitions.map((definition) => {
					return <DisplayResults key={$} entry={definition} />
				})}
				
			</div>
		)
	}
}

class MainInput extends React.Component {
	constructor() {
	super();
		this.state = {
			submittedWord: '',
			flippedWord: '',
			bothWords:[]
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.flipWord = this.flipWord.bind(this);
	}

	handleChange(e) {
		this.setState({
				submittedWord: e.target.value,
		})
	}

	//write a function that takes the firstWord and flip it + put into array to send to parent
	flipWord(str) {
		var splitString = str.split("");
		var reverseArray = splitString.reverse();
		var flippedWord = reverseArray.join("");
		this.state.bothWords = []
		this.state.bothWords.push(this.state.submittedWord, flippedWord)
		this.setState({
			flippedWord
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		// flip the word
		let flippedWord = this.flipWord(this.state.submittedWord)
		// console.log(this.state.bothWords)
		// prop this.state.bothWords to parent
		this.props.submitWord(this.state.bothWords)
	}

	render() {
		return (
		<div>
			<form action="" 
			onSubmit={this.handleSubmit}>
			<input type="text" 
			className="firstWord" 
			onChange ={this.handleChange}
			value={this.state.firstWord}/>
			<button type="submit">Submit</button>
			</form>

			<PlayAgain />
			<RandomPair />

		</div>
		)
	}
}

class DisplayResults extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{props.entry}
			</div>
		)
	}
}



// //verify word
// this.verifyWord(wordURL, this.state.flippedWord).then((res) => {
// 	console.log(res.data.results[0].lexicalEntries[0].inflectionOf[0].id)
// 	rootword = res.data.results[0].lexicalEntries[0].inflectionOf[0].id;
// 	this.state.rootWords.push(rootword)
// 	console.log(this.state.rootWords)
// })

// // get definitions for first word
// this.getDefinition(definitionURL, this.state.firstWord).then((firstDefinition) => {
// 	firstDefinition = firstDefinition.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
// 	console.log(firstDefinition)
// 	this.setState({
// 		firstDefinition
// 	})
// })

//Get the word that was typed in and check if it is a real word
// this.verifyWord(wordURL, this.state.firstWord).then((res) => {
// 	console.log(res.data.results[0].lexicalEntries[0].inflectionOf[0].id)
// 	rootword = res.data.results[0].lexicalEntries[0].inflectionOf[0].id;
// 	this.state.rootWords.push(rootword)
// 	console.log(this.state.rootWords)
// })