import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Home(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
        // eslint-disable-next-line
    }, []);

    const userToken = localStorage.getItem("userToken");
    console.log(userToken);

    const config = {
        headers: {
            "sensitive": "true",
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
        }
    };
    console.log(config);
    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8080/user`, config);
        setUsers(result.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`, config);
    };

    return(
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID Number</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary mx-2"
                                        to={`/viewuser/${user.id}`}
                                    >
                                        View
                                    </Link>
                                    <Link
                                        className="btn btn-primary mx-2"
                                        to={`/eidtuser/${user.id}`}
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        className="btn btn-primary mx-2"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}