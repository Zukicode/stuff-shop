import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSignupForm from './UserSignupForm';

import style from './../../styles/User.module.css';
import { setFormType, toggleForm } from '../../features/user/userSlice';
import UserLoginForm from './UserLoginForm';

const UserForm = () => {
	const dispatch = useDispatch();
	const { showForm, formType } = useSelector(state => state.user);

	const closeForm = () => dispatch(toggleForm(false));
	const toggleFormType = type => dispatch(setFormType(type));

	return showForm ? (
		<>
			<div className={style.overlay} onClick={closeForm}></div>
			{formType === 'signup' ? (
				<UserSignupForm toggleFormType={toggleFormType} closeForm={closeForm} />
			) : (
				<UserLoginForm toggleFormType={toggleFormType} closeForm={closeForm} />
			)}
		</>
	) : (
		<></>
	);
};

export default UserForm;
