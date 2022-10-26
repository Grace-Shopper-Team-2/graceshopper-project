import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectSingleProduct,
	fetchSingleProduct,
} from '../ProductsSlice/SingleProductsSlice';

function SingleProduct() {
	const { productId } = useParams();
	const dispatch = useDispatch();

	const singleProduct = useSelector(selectSingleProduct);
	const { name, type, price, description, imageUrl, quantity } = singleProduct;

	useEffect(() => {
		dispatch(fetchSingleProduct(productId));
	}, [dispatch]);

	return (
		<div id="single-product">
			<img src={imageUrl} />
			<h1>{name}</h1> <p>{type}</p>
			<br />
			<p>Price: {price}</p>
			<br />
			<p>Description: {description}</p>
			<br />
			<p>{quantity < 6 ? `only ${quantity} left in stock!` : ''}</p>
		</div>
	);
}

export default SingleProduct;
