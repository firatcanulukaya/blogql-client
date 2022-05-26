import {gql} from "@apollo/client";

//POST
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
                    id
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
                    id
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