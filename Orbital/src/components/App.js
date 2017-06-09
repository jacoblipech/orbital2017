import React from 'react';
import Header from './Header';

class App extends React.Component {
  state = {
    pageHeader: 'Orbital Project',
    age: '10'
  };
  
  render() {
    return(
	<div className="App">
          <Header message={this.state.pageHeader}/>
	</div>
    );
  }
} 

export default App;
