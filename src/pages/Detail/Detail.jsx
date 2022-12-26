import "./detail.scss"
import Banner from "../../components/Banner/Banner"
import Row from "../../components/Row/Row"
import Credits from "../../components/Credits/Credits";
import { useRetrieveData } from "../../hooks/useRetrieveData";
import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../motionUtils";
import {ReactNetflixPlayer} from "react-netflix-player"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilmDetail } from "../../api/fimApi";
import RowPlaylist from "../../components/RowPlaylist/RowPlaylist";

const Detail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState({})
    const [url, setUrl] = useState(null)
    const navigation = useNavigate()
    useEffect(() => {
        _loadData()
    }, [id])
    
    const _loadData = async () => {
        const result = await getFilmDetail(id)
        const data = result.data.data
        setDetail(data)
        if (data.episodes && data.episodes.length) {
          setUrl(data.episodes[0].link)
        }
    }

    return (
        <motion.div
            className="Detail"
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
			<div className="player">
                <ReactNetflixPlayer 
                    src={url}
                    onNextClick={() => {
                        navigation('/movie/' + detail.relatedFilms[0].id)
                    }}
                    onEnded={()=>{
                        navigation('/movie/' + detail.relatedFilms[0].id)
                    }}
                    autoPlay={true} 
                    primaryColor="red" 
                    playerLanguage="en"
                    title={detail.name}
                    subTitle={detail.english_name}
                    key={url}
                />
            </div>
            <div className="movie-detail">
                <div className="movie-detail-left">
                    <h1>{detail.name}</h1>
                    <h2>{detail.english_name}</h2>
                    <p className="movie-genres">{detail.year}{' '}
                        {detail.genres
                        ? ' | ' + detail.genres.map(item => item.name).join(' • ')
                        : ''}</p>
                    <div className="description" dangerouslySetInnerHTML={{ __html:detail.description }} />

                    <div className="eps-list">
                    <h3>Danh sách các tập</h3>
                    {detail.episodes &&
                      detail.episodes.map(episode => {
                        return (
                          <a
                            className={`epsButton ${episode.link == url ? 'active' : ''}`}
                            onClick={() => setUrl(episode.link)}
                            key={episode.link}
                            disabled={episode.link == url}>
                            {episode.link == url ? (
                              <img
                                className="epsPlayIconActive"
                                src={'/playing.gif'}
                                resizeMode="contain"
                                key={'playing'}
                              />
                            ) : (
                              <img
                                className="epsPlayIcon"
                                src={'/play.png'}
                                resizeMode="contain"
                                key={'play'}
                              />
                            )}

                            <span
                            className={`epsLabel ${episode.link == url
                                  ? 'epsLabelActive'
                                  : null}`}>
                              {episode.name}
                            </span>
                          </a>
                        )
                      })}
                    </div>
                </div>
                <div className="movie-detail-right">
                    <h1>Tiếp theo</h1>
                    {
                        (detail.relatedFilms || []).map(item => {
                            return <RowPlaylist
                                item={item}
                                key={item.id}
                            />
                        })
                    }
                </div>
            </div>
        </motion.div>
    )
}

export default Detail
