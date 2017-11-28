import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';

class MainInput extends React.Component {
   constructor() {
      super();
      this.state = {
         firstWord : ''
      }
      this.submitWord = this.submitWord.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.verifyFirstWord = this.verifyFirstWord.bind(this);
   }
    verifyFirstWord(word) {
        console.log(word);
        const key = 'b7b40e21fdccd7460635c749a5dbb44b';
        const id = 'a31a2791';
        axios({
            method: 'GET',
            url: 'https://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: `https://od-api.oxforddictionaries.com/api/v1/en/${word}`,
                proxyHeaders: {
                    'header_params': 'value',
                    'app_key': key,
                    'app_id': id
                },
                xmlToJSON: false
            }
        }).then((res) => {
            console.log(res);
        });
    }
   submitWord(e) {
      e.preventDefault();
      console.log(this.state.firstWord)
      const submittedWord = this.state.firstWord
    //   Write a method to run axios to validate word from API when the button is submitted
    // If the word is true, then definition method runs. If not a word, 'try again'
    this.verifyFirstWord(submittedWord);
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
         </div>
      )
   }
}


export default MainInput