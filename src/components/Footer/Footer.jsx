import React from 'react';
import { Link } from 'react-router-dom';

import style from './../../styles/Footer.module.css';

import { ROUTES } from './../../utils/routes.js';

import LOGO from './../../images/logo.svg';

import {
	AiOutlineInstagram,
	AiOutlineYoutube,
	AiOutlineFacebook,
} from 'react-icons/ai';

const Footer = () => {
	return (
		<section className={style.footer}>
			<div className={style.logo}>
				<Link to={ROUTES.HOME}>
					<img src={LOGO} alt='Stuff' />
				</Link>
			</div>

			<div className={style.rights}>
				Developed by <a href=''>zukicode</a>
			</div>

			<div className={style.socials}>
				<a href='https://instagram.com/' rel='noreferrer'>
					<AiOutlineInstagram />
				</a>

				<a href='https://facebook.com/' rel='noreferrer'>
					<AiOutlineFacebook />
				</a>

				<a href='https://youtube.com/' rel='noreferrer'>
					<AiOutlineYoutube />
				</a>
			</div>
		</section>
	);
};

export default Footer;
