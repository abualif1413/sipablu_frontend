import React from 'react';

function Card(props) {
    return (
        <div className="card">
            {
                props.title ? (
                    <div className="card-header d-flex align-items-center">
                        <h4>{props.title}</h4>
                    </div>
                ) : <></>
            }
            <div className="card-body">
                {props.children}
            </div>
        </div>
    );
}

export default Card;