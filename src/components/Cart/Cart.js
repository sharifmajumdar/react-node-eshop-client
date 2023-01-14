import React from 'react';
//import { useEffect } from 'react';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    let productName = [""];
    let numberOfProducts = 0;
    let msg = "";
    let msg2 = "";
    //productName.includes(product.name)? numberOfProducts -= 1 :

    cart.map(product => (
        // eslint-disable-next-line
        numberOfProducts += 1, 
        total = total + Number(product.price),
        productName = productName + numberOfProducts + (". ") + product.name + (" ")
        ));

/*     useEffect(() => {
        props.handleGetPrice(total);
    }, [0]); */
    return (
        <div>
            <h3>Cart Summary</h3>
            <hr />
            <small><b>Item Selected: </b>{numberOfProducts}</small><br />
            <small><b>Total Price: </b> EUR{total}</small><br />
            <small><b>Item List:</b> {productName}</small> <br /><br />
            <div>
                {
                    props.children
                }              
            </div> <br />
            <span>{msg}</span><br />
            <span>{msg2}</span>
        </div>
    );
};

export default Cart;