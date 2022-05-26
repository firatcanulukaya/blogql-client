import {Link} from "react-router-dom";
import {DELETE_COMMENT} from "../../../graphql/GQL/mutations";
import {GET_POST} from "../../../graphql/GQL/queries";

import {useMutation} from "@apollo/client";
import alertify from "alertifyjs";

const Comments = ({post, user}) => {
    const [deleteComment] = useMutation(DELETE_COMMENT, {
        onCompleted: () => {
            alertify.success("Comment successfully deleted");
        },
        refetchQueries: [{query: GET_POST, variables: {postId: post.id}}]
    });
    return (
        <>
            <details>
                <summary className="commentSummary">Comments ▼</summary>
                {
                    post.comments.length > 0 &&
                    post.comments.map((comment, index) => (
                        <div className="commentText" key={index}>
                            <p>{comment.text} -</p>
                            <p>@{comment.createdBy.username}</p>
                            {
                                user.id === comment.createdBy.id ? <button className="btn danger" style={{
                                    fontSize: "12px",
                                    padding: "2px 5px"
                                }}
                                onClick={() => {
                                    deleteComment({
                                        variables: {
                                            deleteCommentId: comment.id
                                        }
                                    });
                                    alertify.success("Deleting comment...");
                                }
                                }>delete</button> : ''
                            }
                        </div>
                    ))
                }
                <Link to={`/comment/${post.id}`} className="addComment">Add Comment</Link>
            </details>

        </>
    )
}

export default Comments;