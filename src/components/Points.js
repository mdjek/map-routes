import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDragList from 'react-drag-list';
import { AddPoint } from '.';

class Points extends Component {
    handleUpdate = (e, updatedList) => {
        const { changeOrder } = this.props;

        changeOrder(updatedList);
    };

    render() {
        const {
            addMarker,
            placemarks,
            removeMarker,
            requestErrorCode,
        } = this.props;

        return (
            <div className="points">
                <div className="points__form">
                    <AddPoint
                        addMarker={addMarker}
                        requestErrorCode={requestErrorCode}
                    />
                </div>
                <div className="points__list">
                    <ReactDragList
                        dataSource={placemarks}
                        handles={false}
                        rowKey="id"
                        row={(item, index) => (
                            <div key={item.id} className="point-item">
                                <span className="point-item__info">
                                    <strong>{`${index + 1}.`}</strong>
                                    {' '}
                                    {`${item.properties.balloonContent}`}
                                </span>
                                <span
                                    className="point-item__delete"
                                    onClick={() => removeMarker(item.id)}
                                />
                            </div>
                        )}
                        onUpdate={this.handleUpdate}
                    />
                </div>
            </div>
        );
    }
};

Points.propTypes = {
    placemarks: PropTypes.array,
    removeMarker: PropTypes.func,
    requestErrorCode: PropTypes.number,
};

export default Points;
