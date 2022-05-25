import {useNavigate} from "react-router-dom"
import {useQuery} from "@apollo/client";
import {GET_POSTS, CURRENT_USER} from "../../apollo/getGQL";
import PostItem from "./PostItem";

const Blogs = () => {
    const navigate = useNavigate();
    const {data: userData, error: userError, loading: userLoading} = useQuery(CURRENT_USER);

    if (userLoading) return <p>Loading...</p>;
    if (userError) return navigate('/');

    return (
        <div style={{display: "flex", gap: "2rem", flexDirection: "column", padding: "20px"}}>

            <PostItem/>

            <div className="user">
                <h1>Welcome {userData?.currentUser?.username}</h1>
                <p>ID: {userData?.currentUser?.id}</p>
                <button className="logoutBtn" onClick={() => {
                    localStorage.removeItem("token");
                    navigate('/')
                }}>Logout
                </button>
            </div>
        </div>
    )
}

export default Blogs;