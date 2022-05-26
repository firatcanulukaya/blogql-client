import PostItem from "./PostItem";
import UserCard from "../UserCard";

const Posts = () => {
    return (
        <div style={{display: "flex", gap: "2rem", flexDirection: "row", padding: "20px", flexWrap: "wrap"}}>
            {/*@ts-ignore*/}
            <UserCard/>
            <PostItem/>
        </div>
    )
}

export default Posts;