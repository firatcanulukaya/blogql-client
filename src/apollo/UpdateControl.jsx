import { useSubscription, useApolloClient } from "@apollo/client";
import { POST_SUB, GET_POSTS } from "./getGQL";
import { useEffect } from "react";

const UpdateControl = () => {
    const client = useApolloClient();
    const { data } = useSubscription(POST_SUB);

    useEffect(() => {
        if (data === undefined) return; /**
        sub'dan veri gelmemişse başta undefined olarak çalışıyor
        eğer undefined olarak cache'e yazılmaya çalışılırsa 
        uygulama çöküyor ondan kontrol eklendi
        */

        // cache'den postları okuyoruz ki üstüne ekleme yapıp cache'e yazabilelim
        const { posts } = client.readQuery({
            query: GET_POSTS,
        });
        
        // cache'den gelen postların sonuna yeni post ekliyoruz
        client.writeQuery({
            query: GET_POSTS,
            data: {
                /* öncelikle cache'den gelen postları alıyoruz
                   sonra yeni postu ekliyoruz*/
                posts: [...posts, data.postCreation],
            }
        });

        /* 
        Buradaki iki dependecy'i yazmamızın sebebi
        data - subscription'dan gelen verinin kontrolü
        client - apollo client'ın kontrolü (değişirse veya bağlantı 
                                            durumunda değişiklik 
                                            olursa bu da güncellensin)

        */
    }, [data, client]);
}

export default UpdateControl;