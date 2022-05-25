import {useQuery} from "@apollo/client";
import {GET_POSTS} from "../../apollo/getGQL";

const PostItem = () => {
    const {loading, error, data} = useQuery(GET_POSTS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            {
                data?.posts?.map(post => (
                    <div key={post.id} className="card">
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>
                        <button className="btn">asdasd</button>
                    </div>
                ))
            }
            </>
    )
}

export default PostItem;