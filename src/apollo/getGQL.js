import {gql} from "@apollo/client";

export const GET_POSTS = gql`
    query Posts($first: Int, $after: Int) {
        posts(first: $first, after: $after) {
            title
            description
            id
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
            id
            title
            createdAt
            updatedAt
        }
    }
`;