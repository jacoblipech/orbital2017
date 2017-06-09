import React from 'react';
import ReactDom from 'react-dom';


//import data from './testData';
// if you are actually importing from an api or database
// importing here would cause delays, so you put it in App.js
import App from './components/App';
  

ReactDom.render(
	<App />,
	document.getElementById('root')
    );
        // this.setState({ 
        //   contests: resp.data.contests
        // });

