import axios from "axios";
import Ract, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function EditUser(){
    let navigate = useNavigate();
    
    const{id} = useParams();

    const [user, setUser] = useState({
        name:"",
        userName:"",
        email:""
    });

    const {name, userName, email} = user;

    const userToken = localStorage.getItem("userToken");

    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    };

    const onInputChange = (eve) => {
        setUser({...user, [eve.target.name]: eve.target.value});
    }

    useEffect(() =>{
        loadUser();
    },[]);

    const onSubmit = async(eve) => {
        eve.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`, user, config);
        navigate("/main");
    }

    const loadUser = async() => {
        const result = await axios.get(`http://localhost:8080/user/${id}`, config);
        setUser(result.data);
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-mid-3 border rounded p-4 m-2 shadow">
                    <h2 className="text-center m-4">Edit User</h2>
                    <form onSubmit={(eve) => onSubmit(eve)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input type="text" className="form-control" placeholder="Enter your name" name="name" value={name} onChange={(eve) => onInputChange(eve)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">
                                Username
                            </label>
                            <input type="text" className="form-control" placeholder="Enter your username" name="username" value={userName} onChange={(eve) => onInputChange(eve)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                Email
                            </label>
                            <input type="text" className="form-control" placeholder="Enter your email" name="email" value={email} onChange={(eve) => onInputChange(eve)}/>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link className="btn btn-outline-danger mx-2" to="/main">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}