import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom"
import {useMutation, useApolloClient, useQuery} from "@apollo/client";
import {CURRENT_USER, GET_POST} from "../../../features/graphql/GQL/queries";
import {UPDATE_POST} from "../../../features/graphql/GQL/mutations";
// @ts-ignore
import alertify from "alertifyjs";

const EditPost = () => {
    const client = useApolloClient();
    const navigate = useNavigate();
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const {data, loading, error} = useQuery(GET_POST, {variables: {postId: id}});
    const [edit] = useMutation(UPDATE_POST, {
        onError(err) {
            switch (err.message) {
                case "Validation error":
                    alertify.error("Title and description must be unique");
                    break;
                default:
                    alertify.error("Something went wrong");
                    console.log(err);
                    break;
            }
        },
        onCompleted: () => {
            alertify.success("Post successfully edited");
            navigate('/explore');
        },
    });

    useEffect(() => {
        let currentUser = client.readQuery({
            query: CURRENT_USER,
            variables: {}
        });
        if (!currentUser?.currentUser.posts.find((post: { id: string | undefined; }) => post.id === id)) return navigate('/explore');
    }, []);

    useEffect(() => {
        if(error){
            alertify.error("Something went wrong")
            console.log(error)
        }
    }, [error]);

    useEffect(() => {
        if(data){
            setTitle(data.post.title);
            setDescription(data.post.description);
        }
    }, [data]);


    if(loading) return <p>Loading...</p>;

    return (
        <div className="login">
            <form onSubmit={e => {
                e.preventDefault();
                edit({variables: {data: {title, description}, updatePostId: id}});
            }}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                </label>

                <label>
                    Description:
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                </label>

                <button type="submit" className="loginBtn">Edit</button>
            </form>
        </div>
    )
}

export default EditPost;