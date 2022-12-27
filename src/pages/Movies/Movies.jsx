import "./movies.scss"
import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../motionUtils";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getFilms } from "../../api/fimApi";
import RowPoster from "../../components/RowPoster/RowPoster";
import Pagination from "../../components/Pagination/Pagination";
const PAGE_SIZE = 20

const Movies = () => {
    const { categoryName } = useParams();
    const [firstLoad, setFirstLoad] = React.useState(true)
    const [page, setPage] = React.useState(1)
    const [allLoaded, setAllLoaded] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [movies, setMovies] = React.useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);

    React.useEffect(() => {
        _loadMovies(true)
    }, [])

    const _loadMovies = async (refresh = false, page = 1) => {
        if ((!firstLoad && loading) || (!refresh && allLoaded)) {
            return
        }
        var params = {}
        if (categoryName) {
            params.genre_slug = categoryName
        }
        params.offset = (page - 1) * PAGE_SIZE
        params.limit = PAGE_SIZE
        console.log(params)
        const result = await getFilms(params)
        console.log(result)
        setTotal(result.data.total)
        if (!refresh) {
            setMovies([...movies, ...result.data.data])
        } else {
            setMovies(result.data.data)
        }
        if (result.data.length < PAGE_SIZE) {
            setAllLoaded(true)
        } else {
            setAllLoaded(false)
        }
        if (firstLoad) {
            setFirstLoad(false)
        }

        if (!refresh) {
            setPage(page + 1)
        } else {
            setPage(1)
        }
        //Set loading
        setLoading(false)
    }

    return (
        <motion.div
            className="Movies"
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="movies-list">
                {
                    movies.map(item => (
                        <RowPoster item={item} key={item.id}/>
                    ))
                }
            </div>
            <Pagination pageSize={PAGE_SIZE} currentPage={currentPage} totalCount={total} siblingCount={1} onPageChange={(val) => {
                setCurrentPage(val);
                _loadMovies(true, val)
            }}/>
        </motion.div>
    )
}

export default Movies
