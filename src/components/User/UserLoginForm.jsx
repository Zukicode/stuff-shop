import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';

import style from '../../styles/User.module.css';

const UserLoginForm = ({ closeForm, toggleFormType }) => {
	const dispatch = useDispatch();

	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();

		const isNotEmpty = Object.values(values).every(val => val);

		if (!isNotEmpty) return;

		dispatch(loginUser(values));
		closeForm();
	};

	return (
		<div className={style.wrapper}>
			<div className={style.close}>
				<AiOutlineClose onClick={closeForm} />
			</div>

			<div className={style.title}>Login</div>

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
						type='password'
						name='password'
						placeholder='Your Password...'
						value={values.password}
						autoComplete='off'
						onChange={handleChange}
						required
					/>
				</div>

				<div className={style.link} onClick={() => toggleFormType('signup')}>
					Create an account
				</div>

				<button type='submit' className={style.submit}>
					Login
				</button>
			</form>
		</div>
	);
};

export default UserLoginForm;
