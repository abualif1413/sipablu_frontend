import React from 'react';

function AddButton(props) {
    let caption = (props.posisi === "add") ? props.addCaption : props.editCaption;
    let onClick = (props.posisi === "add") ? props.onClickAdd : props.onClickEdit;
    let block = (props.block) ? "btn-block" : "";
    let fa = (props.fa) ? props.fa : "fa-save";
    let btn = <button type="button" className={`btn btn-sm btn-primary ${block}`} onClick={onClick}>
                <i className={`fa ${fa} fa-lg`}>{' '}</i>
                {' '}
                {caption}
            </button>;
    if(props.isLoading === 1) {
        btn = <button type="button" className={`btn btn-sm btn-default ${block}`} disabled>
                <i className="fa fa-spin fa-spinner fa-lg">{' '}</i>
                {' '}
                Loading...
            </button>;
    }
    return btn;
}

export default AddButton;