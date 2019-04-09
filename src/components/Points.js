import React from 'react';
import PropTypes from 'prop-types';
import ReactDragList from 'react-drag-list';
import { AddPoint } from '.';

const Points = (props) => {
    const handleUpdate = (e, updatedList) => {
        const { changeOrder } = props;

        changeOrder(updatedList);
    };

    const {
        addMarker,
        placemarks,
        removeMarker,
        requestErrorCode,
    } = props;

    return (
        <div className="point-panel">
            <div className="point-panel__form">
                <AddPoint
                    addMarker={addMarker}
                    requestErrorCode={requestErrorCode}
                />
            </div>
            <div className="point-panel__list">
                {placemarks && (
                    <ReactDragList
                        dataSource={placemarks}
                        handles={false}
                        rowKey="id"
                        row={(item, index) => (
                            <div key={item.id} className="point">
                                <span className="point__info">
                                    <strong>{`${index + 1}.`}</strong>
                                    {` ${item.properties.balloonContent}`}
                                </span>
                                <a
                                    href="#del"
                                    className="point__delete"
                                    onClick={() => removeMarker(item.id)}
                                >
                                    <span className="visually-hidden">Удалить</span>
                                </a>
                            </div>
                        )}
                        onUpdate={handleUpdate}
                    />
                )}
            </div>
        </div>
    );
};

Points.defaultProps = {
    placemarks: [],
};

Points.propTypes = {
    addMarker: PropTypes.func,
    changeOrder: PropTypes.func,
    placemarks: PropTypes.arrayOf(PropTypes.shape()),
    removeMarker: PropTypes.func,
    requestErrorCode: PropTypes.number,
};

export default Points;
