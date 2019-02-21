import React from 'react';
import PropTypes from 'prop-types';

const Points = props => {
    return (
        <div>
            <div className="search-block">
                <form
                    action="#"
                    method="get"
                    // onSubmit={this.addPlacemark}
                >
                    <div className="form-group row">
                        <div className="col-xs-9">
                            <input
                                type="text"
                                name="placemark-name"
                                className="form-control"
                                // placeholder="Введите адрес"
                                // onChange={this.changeInput}
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
};

Points.propTypes = {

};

export default Points;
