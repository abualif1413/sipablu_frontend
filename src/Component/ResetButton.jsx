import React from 'react';

function ResetButton(props) {
    return (
        <button type="button" className="btn btn-sm btn-warning" onClick={props.onClick}>
                <i className="fa fa-refresh fa-lg">{' '}</i>
                {' '}
                {props.caption}
            </button>
    );
}

export default ResetButton;