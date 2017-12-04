import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';








class List extends React.Component {
    constructor() {
        super();
        this.state = {
            storedItems:[],
            uniquePairs: [],
        }
    }
    //retrive info from firebase to display in levidrome list
    componentDidMount() {
        const dbRef = firebase.database().ref()

        dbRef.on('value', (firebaseData) => {
            const pairArray = [];
            const levidromeData = firebaseData.val();

            for (let itemsKey in levidromeData) {
                pairArray.push(levidromeData[itemsKey])
            }
            this.setState({
                storedItems: pairArray
            });            
            
            let words = this.state.storedItems;
            let uniquePairs = [];

            words.filter((pair) => {
                // console.log(pair)
                let i = uniquePairs.findIndex(x => x.firstWord == pair.firstWord);
                if (i <= -1) {
                    uniquePairs.push({firstWord: pair.firstWord, flippedWord: pair.flippedWord})
                    this.setState({ uniquePairs })
                }
            })
            console.log(this.state.uniquePairs)
        });

        
    }

    render() {
        return (
            <div className="row">
                <div className="wrapper">
                    <ul className="levidromeList">
                        {this.state.uniquePairs.map((pair) => {
                        return (
                            <li className="pairing">
                                <li className="col-2">{pair.firstWord}</li>
                                <li className="col-2">{pair.flippedWord}</li>
                            </li>
                        )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default List