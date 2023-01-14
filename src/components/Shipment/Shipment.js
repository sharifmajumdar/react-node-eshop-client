import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const navigate = useNavigate();
    const [, , loggedInUser] = useContext(ShopContext);
    //const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (userInfo) => {
        const savedCart = getDatabaseCart();
        const orderHistory = {
            customerEmail: loggedInUser.email,
            payment: 'Cash on delivery',
            status: 'Delivered',
            products: savedCart,
            shipment: userInfo,
            orderTime: new Date().toDateString('dd-mm-yyyy')
        }
        fetch('http://localhost:5000/addOrderHistory', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderHistory)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    //alert(location.state.handlePlaceOrder());
                    processOrder();
                    alert('your order placed successfully');
                    navigate("/");
                }
            });
    };
    return (
        <div className='container'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-12 d-flex flex-column align-items-center'>
                    <form className='ship-form col-md-4 col-md-offset-4' onSubmit={handleSubmit(onSubmit)}>
                        <h1>Shipment Information</h1>
                        <input {...register("name", { required: true })} defaultValue={loggedInUser.name} placeholder="Your name" />
                        {errors.name && <span className='error'>Name is required</span>}

                        <input {...register("email", { required: true })} defaultValue={loggedInUser.email} placeholder="Your email" />
                        {errors.email && <span className='error'>Email is required</span>}

                        <input {...register("address", { required: true })} placeholder="Your address" />
                        {errors.address && <span className='error'>Address is required</span>}

                        <input {...register("phone", { required: true })} placeholder="Your phone number" />
                        {errors.phone && <span className='error'>Phone number is required</span>}

                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Shipment;