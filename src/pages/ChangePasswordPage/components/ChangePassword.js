import React, {useState} from "react";

function changePassword()
{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) =>
    {
        event.preventDefault()
        console.log(sessionStorage.getItem("Email"))
    }
    return (
        <form onSubmit={handleSubmit}>
            <br/>
            <label>
                New Password:
            </label>
            <input type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
            <button type="submit">BEb</button>
            <br/>
        </form>
    );
}
export default changePassword