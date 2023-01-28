function UserListItem(props) {
    const users = props.users

    return (
        <li key={users.id}>
            <h3>{users.ip}</h3>
        </li>
    )
}

export default UserListItem