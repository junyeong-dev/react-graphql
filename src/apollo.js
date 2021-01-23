import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "http://localhost:4000",
    resolvers: {
        Movie: {
            isLiked: () => false
        },
        Mutation: {
            likeMovie: (_, { id }, { cache }) => {
                console.log(id);
            }
        }
    }
});

export default client;