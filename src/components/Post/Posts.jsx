import PostItem from "./PostItem";
import UserCard from "../UserCard";

const Posts = () => {
    return (
        <div style={{display: "flex", gap: "2rem", flexDirection: "column", padding: "20px"}}>
            <UserCard/>
            <PostItem/>
        </div>
    )
}

export default Posts;