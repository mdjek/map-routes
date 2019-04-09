import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const AddPoint = (props) => {
    const [inputText, changeInputText] = useState('');
    const [errorText, setErrorText] = useState(null);

    const changeInput = (event) => {
        const text = event.target.value.trim();

        changeInputText(text);
    };

    const handleAddMarker = (event) => {
        const { addMarker } = props;

        event.preventDefault();

        if (inputText) {
            addMarker(inputText);
            changeInputText('');
            setErrorText(null);
        } else {
            setErrorText('Укажите адрес');
        }
    };

    const { requestErrorCode } = props;

    return (
        <Fragment>
            <form
                action="#"
                method="get"
                onSubmit={handleAddMarker}
            >
                <div className="form-group row">
                    <input
                        type="text"
                        name="placemark-name"
                        className="form-control"
                        placeholder="Введите адрес"
                        onChange={changeInput}
                        value={inputText}
                    />
                </div>
            </form>
            { errorText
                && (
                    <div className="error-text">
                        {errorText}
                    </div>
                )
            }
            { !!requestErrorCode
                && (
                    <div className="error-text">
                        {requestErrorCode === 2
                            ? 'Адрес не найден. Измените запрос.'
                            : 'Возникла ошибка. Попробуйте позже.'
                        }
                    </div>
                )
            }
        </Fragment>
    );
};

AddPoint.propTypes = {
    requestErrorCode: PropTypes.number,
    addMarker: PropTypes.func,
};

export default AddPoint;
