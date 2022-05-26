import {gql} from "@apollo/client";

export const GET_POSTS = gql`
    query Posts($first: Int, $after: Int) {
        posts(first: $first, after: $after) {
            title
            description
            id
            createdBy{
                id
            }
            comments {
                id
                text
                createdBy {
                    username
                }
            }
        }
    }
`;

export const POST_SUB = gql`
    subscription {
        postCreation {
            title
            description
            id
            createdBy{
                id
            }
            comments {
                id
                text
                createdBy {
                    username
                }
            }
        }
    }
`;

export const POST_UPDATE_SUB = gql`
    subscription {
        postUpdate {
            title
            description
            id
            createdBy{
                id
            }
            comments {
                id
                text
                createdBy {
                    username
                }
            }
        }
    }
`;

export const POST_DELETE_SUB = gql`
    subscription {
        postDeletion {
            id
        }
    }
`;

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user {
                id
                username
                password
            }
            token
        }
    }
`;

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

export const CREATE_POST = gql`
    mutation CreatePost($title: String!, $description: String!) {
        createPost(title: $title, description: $description) {
            id
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($deletePostId: ID!) {
        deletePost(id: $deletePostId)
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
            }
        }
    }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($updatePostId: ID!, $data: PostUpdate!) {
        updatePost(id: $updatePostId, data: $data) {
            id
        }
    }
`;