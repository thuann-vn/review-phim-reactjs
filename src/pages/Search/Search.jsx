import "./search.scss"
import Poster from "../../components/Poster/Poster";
import { motion } from "framer-motion";
import { staggerHalf } from "../../motionUtils";
import { useSelector } from "react-redux";
import { selectSearchInputValue } from "../../redux/search/search.selectors";
import { getFilms } from "../../api/fimApi";
import RowPoster from "../../components/RowPoster/RowPoster";
import Pagination from "../../components/Pagination/Pagination";
import React, { useState } from "react";
const PAGE_SIZE = 20

const Search = searchResults => {
	const { results } = searchResults;
	const selectInputValue = useSelector(selectSearchInputValue);
    const [firstLoad, setFirstLoad] = React.useState(true)
    const [page, setPage] = React.useState(1)
    const [allLoaded, setAllLoaded] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [movies, setMovies] = React.useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);

    React.useEffect(() => {
        _loadMovies(true)
    }, [selectInputValue])

    const _loadMovies = async (refresh = false, page = 1) => {
        if ((!firstLoad && loading) || (!refresh && allLoaded)) {
            return
        }
        var params = {
			q: selectInputValue
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
		<div className="Search">
			{results && results.length > 0 && (
				<h2 className="Search__title">Kết quả tìm kiếm: {selectInputValue}</h2>
			)}
			<motion.div
				className="Search__wrp"
				variants={staggerHalf}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				{movies && movies.length > 0
					? (
						<>
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
						</>
					)
					: (
						<h2 className="Search__title">
							Oops, không có kết quả nào, vui lòng thử từ khóa khác!
						</h2>
					)
				}
			</motion.div>
		</div>
	);
}

export default Search
