import "./style.css";
import Blogs from "./Blogs";
import UpdateControl from "./apollo/UpdateControl";

const App = () => {
    return (
        <>
            <Blogs>
                <UpdateControl />
            </Blogs>
        </>
    );
}

export default App;
