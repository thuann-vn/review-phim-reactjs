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
                    {/* <Route
                        path="/splash"
                        element={<SplashAnimation/>}
                    /> */}
                    {/* <Route
                        path="/play"
                        element={<PlayAnimation/>}
                    /> */}
                    <Route
                        path="/search"
                        element={<Search results={searchResults}/>}
                    />
                    <Route
                        exact
                        path="/browse"
                        element={<Homepage/>}
                    />
                    <Route
                        exact
                        path="/browse/:categoryName"
                        element={<Category/>}
                    />
                    <Route
                        exact
                        path="/tvseries"
                        element={<TVSeries/>}
                    />
                    <Route
                        exact
                        path="/tvseries/:categoryName"
                        element={<Category/>}
                    />
                    <Route
                        exact
                        path="/movies"
                        element={<Movies/>}
                    />
                    <Route
                        exact
                        path="/movies/:categoryName"
                       element={<Category/>}
                    />
                    <Route
                        exact
                        path="/popular"
                        element={<Popular/>}
                    />
                    <Route
                        exact
                        path="/popular/:categoryName"
                        element={<Category/>}
                    />
                    <Route
                        exact
                        path="/mylist"
                        element={<MyList/>}
                    />
                    <Route
                        exact
                        path="/login"
                        element={<Auth/>}
                    />
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App;
