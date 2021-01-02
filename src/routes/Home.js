import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

// query를 작성 ''가 아닌 ``로 작성해야함
const GET_MOVIES = gql`
{
    movies {
        id
        medium_cover_image
    }
}
`;

export default () => {
    // react-hook 을 이용하여 간단하게 쿼리를 보낼 수 있음
    const { loading, error, data } = useQuery(GET_MOVIES);
    console.log(loading, error, data);
    return <h1>Home</h1>
};