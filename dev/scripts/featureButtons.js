import React from 'react';
import ReactDOM from 'react-dom';

export default class ListButton extends React.Component {
   redirectToList() {

   }
   render() {
      return (
         <button onClick={this.redirectToList}>Levidrome List</button>
         // onClick direct the page to the Levidrome list component (list.js)
      )
   }
}

export class PlayAgain extends React.Component {
   redirectToMain() {
      
         }
   render () {
      return (
         <button onClick={this.redirectToMain}>Play Again</button>
         // onClick, clear the input buttons and direct to the levidromevalidator page
      )
   }
}

export class RandomPair extends React.Component {
   randomLevidrome() {
      
   }
   render () {
      return (
         <button onClick={this.randomLevidrome}>Give me a Levidrome</button>
         // onClick, run loop through levidrome list array and display a random pair of levidromes
      )
   }
}

