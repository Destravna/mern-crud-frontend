import React from "react";
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Table(){
    const [getUserData, setUserData] = useState([]);
    const navigate = useNavigate();
    const getData = async()=>{
        const response = await fetch("https://merncrudserver.herokuapp.com/data", {
            method : "GET",
            headers :{
                "Content-type" : "application/json"
            }

        });
        if(response.status === 404){
            console.log("Some error occurred");
        }
        else{
            const data = await response.json();
            setUserData(data);
        }
    }
    useEffect(()=>{
        getData();
    }, []);

    const deleteData = async(id) =>{
        alert("Delete called");
        const response = await fetch("https://merncrudserver.herokuapp.com/delete/"+id, {
            method :"DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(response.status === 201){
            alert("Data deleted");
            navigate("/");
        }
    }
    return(
        <div>
            <table class="table">
            <thead className="table-dark">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">email</th>
                <th scope="col">job</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {
                getUserData.map((element, id)=>{
                    return(
                        
                            <tr>
                                <th scope="row">{++id}</th>
                                <td>{element.name}</td>
                                <td>{element.email}</td>
                                <td>{element.job}</td>
                                <td>{element.number}</td>
                                <td>
                                    <NavLink to={"details/" + element._id + "/" + id}><button type="button" class="btn btn-success"><VisibilityIcon /></button>&nbsp;</NavLink>
                                    <NavLink to={`/edit/${element._id}`}><button type="button" class="btn btn-primary"><EditRoundedIcon /></button>&nbsp;</NavLink>
                                    <button type="button" class="btn btn-danger" onClick={()=>deleteData(element._id)}><DeleteRoundedIcon /></button>&nbsp;
                                </td>
                            </tr>
                        
                    );

                })
            }
                
            </tbody>
        </table>

        </div> 
        
    )
}

export default Table;