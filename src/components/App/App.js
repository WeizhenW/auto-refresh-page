import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';

class App extends Component{
  state = {
    currentTime: moment().format('HH:mm:ss'),
    enterTime: '',
    quoteTime: '',
    waitTime: '',
  }

  getWaitTime = () => {
    axios.get('/api/time')
      .then(response => {
        // console.log(response.data[0].enter_time);
        const enterTime = response.data[0].enter_time;
        const quoteTime = response.data[0].quote_time;
        this.setState({
          currentTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          enterTime: enterTime,
          quoteTime: quoteTime,
          waitTime: quoteTime * 60 - (moment().diff(moment(enterTime), 'seconds')),
        })
      });
  }
  componentDidMount() {
    this.interval = setInterval(() => this.getWaitTime(), 2000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className="App">
        <h1>Test Auto Refresh Page</h1>
        <h2>The current time is {this.state.currentTime}</h2>
        <h2>Quote Time is {this.state.quoteTime} min</h2>
        <h2>User joined the waitlist at {this.state.enterTime}</h2>
        <h2>Time to sit {this.state.waitTime} seconds</h2>
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>
      </div>
    );
  }
  
}

export default App;
