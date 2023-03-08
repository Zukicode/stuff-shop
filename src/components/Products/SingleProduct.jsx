import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../features/api/apiSlice';
import { getRelatedProducts } from '../../features/products/productsSlice';

import { ROUTES } from '../../utils/routes.js';
import Product from './Product';
import Products from './Products';

const SingleProduct = () => {
	const dispatch = useDispatch();
	const { list, related } = useSelector(state => state.products);
	const { id } = useParams();
	const navigate = useNavigate();

	const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

	useEffect(() => {
		if (!isFetching && !isLoading && !isSuccess) {
			navigate(ROUTES.HOME);
		}
	}, [isLoading, isFetching, isSuccess, navigate]);

	console.log(related);

	useEffect(() => {
		if (!data || !list.length) return;
		dispatch(getRelatedProducts(data.category.id));
	}, [data, dispatch, list.length]);

	return !data ? (
		<section>Loading...</section>
	) : (
		<>
			<Product {...data} />
			<Products products={related} amount={5} title={'Related products'} />
		</>
	);
};

export default SingleProduct;
