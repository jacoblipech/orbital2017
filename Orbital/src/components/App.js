import React from 'react';
import Header from './Header';

class App extends React.Component {
  state = {
    pageHeader: 'Naming Contests',
    age: '10'
  };
  
  render() {
    return(
			<div className="App">
        <Header message={this.state.pageHeader}/>
        <Header message={this.state.age}/>
			</div>
    );
  }
} 

export default App;