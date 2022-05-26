import "./style.css";
import "alertifyjs/build/css/alertify.min.css";
import {Routes, Route, useNavigate} from "react-router-dom";
import Posts from "./components/Post/Posts";
import UpdateControl from "./graphql/UpdateControl";
import Login from "./components/Login";
import Create from "./components/Post/Create";
import EditPost from "./components/Post/Edit";
import AddComment from "./components/Post/Comment/AddComment";
import alertify from "alertifyjs";
import {useEffect} from "react";

const App = () => {
    const navigate = useNavigate();
    alertify.set('notifier', 'position', 'bottom-center');

    useEffect(() => {
        if(localStorage.getItem('token')) {
           navigate("/explore")
        }
    }, [])

    return (
        <>
            <UpdateControl/>

            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/explore" element={<Posts/>}/>
                <Route path="/create" element={<Create/>}/>
                <Route path="/edit/:id" element={<EditPost/>}/>
                <Route path="/comment/:id" element={<AddComment/>}/>
            </Routes>

        </>
    );
}

export default App;
