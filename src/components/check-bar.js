import { useState } from "react";

function CheckBar(props) {

    const [ newUsers, setNewUsers ] = useState("")

    const handleChange = (e) => setNewUsers(e.target.value)

    const submit = () => {
        props.createUsers({ip: newUsers})
        setNewUsers("")
    }

    return (
        <div>
            <input type="text" value={newUsers} onChange={handleChange} />
            <button onClick={submit}>Add User IP</button>
        </div>
    )
}

export default CheckBar;