import styles from "../styles/style.module.scss"
function Error()
{
    return (
        <div className="container">
            <h1>HTTP Error</h1>
            <p>Sorry, an error has occurred. Please try again later.</p>
            <p>Error code: 404</p>
        </div>
    );
}
export default Error