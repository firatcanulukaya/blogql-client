import {useEffect} from "react";
import {useSubscription, useApolloClient} from "@apollo/client";
import {POST_SUB, POST_UPDATE_SUB, POST_DELETE_SUB} from "./GQL/subscriptions";
import {GET_POSTS} from "./GQL/queries";

const UpdateControl = () => {
    const client = useApolloClient();
    const {data: PostSub} = useSubscription(POST_SUB);
    const {data: PostUpdateSub} = useSubscription(POST_UPDATE_SUB);
    const {data: PostDeleteSub} = useSubscription(POST_DELETE_SUB);

    useEffect(() => {
        if (PostSub === undefined) return; /**
         sub'dan veri gelmemişse başta undefined olarak çalışıyor
         eğer undefined olarak cache'e yazılmaya çalışılırsa
         uygulama çöküyor ondan kontrol eklendi
         */

        try {
            console.log("create")
            /**
             * işlemleri try bloğunun içine yazmamızın sebebi eğer
             * önceden cache'de postlarla ilgili veri yoksa tüm ilerleme uçmasın diye
             * - catch bloğunu inceleyin
             *  */


                // cache'den postları okuyoruz ki üstüne ekleme yapıp cache'e yazabilelim
            const {posts} = client.readQuery({
                    query: GET_POSTS,
                });

            // cache'den gelen postların sonuna yeni post ekliyoruz
            client.writeQuery({
                query: GET_POSTS,
                data: {
                    /* öncelikle cache'den gelen postları alıyoruz
                       sonra yeni postu ekliyoruz*/
                    posts: [...posts, PostSub.postCreation],
                }
            });
        } catch (error) {
            /**
             * eğer cachede veri bulunmamışsa ve hata verilmişse buraya geliniyor
             * ve direkt cache'e post verisi ekleniyor bu sayede sorunlar çözülmüş oluyor
             *  */

            client.writeQuery({
                query: GET_POSTS,
                data: {
                    posts: [PostSub.postCreation],
                }
            });
        }


        /* 
        Buradaki iki dependecy'i yazmamızın sebebi
        PostSub - subscription'dan gelen verinin kontrolü
        client - graphql client'ın kontrolü (değişirse veya bağlantı
                                            durumunda değişiklik 
                                            olursa bu da güncellensin)

        */
    }, [PostSub, client]);

    useEffect(() => {
        if (PostUpdateSub === undefined) return;
        try {
            console.log("update");
            const {posts} = client.readQuery({query: GET_POSTS,});

            client.writeQuery({
                query: GET_POSTS,
                data: {
                    posts: [...posts],
                }
            });

        } catch (error) {

            client.writeQuery({
                query: GET_POSTS,
                data: {
                    posts: [PostUpdateSub.postUpdate],
                }
            });
        }

    }, [PostUpdateSub, client]);

    useEffect(() => {
        if (PostDeleteSub === undefined) return;
        try {
            console.log("delete");
            const {posts} = client.readQuery({query: GET_POSTS});
            let deletedPost = posts.filter((post: { id: string; }) => post.id !== PostDeleteSub.postDeletion.id);

            client.writeQuery({
                query: GET_POSTS,
                data: {
                    posts: deletedPost,
                }
            });

        } catch (error) {
            console.log("hata")
        }
    }, [PostDeleteSub, client]);

}
export default UpdateControl;