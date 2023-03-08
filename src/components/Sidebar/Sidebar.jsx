import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import style from '../../styles/Sidebar.module.css';

const Sidebar = () => {
	const { list } = useSelector(state => state.categories);
	const filteredList = list.filter((_, i) => i < 8);

	return (
		<section className={style.sidebar}>
			<div className={style.title}>CATEGORIES</div>
			<nav>
				<ul className={style.menu}>
					{filteredList.map(({ id, name }) => {
						return (
							<li key={id}>
								<NavLink
									className={({ isActive }) =>
										`${style.link} ${isActive ? style.active : ''}`
									}
									to={`/categories/${id}`}
								>
									{name}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</nav>

			<div className={style.footer}>
				<a href='/help' target='_blank' className={style.link}>
					Help
				</a>
				<a
					href='/terms'
					style={{ textDecoration: 'underline' }}
					target='_blank'
					className={style.link}
				>
					Terms & Conditions
				</a>
			</div>
		</section>
	);
};

export default Sidebar;
