import "./banner.scss";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { staggerOne, bannerFadeInLoadSectionVariants, bannerFadeInVariants, bannerFadeInUpVariants } from "../../motionUtils";
import { BASE_IMG_URL } from "../../requests";
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { randomize, truncate } from "../../utils";
import { Link } from "react-router-dom";
import SkeletonBanner from "../SkeletonBanner/SkeletonBanner";
import { useDispatch, useSelector } from "react-redux";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { selectTrendingMovies, selectNetflixMovies } from "../../redux/movies/movies.selectors";
import { selectNetflixSeries } from "../../redux/series/series.selectors";
import { getFilmDetail, getFilms } from "../../api/fimApi";

const Banner = ({ type }) => {
	const [genres, setGenres] = useState([])
	const [loading, setLoading] = useState(true)
	const [homeFilms, setHomeFilms] = useState([])
	const [description, setDescription] = useState('')
	const dispatch = useDispatch();
	
	useEffect(() => {
		loadHomeFilms()
	  }, [])

	  
	const loadHomeFilms = async () => {
		const result = await getFilms({ featured: true, withGenres: true })
		setHomeFilms(result.data.data)
		await loadDescription(result.data.data[0])
		setLoading(false)
	}

	const loadDescription = async (movie) => {
		const result = await getFilmDetail(movie.id);
		setDescription(result.data.data.description)
	}

	return (
		<>
			<motion.section
				variants={bannerFadeInLoadSectionVariants}
				initial='initial'
				animate='animate'
				exit='exit'
				className="Banner__loadsection"
			>
				{loading && <SkeletonBanner />}
			</motion.section>

			{!loading && (
				<motion.header
					variants={bannerFadeInVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					className="Banner"
					style={{backgroundImage: `url(${BASE_IMG_URL}/${homeFilms[0]?.image})`}}
				>
					<motion.div
						className="Banner__content"
						variants={staggerOne}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<motion.h1 variants={bannerFadeInUpVariants} className="Banner__content--title">{homeFilms[0].name}</motion.h1>
						<motion.div variants={bannerFadeInUpVariants} className="Banner__buttons">
							<Link
								className="Banner__button"
								onClick={()=> {}}
								to={"/movie/" + homeFilms[0].slug}
							>
								<FaPlay />
								<span>Xem ngay</span>
							</Link>
						</motion.div>
						
						
						<motion.p variants={bannerFadeInUpVariants} className="Banner__content--description">
							<span dangerouslySetInnerHTML={{ __html: description.substring(0, 250) }} />...
						</motion.p>
					</motion.div>
					<div className="Banner__panel" />
					<div className="Banner__bottom-shadow" />
				</motion.header>
			)}
		</>
	)
}

export default React.memo(Banner);