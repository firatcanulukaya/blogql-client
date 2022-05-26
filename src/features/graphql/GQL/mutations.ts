import {gql} from "@apollo/client";

//LOGIN
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

//POST
export const CREATE_POST = gql`
    mutation CreatePost($title: String!, $description: String!) {
        createPost(title: $title, description: $description) {
            id
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

export const DELETE_POST = gql`
    mutation DeletePost($deletePostId: ID!) {
        deletePost(id: $deletePostId)
    }
`;

//COMMENT
export const CREATE_COMMENT = gql`
    mutation CreateComment($text: String!, $postId: ID!) {
        createComment(text: $text, postId: $postId) {
            id
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation DeleteComment($deleteCommentId: ID!) {
        deleteComment(id: $deleteCommentId)
    }
`;
