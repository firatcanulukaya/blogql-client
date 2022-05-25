import {useNavigate, Link} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {CURRENT_USER} from "../apollo/getGQL";

const UserCard = () => {

    const navigate = useNavigate();
    const {data: userData, error: userError, loading: userLoading} = useQuery(CURRENT_USER);

    if (userLoading) return <p>Loading...</p>;
    if (userError) return navigate('/');

    return (
        <div className="user">
            <h1>Welcome {userData?.currentUser?.username}</h1>
            <p>ID: {userData?.currentUser?.id}</p>
            <button className="logoutBtn" onClick={() => {
                localStorage.removeItem("token");
                navigate('/')
            }}>Logout
            </button>
            <Link className="btn" to="/explore">Explore</Link>
            <Link className="btn" to="/create">Create</Link>
        </div>
    )
}

export default UserCard;