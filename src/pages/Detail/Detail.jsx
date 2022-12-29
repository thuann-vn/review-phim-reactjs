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
import { getFilmDetail, getFilmDetailBySLug } from "../../api/fimApi";
import RowPlaylist from "../../components/RowPlaylist/RowPlaylist";

const Detail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState({})
    const [url, setUrl] = useState(null)
    const [epsIndex, setEpsIndex] = useState(0)
    const navigation = useNavigate()
    useEffect(() => {
        _loadData()
    }, [id])
    
    const _loadData = async () => {
        const result = await getFilmDetailBySLug(id)
        const data = result.data.data
        setDetail(data)
        if (data.episodes && data.episodes.length) {
          setUrl(data.episodes[0].link)
        }
    }

    const nextMovie = () => {
      if(detail.episodes && epsIndex < detail.episodes.length){
        setEpsIndex(epsIndex + 1)
        setUrl(detail.episodes[epsIndex + 1].link)
      }else{
        navigation('/movie/' + detail.relatedFilms[0].slug)
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
                      nextMovie()
                    }}
                    onEnded={()=>{
                      nextMovie()
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
                    <h2 className="movie-alt-name">{detail.english_name}</h2>
                    <p className="movie-genres">{detail.year}{' '}
                        {detail.genres
                        ? ' | ' + detail.genres.map(item => item.name).join(' • ')
                        : ''}</p>
                    <div className="description" dangerouslySetInnerHTML={{ __html:detail.description }} />

                    <div className="eps-list">
                    <h3>Danh sách các tập</h3>
                    {detail.episodes &&
                      detail.episodes.map((episode, index) => {
                        return (
                          <a
                            className={`epsButton ${episode.link == url ? 'active' : ''}`}
                            onClick={() => {
                              setUrl(episode.link)
                              setEpsIndex(index)
                            }}
                            key={episode.link}
                            disabled={episode.link == url}>
                            {episode.link == url ? (
                              <img
                                className="epsPlayIconActive"
                                src={'/playing.gif'}
                                resizeMode="contain"
                                key={'playing'}
                                alt="{episode.name}"
                              />
                            ) : (
                              <img
                                className="epsPlayIcon"
                                src={'/play.png'}
                                resizeMode="contain"
                                key={'play'}
                                alt="{episode.name}"
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
                    <h1 className="next-movies">Tiếp theo</h1>
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
