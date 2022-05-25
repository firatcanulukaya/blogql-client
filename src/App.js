import "./style.css";
import {Routes, Route} from "react-router-dom";
import Blogs from "./components/Blogs";
import UpdateControl from "./apollo/UpdateControl";
import Login from "./components/Login";

const App = () => {
    return (
        <>
            <UpdateControl/>

            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/explore" element={<Blogs/>}/>
            </Routes>

        </>
    );
}

export default App;
