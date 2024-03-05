import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <>
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
        </>
    )
}