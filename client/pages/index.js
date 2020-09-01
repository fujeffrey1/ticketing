import buildClient from "../api/build-client";

function LandingPage({ currentUser }) {
    return <h1>You are signed {currentUser ? "in" : "out"}</h1>;
}

export async function getServerSideProps(context) {
    const client = buildClient(context);
    const { data } = await client.get("/api/users/currentuser");

    return { props: data };
}

export default LandingPage;
