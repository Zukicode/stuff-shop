import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { BsHandbag } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';

import style from './../../styles/Header.module.css';

import { ROUTES } from './../../utils/routes.js';

import LOGO from './../../images/logo.svg';
import AVATAR from './../../images/avatar.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../features/user/userSlice';
import { useGetProductsQuery } from '../../features/api/apiSlice';

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [searchValue, setSearchValue] = useState('');
	const { currentUser, cart } = useSelector(state => state.user);

	const [values, setValues] = useState({ name: 'Guest', avatar: AVATAR });

	const { data, isLoading } = useGetProductsQuery({ title: searchValue });

	const handleClick = () => {
		if (!currentUser) dispatch(toggleForm(true));
		else navigate(ROUTES.PROFILE);
	};

	useEffect(() => {
		if (!currentUser) return;

		setValues(currentUser);
	}, [currentUser]);

	const handleSearch = ({ target: { value } }) => setSearchValue(value);

	return (
		<div className={style.header}>
			<div className={style.logo}>
				<Link to={ROUTES.HOME}>
					<img src={LOGO} alt='Stuff' />
				</Link>
			</div>

			<div className={style.info}>
				<div className={style.user} onClick={handleClick}>
					<div
						className={style.avatar}
						style={{ backgroundImage: `url(${values.avatar})` }}
					></div>
					<div className={style.username}>{values.name}</div>
				</div>

				<form className={style.form}>
					<div className={style.icon}>
						<svg className='icon'>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
						</svg>
					</div>

					<div className={style.input}>
						<input
							type='search'
							name='search'
							placeholder='Search for anything...'
							autoComplete='off'
							onChange={handleSearch}
							value={searchValue}
						/>
					</div>

					{searchValue && (
						<div className={style.box}>
							{isLoading
								? 'Loading...'
								: !data.length
								? 'No result'
								: data.map(({ title, images, id }) => {
										return (
											<Link
												onClick={() => setSearchValue('')}
												className={style.item}
												key={id}
												to={`/products/${id}`}
											>
												<div
													className={style.image}
													style={{ backgroundImage: `url(${images[0]})` }}
												></div>
												<div className={style.title}>{title}</div>
											</Link>
										);
								  })}
						</div>
					)}
				</form>

				<div className={style.account}>
					<Link to={ROUTES.HOME} className={style.favourites}>
						<AiOutlineHeart className={style.iconCart} />
					</Link>

					<Link to={ROUTES.CART} className={style.cart}>
						<BsHandbag className={style.iconCart} />
						{cart.length ? (
							<span className={style.count}>{cart.length}</span>
						) : (
							''
						)}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
