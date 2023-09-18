import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function Login(){

    let navigate = useNavigate();

    const [posts, setPost] = useState({
        username: "",
        password: ""
    });

    const {username, password} = posts;


    const onInputChange = (eve) => {
        setPost({...posts, [eve.target.name]: eve.target.value});
    }

    const onSubmit = async(eve) => {
        eve.preventDefault();
        await axios.post("http://localhost:8080/authenticate", posts)
        .then((response) => {
            const userToken = response.data.token;
            localStorage.setItem("userToken", userToken);
            console.log(userToken);
        }).catch();
        navigate("/main");
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-mid-3 border rounded p-4 m-2 shadow">
                    <h2 className="text-center m-4">Login</h2>
                    <form onSubmit={(eve) => onSubmit(eve)}>
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label">
                                Username
                            </label>
                            <input type="text" className="form-control" placeholder="Enter your username" name="username" value={username} onChange={(eve) => onInputChange(eve)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                Password
                            </label>
                            <input type="password" className="form-control" placeholder="Enter your password" name="password" value={password} onChange={(eve) => onInputChange(eve)}/>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );

}