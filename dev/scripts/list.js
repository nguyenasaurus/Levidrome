import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';



class List extends React.Component {
   render () {
      return (

         <div>
            <h2>List</h2>
            <Link to="/">Main</Link>

         </div>

      )
   }
}

export default List