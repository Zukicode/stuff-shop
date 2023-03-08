import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import style from '../../styles/Category.module.css';

import { useGetProductsQuery } from '../../features/api/apiSlice.js';

import Products from '../Products/Products';
import { useSelector } from 'react-redux';

const Category = () => {
	const { id } = useParams();
	const { list } = useSelector(({ categories }) => categories);

	const defaultValues = {
		title: '',
		price_min: 0,
		price_max: 0,
	};

	const defaultParams = {
		categoryId: id,
		limit: 5,
		offset: 0,
		...defaultValues,
	};

	const [isEnd, setEnd] = useState(false);
	const [cat, setCat] = useState({});
	const [items, setItems] = useState([]);
	const [values, setValues] = useState(defaultValues);
	const [params, setParams] = useState(defaultParams);
	const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleReset = () => {
		setValues(defaultValues);
		setParams(defaultParams);
		setEnd(false);
	};

	useEffect(() => {
		if (isLoading) return;

		if (!data.length) return setEnd(true);

		setItems(_items => [..._items, ...data]);
	}, [isLoading, data]);

	useEffect(() => {
		if (!id) return;

		setItems([]);
		setEnd(false);
		setValues(defaultValues);

		setParams({ ...defaultParams, categoryId: id });

		//eslint-disable-next-line
	}, [id]);

	const handleSubmit = e => {
		e.preventDefault();

		setItems([]);
		setEnd(false);
		setParams({ ...defaultParams, ...values });
	};

	useEffect(() => {
		if (!id || !list.length) return;

		const category = list.find(item => item.id === id * 1);

		setCat(category);
	}, [list, id]);

	return (
		<section className={style.wrapper}>
			<h2 className={style.title}>{cat.name}</h2>
			<form className={style.filters} onSubmit={handleSubmit}>
				<div className={style.filter}>
					<input
						type='text'
						name='title'
						value={values.title}
						onChange={handleChange}
						placeholder='Product name'
					/>
				</div>

				<div className={style.filter}>
					<input
						type='number'
						name='price_min'
						value={values.price_min}
						onChange={handleChange}
						placeholder='0'
					/>
					<span>Price From</span>
				</div>

				<div className={style.filter}>
					<input
						type='number'
						name='price_max'
						value={values.price_max}
						onChange={handleChange}
						placeholder='0'
					/>
					<span>Price To</span>
				</div>

				<button type='submit' hidden />
			</form>

			{isLoading ? (
				<div className={style.loading}>Loading...</div>
			) : !isSuccess || !data.length ? (
				<div className={style.back}>
					<span>No results</span>
					<button onClick={handleReset}>Reset</button>
				</div>
			) : (
				<Products
					products={items}
					title=''
					style={{ padding: 0 }}
					amount={items.length}
				/>
			)}

			{!isEnd && (
				<div className={style.more}>
					<button
						onClick={() =>
							setParams({ ...params, offset: params.offset + params.limit })
						}
					>
						See more
					</button>
				</div>
			)}
		</section>
	);
};

export default Category;
