import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom"
import {useMutation} from "@apollo/client";
import {UPDATE_POST} from "../../../apollo/getGQL";
import alertify from "alertifyjs";

const EditPost = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
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

    return (
        <div className="login">
            <form onSubmit={e => {
                e.preventDefault();
                edit({variables: {data: {title, description}, updatePostId: id}});
            }}>
                <label>
                    Title:
                    <input type="text" onChange={e => setTitle(e.target.value)}/>
                </label>

                <label>
                    Description:
                    <input type="text" onChange={e => setDescription(e.target.value)}/>
                </label>

                <button type="submit" className="loginBtn">Edit</button>
            </form>
        </div>
    )
}

export default EditPost;