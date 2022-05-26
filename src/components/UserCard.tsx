import {useNavigate, Link} from "react-router-dom";
import {useQuery, useApolloClient} from "@apollo/client";
import {CURRENT_USER} from "../features/graphql/GQL/queries";

const UserCard = () => {
    const client = useApolloClient();
    const navigate = useNavigate();
    //TODO data için interface yaz
    const {data: userData, loading: userLoading}: {data: any, loading: boolean} = useQuery(CURRENT_USER);
    const token: string | null = localStorage.getItem("token")

    if (userLoading) { // @ts-ignore
        return <p>Loading...</p>;
    }
    if (!token) return navigate('/');

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