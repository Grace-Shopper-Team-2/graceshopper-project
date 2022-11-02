import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearCart, getTotal } from '../localCart/cartSlice';

function Checkout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const products = useSelector((state) => state.cart);
	const cartItems = JSON.parse(localStorage.getItem('cartItems'));
	const { cartTotalAmount } = products;
	const taxNY = 0.08;
	const shipping = '0.00';
	const estimatedTaxes = cartTotalAmount * taxNY;
	const total = estimatedTaxes + cartTotalAmount;
	console.log(cartItems);

	useEffect(() => {
		dispatch(getTotal());
	}, [products]);

	const handleClick = () => {
		dispatch(clearCart());
		navigate('/purchase-confirmed');
	};

	return (
		<>
			<div id="order-summary">
				<h1>Order Summary</h1>
				<p>Subtotal: {cartTotalAmount.toFixed(2)}</p>
				<p>Shipping: {shipping}</p>
				<p>Est. Tax: {estimatedTaxes.toFixed(2)}</p>
				<p>______________________________________</p>
				<p>Total: {total.toFixed(2)}</p>
			</div>
			<div id="order-details">
				<h1>Order Details</h1>
				<ul>
					{cartItems.map((product) => (
						<li key={product.id}>
							<img src={product.imageUrl} />
							<p>{product.name}</p>
							<p>${product.price}</p>
							<p>Quantity: {product.cartQuantity}</p>
						</li>
					))}
				</ul>
			</div>
			<button onClick={() => handleClick()}>Confirm Purchase</button>
		</>
	);
}

export default Checkout;
