import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class Credits extends React.Component {
   render () {
      return (
         <div>
            <Link to="/">Main</Link>
            <section>
                <h2>Credits</h2>
                <p>This validator was created using the Oxford English Dictionary API. Credits go to the HackerYou instructor team for coming up with the idea for this project, and to Levi Budd and the Budd family for discovering and spreading the levidrome love.</p>
                <p>Created by created by Justine Nguyen, Manish Sabharwal, and Kitty Yau.</p>
                <h2>Sources</h2>
                <p><a href="https://www.thestar.com/news/canada/2017/11/21/six-year-old-victoria-boys-invented-word-gets-support-from-william-shatner-patricia-arquette.html">https://www.thestar.com/news/canada/2017/11/21/six-year-old-victoria-boys-invented-word-gets-support-from-william-shatner-patricia-arquette.htm</a></p>
                <p><a href="https://www.thestar.com/news/canada/2017/11/24/oxford-dictionaries-responds-to-six-year-old-victoria-boy-whose-invented-word-created-twitter-buzz.html">https://www.thestar.com/news/canada/2017/11/24/oxford-dictionaries-responds-to-six-year-old-victoria-boy-whose-invented-word-created-twitter-buzz.html</a></p>
            </section>
         </div>
      )
   }
}

export default Credits