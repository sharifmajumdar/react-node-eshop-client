import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { ShopContext } from '../../App';

const Order = () => {
    const [showProducts] = useContext(ShopContext);
    const [cart, setCart] = useState([]);
    const [orderPlaced] = useState(false);
    const navigate = useNavigate();

    //This section handle the placing of order and free the cart 
/*     const handlePlaceOrder = () => {
        setOrderPlaced(true);
        processOrder();
        //const confirmMessage = 'Order Placed!';
        setCart([]);
        //handleAddHistory();
        const confirmMessage = 'Order Placed!';
        return confirmMessage;
    } */

    const handleProceedCheckout = (e) => {
        //navigate('/shipment', { state: { handlePlaceOrder: handlePlaceOrder } });
        navigate('/shipment');
    }

    //Revome the unnecessay item and update the cart 
    const removeProduct = (productId) => {
        const newCart = cart.filter(pd => pd._id !== productId);
        setCart(newCart);
        removeFromDatabaseCart(productId);
    };

    //Fetch item from local storage by using object keys and set it to the cart
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productIds = Object.keys(savedCart);

        const cartProducts = productIds.map(pdId => {
            const product = showProducts.find(pd => pd._id === pdId);
            return product;
        });
        setCart(cartProducts);
    }, [showProducts]);
    return (
        <div className='row'>
            <div className="col-lg-8 col-xs-12">
                {
                    cart.map(pd => <ReviewItem 
                        key = {pd._id}
                        product = {pd}
                        removeProduct = {removeProduct}></ReviewItem>)
                }
                { orderPlaced && <h1 style={{marginLeft: "250px", color: "green"}}>Order has been placed!!!</h1> }
                { cart.length < 1 && orderPlaced === false? <h1 style={{marginLeft: "250px", color: "red"}}>No item selected yet! Please choose an item</h1>:null}
            </div>
            <div className='col-lg-4 col-xs-12'>
                <div>
                    <Cart cart = {cart} >
                        {
                            cart.length >=1 && orderPlaced === false?
                                <button type="button" onClick={handleProceedCheckout} className='btn btn-info place-button'>
                                    Proceed Checkout
                                </button>:null
                        }
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Order;