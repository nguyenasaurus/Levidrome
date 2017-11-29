import React from 'react';
import ReactDOM from 'react-dom';
import MainInput from './mainInput';
import axios from 'axios';

class FirstWordValidator extends React.Component {
    constructor() {
		super();
		this.state = {
			// firstSubmittedWord: this.props.
			firstWordDef: ''
		}
	}

	render() {
		return (
			<div>
				<p></p>
			</div>
		)
	}
}

export default FirstWordValidator