import {useSubscription, useQuery, useApolloClient} from "@apollo/client";
import {POST_SUB, GET_POSTS} from "./getGQL";
import {useEffect} from "react";

const UpdateControl = () => {
    const client = useApolloClient();
    const {data} = useSubscription(POST_SUB);

    useEffect(() => {
        const {posts}  = client.readQuery({
            query: GET_POSTS,
        });

        client.writeQuery({
            query: GET_POSTS,
            data: {
                posts: [data.post, ...posts],
            }
        });

        console.log(posts);
    }, [data]);
}

export default UpdateControl;