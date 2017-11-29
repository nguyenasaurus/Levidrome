import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';

const key = 'b7b40e21fdccd7460635c749a5dbb44b';
const id = 'a31a2791';

class MainInput extends React.Component {
   constructor() {
      super();
      this.state = {
         firstWord : ''
      }
      this.submitWord = this.submitWord.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.verifyFirstWord = this.verifyFirstWord.bind(this);
      this.checkDefinition = this.checkDefinition.bind(this);
   }
    verifyFirstWord(word) {
        console.log(word);
        axios({
            method: 'GET',
            url: 'https://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: `https://od-api.oxforddictionaries.com/api/v1/inflections/en/${word}`,
                proxyHeaders: {
                    'header_params': 'value',
                    'app_key': key,
                    'app_id': id
                },
                xmlToJSON: false
            }
        }).then((res) => {
            // this is a real word
            
            const checkWord = res.data.results[0].id;
            console.log(checkWord);
            this.checkDefinition(checkWord)
                

        }).catch((error) => {
            console.log(error.response);
            // POPUP MODULE TO SAY ERRORORORORO
        });
    }


    checkDefinition(word) {
        console.log(word)
        axios({
            method: 'GET',
            url: 'https://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: `https://od-api.oxforddictionaries.com/api/v1/entries/en/${word}`,
                proxyHeaders: {
                    'header_params': 'value',
                    'app_key': key,
                    'app_id': id
                },
                xmlToJSON: false
            }
        }).then((res) => {
            console.log(res)
            let definition = res.data.results[0].lexicalEntries[0].entries[0].senses[0]
            console.log(definition)
        })
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