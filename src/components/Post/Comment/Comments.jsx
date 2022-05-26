import {Link} from "react-router-dom";
import {DELETE_COMMENT, GET_POST} from "../../../apollo/getGQL";
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
                        <p className="commentText" key={index}>{comment.text} -
                            @{comment.createdBy.username}
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
                        </p>
                    ))

                }
                <Link to={`/comment/${post.id}`}>Add Comment</Link>
            </details>

        </>
    )
}

export default Comments;