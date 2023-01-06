import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Navigate, useLocation, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar"
import Homepage from "./pages/Homepage/Homepage"
import Movies from "./pages/Movies/Movies"
import TVSeries from './pages/TVSeries/TVSeries';
import Popular from "./pages/Popular/Popular";
import MyList from './pages/MyList/MyList';
import Auth from "./pages/Auth/Auth";
import Search from "./pages/Search/Search";
import Category from "./pages/Category/Category";
import DetailModal from "./components/DetailModal/DetailModal";
import SplashAnimation from "./components/SplashAnimation/SplashAnimation";
import PlayAnimation from "./components/PlayAnimation/PlayAnimation";
import { selectSearchResults } from "./redux/search/search.selectors";
import Detail from "./pages/Detail/Detail";
import ReactGA from 'react-ga';
const TRACKING_ID = "UA-251747573-2"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const App = () => {
    const currentUser  = {}
    const searchResults = useSelector(selectSearchResults);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
    }, [dispatch])

    return (
        <div className="App">
           <>
                <Navbar />
                <DetailModal />
            </>
            <AnimatePresence exitBeforeEnter>
                <Routes  location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={<Homepage/>}
                    />
                    <Route
                        path="/movie/:id"
                        element={<Detail/>}
                    />
                    <Route
                        path="/tim-kiem"
                        element={<Search results={searchResults}/>}
                    />
                    <Route
                        exact
                        path="/"
                        element={<Homepage/>}
                    />
                    <Route
                        exact
                        path="/phim/:categoryName"
                        element={<Movies/>}
                    />
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App;
