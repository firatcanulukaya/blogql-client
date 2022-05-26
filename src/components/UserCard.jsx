import {useNavigate, Link} from "react-router-dom";
import {useQuery, useApolloClient} from "@apollo/client";
import {CURRENT_USER} from "../graphql/GQL/queries";

const UserCard = () => {
    const client = useApolloClient();
    const navigate = useNavigate();
    const {data: userData, loading: userLoading} = useQuery(CURRENT_USER);

    if (userLoading) return <p>Loading...</p>;
    if (!localStorage.getItem("token")) return navigate('/');

    return (
        <div className="user">
            <h1>Welcome {userData?.currentUser?.username}</h1>
            <p>ID: {userData?.currentUser?.id}</p>

            <div className="buttons">
                <button className="logoutBtn" onClick={() => {
                    localStorage.removeItem("token");
                    client.resetStore().then(r => navigate('/'));
                }}>Logout
                </button>
                <Link className="btn" to="/explore">Explore</Link>
                <Link className="btn" to="/create">Create</Link>
            </div>

        </div>
    )
}

export default UserCard;