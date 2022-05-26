import {Link} from "react-router-dom";
import {useQuery, useApolloClient, useMutation} from "@apollo/client";
import {CURRENT_USER, GET_POSTS, DELETE_POST} from "../../apollo/getGQL";
import alertify from "alertifyjs";
import Comments from "./Comment/Comments";

const PostItem = () => {
    const client = useApolloClient();
    const {loading, error, data} = useQuery(GET_POSTS);
    const [deletePost] = useMutation(DELETE_POST, {
        onCompleted: () => {
            alertify.success("Post successfully deleted");
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let {currentUser} = client.readQuery({query: CURRENT_USER});
    return (
        <>
            {
                data?.posts?.map(post => (
                    <div key={post.id} className="card">
                        <h1 className="postTitle">{post.title}</h1>
                        <p className="postDesc">{post.description}</p>

                        <Comments post={post} user={currentUser} posts={data}/>

                        <div className="buttons">
                            {currentUser.id === post.createdBy.id ? <button className="btn danger"
                                                                            onClick={() => {
                                                                                deletePost({
                                                                                    variables: {
                                                                                        deletePostId: post.id
                                                                                    }
                                                                                });
                                                                                alertify.success("Deleting post...");
                                                                            }}>Delete</button> : ''}

                            {currentUser.id === post.createdBy.id ?
                                <Link to={`/edit/${post.id}`} className="btn">Edit</Link> : ''}
                        </div>

                        <div className="author"><p>author: @{post.createdBy.username}</p></div>

                    </div>
                ))
            }
        </>
    )
}

export default PostItem;