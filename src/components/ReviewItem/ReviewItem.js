import React from 'react';

const ReviewItem = (props) => {
    const {name, price, _id} = props.product;
    const reviewStyle ={
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        paddingTop: '5px',
        marginLeft: '5px',
    }
    return (
        <div style={reviewStyle}>
            <h4 style={{color: 'black'}}>Product Name: {name}</h4> 
            <h6>Regular Price: {price}</h6>
            <button className='btn btn-info'
                onClick={() => props.removeProduct(_id)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;