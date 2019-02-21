import React, { Component } from 'react';
import { YaMap } from './containers/YaMap';
import { Points } from './containers/Points';
import './App.css';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Points />
                <YaMap />
            </div>
        );
    }
}

export default App;
