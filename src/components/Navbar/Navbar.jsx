import "./navbar.scss";
import { useState, useRef } from "react";
import useViewport from "../../hooks/useViewport";
import useScroll from "../../hooks/useScroll";
import useOutsideClick from "../../hooks/useOutsideClick";
import { motion } from "framer-motion";
import { navbarFadeInVariants } from "../../motionUtils";
import { LOGO_URL, MOBILE_LOGO_URL, PROFILE_PIC_URL } from "../../requests";
import { FaCaretDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
	const { width } = useViewport();
	const isScrolled = useScroll(70);
	const [genresNav, setGenresNav] = useState(false);
	const [profileNav, setProfileNav] = useState(false);
	const genresNavRef = useRef();
	const profileNavRef = useRef();
	const currentUser = {};
	const dispatch = useDispatch();

	useOutsideClick(genresNavRef, () => {
		if (genresNav) setGenresNav(false);
	});
	useOutsideClick(profileNavRef, () => {
		if (profileNav) setProfileNav(false);
	});

	return (
		<>
			<motion.nav
				className={`Navbar ${isScrolled && "Navbar__fixed"}`}
				variants={navbarFadeInVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				<Link to="/">
					<img className="Navbar__logo" src='/icon.png' alt="" />
				</Link>
				{width >= 1024 ? (
					<ul className="Navbar__primarynav Navbar__navlinks">
						<li className="Navbar__navlinks--link">
							<NavLink to="/" activeClassName="activeNavLink">
								Trang chủ
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/phim/phim-bộ" activeClassName="activeNavLink">
								Phim bộ
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/phim/phim-lẻ" activeClassName="activeNavLink">
								Phim lẻ
							</NavLink>
						</li>
					</ul>
				) : (
					<div
						className={`Navbar__primarynav Navbar__navlinks ${isScrolled && "Navbar__primarynav--scrolled"}`}
						onClick={() => setGenresNav(!genresNav)}
					>
						<span className="Navbar__navlinks--link">Menu</span>
						<FaCaretDown className="Navbar__primarynav--toggler Navbar__primarynav--caret" />
						<div
							className={`Navbar__primarynav--content ${genresNav ? "active" : ""}`}
						>
							{genresNav && (
								<ul
									className="Navbar__primarynav--content-wrp"
									ref={genresNavRef}
								>
									<li className="Navbar__navlinks--link">
										<NavLink to="/" activeClassName="activeNavLink">
										Trang chủ
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/phim/phim-bộ" activeClassName="activeNavLink">
										Phim bộ
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/phim/phim-lẻ" activeClassName="activeNavLink">
										Phim lẻ
										</NavLink>
									</li>
								</ul>
							)}
						</div>
					</div>
				)}
				<div className="Navbar__secondarynav">
					<div className="Navbar__navitem">
						<Searchbar />
					</div>
					{/* <div className="Navbar__navitem">
						<div
							className={`Navbar__navprofile ${profileNav && "active"}`}
							onClick={() => setProfileNav(!profileNav)}
						>
							<img
								className="Navbar__navprofile--avatar Navbar__navprofile--toggler"
								src={currentUser && currentUser.photoURL ? currentUser.photoURL : PROFILE_PIC_URL}
								alt="Profile Picture"
							/>
							<FaCaretDown className="Navbar__navprofile--toggler Navbar__navprofile--caret" />
							<div className={`Navbar__navprofile--content ${profileNav ? "active" : ""}`}>
								{profileNav && (
									<ul
										className="Navbar__navprofile--content-wrp"
										ref={profileNavRef}
									>
										{currentUser && (
											<li
												className="Navbar__navlinks--link"
												onClick={() => dispatch()}
											>
												Sign Out
											</li>
										)}
									</ul>
								)}
							</div>
						</div>
					</div> */}
				</div>
			</motion.nav>
		</>
	);
};

export default Navbar;
