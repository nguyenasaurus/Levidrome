import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import List from './list'

// import { PlayAgain, RandomPair } from './featureButtons'



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
		this.state = {
			firstWord: '',
			flippedWord: '',
			firstRootWord: '',
			flippedRootWord:'',
			definitions: [],
			word : '',
			pairedWord : '',
			storedItems:[]
		}
		this.getDefinition = this.getDefinition.bind(this);
		this.flipWord = this.flipWord.bind(this);
		this.levidrome = this.levidrome.bind(this);
		this.findRoot = this.findRoot.bind(this);
		this.runRequest = this.runRequest.bind(this);
		this.getFlippedDef = this.getFlippedDef.bind(this);
		this.addToFirebase = this.addToFirebase.bind(this);
		this.clear = this.clear.bind(this);
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
		.catch((error) => {
			swal("Oops!", `${this.state.firstWord} is not a levidrome because ${this.state.flippedWord} is not a valid word`, "error");
		// IF urlselection = wordURL display not a word therefore not not a levidrome
			// 	// POPUP MODULE TO SAY "word is not valid. Try again"
		});
	}

	// first API request to check if the submitted word is valid or not
	findRoot(word) {
		return this.runRequest(wordURL, word).then((i) => {
			// console.log('i', typeof i);
				// if (i ==  'undefined' ) {
					
				// 	return console.log('working')
				// }	else {
				// 	console.log('cow');
					return i.data.results[0].lexicalEntries[0].inflectionOf[0].id
				
		})
	}

	// get definition function to run request
	getDefinition(word) {
		return this.runRequest(definitionURL, word).then((i) => {
			return i.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
		})
		// let definition = res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
	}

	flipWord(str) {
		var splitString = str.split("");
		var reverseArray = splitString.reverse();
		var flippedWord = reverseArray.join("");
		return flippedWord
	}

	//takes the firstWord from child component
	levidrome(firstWord) {

		// console.log(firstWord)
		this.setState({definitions: []})
		const flippedWord = this.flipWord(firstWord)
		console.log(firstWord)
		console.log(flippedWord)
		//runRequest to verify the entered words are valid.Store the root words, which are the 'id' property into firstRootWord and flippedRootWord and push them into the rootWords Array.
		const firstRootWord = this.findRoot(firstWord)
			.then((firstRoot) => {
				this.setState({
					firstWord,
					flippedWord,
					firstRootWord : firstRoot
				}, () => {
						const firstDef = this.getDefinition(this.state.firstRootWord)
						.then((definition) => {
							// clear array and then push definitions into definition array
							
							const newDef = [];
							newDef.push(definition)
							// console.log('definition', definition);
							this.setState({ definitions : newDef});
							this.getFlippedDef();

						})
					}
				)
			})
		}

		getFlippedDef() {
			const flippedRootWord = this.findRoot(this.state.flippedWord)
			.then((flippedRoot) => {
				// console.log('flippedword', this.state.flippedWord)
					this.setState({
						flippedRootWord: flippedRoot
					}, () => {
						// get definition of flippedRoot
						const flippedDef = this.getDefinition(this.state.flippedRootWord)
						.then((definition2) => {
							// push definition into array

							const newDef2 = Array.from(this.state.definitions);
							// console.log('newDef2 before',newDef2);
							newDef2.push(definition2)
							// console.log('newDef2',newDef2);
							this.setState({ definitions : newDef2})
							console.log(this.state.definitions)
							if (this.state.definitions.length === 2) {
								this.addToFirebase();
							}
						})
					}
				)
			})
		}

		addToFirebase() {
			const dbRef = firebase.database().ref()
			
			dbRef.push(
				{
					firstWord: this.state.firstWord,
					flippedWord: this.state.flippedWord
				}
			);
		}
		clear() {
			console.log('clear is working')
			this.setState({
					//clear stuff here
					firstWord:"",
					flippedWord: ""
			})
		}
	render() {
		return (
			<div>
				{/* main input for word */}
				<MainInput submitWord={this.levidrome} clearInputs={this.clear} displayFlipped={this.state.flippedWord} />
				{/* adding definitions to page*/}

				 {/* {this.state.definitions.map((definition) => {
					return <p>{definition}</p>
					{console.log(definition)}
					})}  */}
				

				<div className="row">
					<div className="wrapper displayDefinitions">
						{this.state.definitions.map((definition) => {
							return <DisplayDefinitions display={definition}/>
						})}
					</div>
				</div>
			</div>
		)
	}
}

const DisplayDefinitions = (props) => {
	return (
			<div className="col-2"> 
				<p>{props.display}</p>
			</div>
	)
}



class MainInput extends React.Component {
	constructor() {
		super();
		this.state = {
			submittedWord: '',
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.clearInput = this.clearInput.bind(this);
	}

	handleChange(e) {
		this.setState({
			submittedWord: e.target.value,
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		// prop this.state.bothWords to parent
		if (this.state.submittedWord === '') {
			return swal("Please enter a word!");	 
		}
		this.props.submitWord(this.state.submittedWord)
	}

	clearInput(e) {
		e.preventDefault();
		
		this.setState ({
			submittedWord: ""
		})
		this.props.clearInputs()
	}

	render() {
		return (

		<div className="row levidrome">
			<div className="wrapper">
				<form action=""	className="col-2" onSubmit={this.handleSubmit}>
					<input type="text"
						className="firstWord"
						onChange={this.handleChange}
						value={this.state.submittedWord} />
					<div className="relative">
						<button className="button" type="submit">Submit</button>
						<button className= "clear" onClick={this.clearInput}>clear</button>
					</div>
				</form>
				<div className="col-2">
					<input type="text" className="secondWord" value={this.props.displayFlipped}/>
				</div>

			{/* <PlayAgain />
			<RandomPair /> */}
			</div>
		</div>

		)
	}
}
