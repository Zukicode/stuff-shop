import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { createUser } from '../../features/user/userSlice';

import style from '../../styles/User.module.css';

const UserSignupForm = ({ closeForm, toggleFormType }) => {
	const dispatch = useDispatch();

	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		avatar: '',
	});

	const handleChange = ({ target: { value, name } }) =>
		setValues({ ...values, [name]: value });

	const handleSubmit = e => {
		e.preventDefault();

		const isEmpty = Object.values(values).some(val => !val);

		if (isEmpty) return;

		dispatch(createUser(values));
		closeForm();
	};

	return (
		<div className={style.wrapper}>
			<div className={style.close}>
				<AiOutlineClose onClick={closeForm} />
			</div>

			<div className={style.title}>Sign Up</div>

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

				<div className={style.link} onClick={() => toggleFormType('login')}>
					I already have an account
				</div>

				<button type='submit' className={style.submit}>
					Create an account
				</button>
			</form>
		</div>
	);
};

export default UserSignupForm;
