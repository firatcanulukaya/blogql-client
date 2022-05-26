import {gql} from "@apollo/client";

//POST
export const GET_POSTS = gql`
    query Posts {
        posts {
            id
            title
            description
            createdBy {
                id
                username
            }
            comments {
                id
                text
                createdBy {
                    username
                    id
                }
            }
        }
    }
`;

export const GET_POST = gql`
    query Post($postId: ID!) {
        post(id: $postId) {
            id
            title
            description
            createdBy {
                id
                username
            }
            comments {
                text
                id
                createdBy {
                    username
                    id
                }
            }
        }
    }
`;

//USER
export const CURRENT_USER = gql`
    query CurrentUser {
        currentUser {
            username
            id
            posts {
                title
                id
            }
        }
    }
`;


