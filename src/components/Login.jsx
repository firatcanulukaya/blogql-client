import {useState} from "react";
import {useNavigate} from "react-router-dom"
import {useMutation} from "@apollo/client";
import {LOGIN} from "../apollo/getGQL";
import alertify from "alertifyjs";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, {data, loading, error}] = useMutation(LOGIN, {
        onError(err) {
            switch (err.message) {
                case "Invalid credentials":
                    alertify.error("Username or password is incorrect");
                    break;
                default:
                    alertify.error("Something went wrong");
                    break;
            }
        }
    });

    if (loading) return 'Logging in...';

    if (data) {
        localStorage.setItem('token', data.login.token);
        alertify.success("Logged in.");
        return navigate('/explore');
    }

    return (
        <div className="login">
            <form onSubmit={e => {
                e.preventDefault();
                login({variables: {username, password}});
            }}>
                <label>
                    Username:
                    <input type="text" onChange={e => setUsername(e.target.value)}/>
                </label>

                <label>
                    Password:
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>

                <button type="submit" className="loginBtn">Login</button>
            </form>
        </div>
    )
}

export default Login;