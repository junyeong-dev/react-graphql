import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

// 새로운 쿼리의 함수를 만들지 않아도 병렬로 쿼리를 보낼 수 있음
// movie에도 id를 부여함으로써 apollo에게 같은 객체를 가르키는 것이라고 명시해줄 수 있음
const GET_MOVIE = gql`
    query movie($id: Int!) {
        movie(id: $id) {
            id
            title
            language
            rating
            medium_cover_image
            description_intro
            isLiked @client
        }
        suggestions(id: $id) {
            id
            medium_cover_image
        }
    }
`;

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`;

const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`;

const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 28px;
`;

const Poster = styled.div`
    width: 25%;
    height: 60%;
    background-color: transparent;
    background-image: url(${ props => props.bg });
    background-size: cover;
    background-position: center center;
`;

export default () => {
    const { id } = useParams();
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id: +id }
    });

    // GraphQL은 기본적으로 cache를 가지고 있음
    return (
        <Container>
            <Column>
            {/* data를 바로 가져오는 것이 아니기 때문에 loading를 통해 확인 후 rendering */}
            <Title>{ loading ? "Loading..." : `${ data.movie.title } ${ data.movie.isLiked ? "💘" : "💔" }` }</Title>
                <Subtitle>{ data?.movie?.language } ・ { data?.movie?.rating }</Subtitle>
                <Description>{ data?.movie?.description_intro }</Description>
            </Column>
            {/* <Poster bg={ data && data.movie ? data.movie.medium_cover_image: "" }></Poster> */}
            {/* Javascript optional chaining */}
            <Poster bg={ data?.movie?.medium_cover_image }></Poster>
        </Container>
    );
};