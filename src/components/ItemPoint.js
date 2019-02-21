import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemPoint extends Component {
    render() {
        return (
            <div>
                <span>Название</span>
                <span>[x]</span>
            </div>
        );
    }
}

ItemPoint.propTypes = {};

export default ItemPoint;
