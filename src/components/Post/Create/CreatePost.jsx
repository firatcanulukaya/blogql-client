import {useState} from "react";
import {useNavigate} from "react-router-dom"
import {useMutation} from "@apollo/client";
import {CREATE_POST, CURRENT_USER} from "../../../apollo/getGQL";
import alertify from "alertifyjs";

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [post, {data, loading}] = useMutation(CREATE_POST, {
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
        refetchQueries: [
            CURRENT_USER
        ],
    });

    if (loading) return 'Posting...';

    if (data) {
        return navigate('/explore');
    }

    return (
        <div className="login">
            <form onSubmit={e => {
                e.preventDefault();
                post({variables: {title, description}});
            }}>
                <label>
                    Title:
                    <input type="text" onChange={e => setTitle(e.target.value)}/>
                </label>

                <label>
                    Description:
                    <input type="text" onChange={e => setDescription(e.target.value)}/>
                </label>

                <button type="submit" className="loginBtn">Post</button>
            </form>
        </div>
    )
}

export default CreatePost;