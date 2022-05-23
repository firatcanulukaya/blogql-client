import {useQuery} from "@apollo/client";
import {GET_POSTS} from "./apollo/getGQL";

const Blogs = (props) => {
    const {loading, error, data} = useQuery(GET_POSTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div style={{display: "flex", gap: "2rem", flexDirection: "column", padding: "20px"}}>
            {
                data.posts.map(post => (
                    <div key={post.id} className="card">
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                    </div>
                ))
            }
            {props.children /*
                Burada props.children ile gelen sub kontrolcüsünü ekliyoruz.
                Bu kontrolcüyü tanımlayarak, sunucudan gelen bilgilerin
                cache'e yazılmasını sağlıyoruz.
                # Mantıksal işlemler için lütfen UpdateControl.jsx dosyasına git
            */}
        </div>
    )
}

export default Blogs;