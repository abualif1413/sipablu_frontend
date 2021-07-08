import React from 'react';

function UploadButton(props) {
    let caption = (props.posisi === "add") ? props.addCaption : props.editCaption;
    let onClick = (props.posisi === "add") ? props.onClickAdd : props.onClickEdit;
    let btn = <button type="button" className="btn btn-primary btn-block" onClick={onClick}>
                <i className="fa fa-upload fa-lg">{' '}</i>
                {' '}
                {caption}
            </button>;
    if(props.isLoading === 1) {
        btn = <button type="button" className="btn btn-default btn-block" disabled>
                <i className="fa fa-spin fa-spinner fa-lg">{' '}</i>
                {' '}
                Loading...
            </button>;
    }
    return btn;
}

export default UploadButton;