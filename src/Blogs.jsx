import {useNavigate} from "react-router-dom"
import {useQuery} from "@apollo/client";
import {GET_POSTS, CURRENT_USER} from "./apollo/getGQL";

const Blogs = () => {
    const navigate = useNavigate();
    const {loading, error, data} = useQuery(GET_POSTS);
    const {data: userData, error: userError, loading: userLoading} = useQuery(CURRENT_USER);

    if (loading && userLoading) return <p>Loading...</p>;
    if (userError) return navigate('/');
    if (error) return <p>Error :(</p>;


    console.log(userData?.currentUser);

    return (
        <div style={{display: "flex", gap: "2rem", flexDirection: "column", padding: "20px"}}>
            {
                data?.posts?.map(post => (
                    <div key={post.id} className="card">
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Blogs;