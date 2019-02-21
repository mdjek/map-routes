import React, { Component } from 'react';
import { RouteMap } from './containers/RouteMap';
import { Points } from './components';
import './App.css';


class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="wrapper">
                    <RouteMap />
                </div>
            </div>
        );
    }
}

export default App;
