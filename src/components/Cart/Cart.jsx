import React from 'react';

import style from '../../styles/Cart.module.css';

import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import { sumBy } from '../../utils/common';
import {
	addItemToCart,
	deleteItemFromCart,
} from '../../features/user/userSlice';

const Cart = () => {
	const dispatch = useDispatch();
	const { cart } = useSelector(state => state.user);

	const changeQuantity = (item, quantity) => {
		dispatch(addItemToCart({ ...item, quantity }));
	};

	const deleteItem = item => dispatch(deleteItemFromCart(item.id));

	return (
		<section className={style.cart}>
			<h2 className={style.title}>Your cart</h2>

			{!cart.length ? (
				<div className={style.empty}>Here is empty!</div>
			) : (
				<>
					<div className={style.list}>
						{cart.map(item => {
							const { title, category, images, price, id, quantity } = item;
							return (
								<div className={style.item} key={id}>
									<div
										className={style.image}
										style={{ backgroundImage: `url(${images[0]})` }}
									/>
									<div className={style.info}>
										<h3 className={style.name}>{title}</h3>
										<div className={style.category}>{category.name}</div>
									</div>

									<div className={style.price}>{price}$</div>

									<div className={style.quantity}>
										<div
											className={style.minus}
											onClick={() =>
												changeQuantity(item, Math.max(1, quantity - 1))
											}
										>
											<AiOutlineMinus className='icon' />
										</div>
										<span>{quantity}</span>
										<div
											className={style.plus}
											onClick={() =>
												changeQuantity(item, Math.max(1, quantity + 1))
											}
										>
											<AiOutlinePlus className='icon' />
										</div>
									</div>

									<div className={style.total}>{price * quantity}$</div>

									<div className={style.close} onClick={() => deleteItem(item)}>
										<AiOutlineClose className='icon' />
									</div>
								</div>
							);
						})}
					</div>

					<div className={style.actions}>
						<div className={style.total}>
							TOTAL PRICE:{' '}
							<span>
								{sumBy(cart.map(({ quantity, price }) => quantity * price))}$
							</span>
						</div>

						<button className={style.proceed}>Proceed to checkout</button>
					</div>
				</>
			)}
		</section>
	);
};

export default Cart;
