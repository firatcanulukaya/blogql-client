import "./style.css";
import "alertifyjs/build/css/alertify.min.css";
import {Routes, Route} from "react-router-dom";
import Posts from "./components/Post/Posts";
import UpdateControl from "./apollo/UpdateControl";
import Login from "./components/Login";
import Create from "./components/Post/Create";
import EditPost from "./components/Post/Edit";
import alertify from "alertifyjs";

const App = () => {
    alertify.set('notifier', 'position', 'bottom-center');
    return (
        <>
            <UpdateControl/>

            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/explore" element={<Posts/>}/>
                <Route path="/create" element={<Create/>}/>
                <Route path="/edit/:id" element={<EditPost/>}/>
            </Routes>

        </>
    );
}

export default App;
