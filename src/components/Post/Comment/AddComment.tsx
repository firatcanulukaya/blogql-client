import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom"
import {useMutation, useApolloClient, useQuery} from "@apollo/client";
import {CREATE_COMMENT} from "../../../features/graphql/GQL/mutations";
import {GET_POST} from "../../../features/graphql/GQL/queries";
// @ts-ignore
import alertify from "alertifyjs";

const AddComment = () => {
    const client = useApolloClient();
    const navigate = useNavigate();
    const {id} = useParams();
    const [comment, setComment] = useState("");

    const {data, loading, error} = useQuery(GET_POST, {variables: {postId: id}});

    const [addComment] = useMutation(CREATE_COMMENT, {
        onError(err) {
            switch (err.message) {
                default:
                    alertify.error("Something went wrong");
                    console.log(err);
                    break;
            }
        },
        onCompleted: () => {
            alertify.success("Comment successfully added");
            navigate('/explore');
        },

        refetchQueries: [{query: GET_POST, variables: {postId: id}}]
    });

    useEffect(() => {
        if (error) {
            alertify.error("Something went wrong");
            navigate('/explore');
            console.log(error)
        }
    }, [error]);

    if (loading) return <p>Loading...</p>;
    return (
        <div className="login">
            <form onSubmit={e => {
                e.preventDefault();
                addComment({variables: {text: comment, postId: id}});
            }}>
                <label>
                    Comment:
                    <input type="text" onChange={e => setComment(e.target.value)}/>
                </label>

                <button type="submit" className="loginBtn">Add Comment</button>
            </form>
        </div>
    )
}

export default AddComment;