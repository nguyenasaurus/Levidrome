import React from 'react';
import ReactDOM from 'react-dom';

class MainInput extends React.Component {
   constructor() {
      super();
      this.state = {
         firstWord : ''
      }
      this.submitWord = this.submitWord.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   submitWord(e) {
      e.preventDefault();
      console.log(this.state.firstWord)
      const submittedWord = this.state.firstWord
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
         </div>
      )
   }
}

export default MainInput