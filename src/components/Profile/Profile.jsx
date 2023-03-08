import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/user/userSlice';

import style from '../../styles/Profile.module.css';

const Profile = () => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector(state => state.user);

	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		avatar: '',
	});

	useEffect(() => {
		if (!currentUser) return;

		setValues(currentUser);
	}, [currentUser]);

	const handleChange = ({ target: { value, name } }) =>
		setValues({ ...values, [name]: value });

	const handleSubmit = e => {
		e.preventDefault();

		const isEmpty = Object.values(values).some(val => !val);

		if (isEmpty) return;

		dispatch(updateUser(values));
	};

	return (
		<section className={style.profile}>
			{!currentUser ? (
				<span>You need to login!</span>
			) : (
				<form className={style.form} onSubmit={handleSubmit}>
					<div className={style.group}>
						<input
							type='email'
							name='email'
							placeholder='Your Email...'
							value={values.email}
							autoComplete='off'
							onChange={handleChange}
							required
						/>
					</div>
					<div className={style.group}>
						<input
							type='name'
							name='name'
							placeholder='Your Name...'
							value={values.name}
							autoComplete='off'
							onChange={handleChange}
							required
						/>
					</div>
					<div className={style.group}>
						<input
							type='password'
							name='password'
							placeholder='Your Password...'
							value={values.password}
							autoComplete='off'
							onChange={handleChange}
							required
						/>
					</div>
					<div className={style.group}>
						<input
							type='avatar'
							name='avatar'
							placeholder='Your avatar...'
							value={values.avatar}
							autoComplete='off'
							onChange={handleChange}
							required
						/>
					</div>
					<button type='submit' className={style.submit}>
						UPDATE
					</button>
				</form>
			)}
		</section>
	);
};

export default Profile;
