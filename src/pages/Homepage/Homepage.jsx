import "./homepage.scss"
import Banner from "../../components/Banner/Banner"
import Row from "../../components/Row/Row"
import Credits from "../../components/Credits/Credits";
import { useRetrieveData } from "../../hooks/useRetrieveData";
import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../motionUtils";
import React, { useEffect, useState } from "react";
import api from "../../api/fimApi";

const Homepage = () => {
    const rows = useRetrieveData('movies');
    const [genres, setGenres] = useState([])
    const [homeFilms, setHomeFilms] = useState([])
  
    useEffect(() => {
      loadGenres()
      loadHomeFilms()
    }, [])
  
    const loadGenres = async () => {
      const result = await api.getGenres()
      console.log(result)
      setGenres(result.data)
    }
    const loadHomeFilms = async () => {
      const result = await api.getFilms({ featured: true, withGenres: true })
      setHomeFilms(result.data)
    }
  
    return (
        <motion.div
            className="Homepage"
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <Banner />
            {genres && genres.filter(item => item.featured).map(props => (
                <Row key={props.id} {...props} />
            ))}
            <Credits />
        </motion.div>
    )
}

export default Homepage
