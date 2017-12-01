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
			flippedWord: '',
			firstWord: '',
			flippedFirstWord:'',
			rootFirstWord: '',
			rootFlippedWord:'',
			rootWords: [],
			definitions: []
		}
		this.getDefinition = this.getDefinition.bind(this);
		this.flipWord = this.flipWord.bind(this);
		this.levidrome = this.levidrome.bind(this);
		this.rootFirst = this.rootFirst.bind(this);
		this.runRequest = this.runRequest.bind(this);
	}

	flipWord(str) {
		var splitString = str.split("");
		var reverseArray = splitString.reverse();
		var flippedWord = reverseArray.join("");
		this.setState({flippedWord})
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
		// IF urlselection = wordURL display not a word therefore not not a levidrome
		// 	// 	// POPUP MODULE TO SAY "word is not valid. Try again"
		// });
	}

	// first API request to check if the submitted word is valid or not
	findRoot(word) {
		return this.runRequest(wordURL, word).then((i) => {
			const rootWord = i.data.results[0].lexicalEntries[0].inflectionOf[0].id
		})
	}

	// get definition function to run request
	getDefinition() {
		this.state.rootWords.map((w) => {
			this.runRequest(definitionURL, w);
		})
	}

	//takes the firstWord from child component
	levidrome(firstWord) {
		// console.log(firstWord)
		this.setState({firstWord})
		// console.log(this.state.firstWord)
		this.flipWord(this.state.firstWord)

		console.log(this.state.firstWord + ' ' + this.state.flippedWord)

		// 
	}

	render() {
		return (
			<div>
				{/* main input for word */}
				<MainInput submitWord={this.levidrome} />

				{/* adding word + flipped word to page */}
				{/* {this.state.words.map((word) => {
					console.log(word)
					return <DisplayResults key={$} wordEntry={word} />
				})} */}
				{/* adding definitions to page
				{this.state.definitions.map((definition) => {
					return <DisplayResults key={$} definitionEntry={definition} />
				})} */}
				
			</div>
		)
	}
}

class MainInput extends React.Component {
	constructor() {
	super();
		this.state = {
			submittedWord: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
				submittedWord: e.target.value,
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		// prop this.state.bothWords to parent
		this.props.submitWord(this.state.submittedWord)
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

const DisplayResults = (props) => {
		return (
			<div className="col-2">
				{this.props.wordEntry}
				{/* {this.props.definitionEntry} */}
			</div>
		)
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