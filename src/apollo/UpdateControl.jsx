import {useSubscription} from "@apollo/client";
import {POST_SUB} from "./getGQL";
import {useEffect} from "react";


const UpdateControl = () => {
    const {data} = useSubscription(POST_SUB);

    useEffect(() => {
        console.log(data);
    }, [data]);

}

export default UpdateControl;