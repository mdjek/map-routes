import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Points extends Component {
    render() {
        return (
            <div>
                <div className="search-block">
                    <form
                        action="#"
                        method="get"
                        onSubmit={this.searchHandler}
                    >
                        <div className="form-group row">
                            <div className="col-xs-9">
                                <input
                                    type="text"
                                    name="search"
                                    className="form-control"
                                    // placeholder="Ваш запрос"
                                    onChange={this.changeHandler}
                                />
                            </div>

                            <div className="col-xs-3">
                                <button
                                    className="btn btn-primary form-control"
                                >
                                    {'Добавить'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Points.propTypes = {};

export default Points;
