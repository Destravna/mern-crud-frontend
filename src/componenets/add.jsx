import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useContext, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
export default function Add(){
    
    const navigate = useNavigate("");
    const [formData, setForm] = useState({
        name:"",
        email:"",
        job:"",
        number:""
    })
    const setData = (e) =>{
        const {name, value} = e.target;
        setForm({...formData, [name]:value});
        
    }

    const addData = async(e)=>{
        e.preventDefault();
        const {name, email, job, number} = formData;
        console.log(name, email, job, number);
        const response = await fetch("https://merncrudserver.herokuapp.com/register", {
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({name, email, job, number})
        });

        const data = await response.json();
        if(!data){
            alert("Error occurred");
        }else{
            console.log(data);
            console.log("data added");
            navigate("/");
        }
        
        
    }
    return(
        <form>
            <div class="row">
                <div class="col">
                    <input type="text" value = {formData.name} onChange={setData} name="name" class="form-control" placeholder="name"></input>
                </div>
            </div>
            <br></br>
            <div class="row">
                <div class="col">
                    <input type="text" value = {formData.email}onChange={setData} name="email" class="form-control" placeholder="email"></input>
                </div>
                <div class="col">
                    <input type="text" value = {formData.job}onChange={setData} name="job" class="form-control" placeholder="job"></input>
                </div>
            </div>
            <br></br>
            <input type="text" class="form-control" value = {formData.number} onChange={setData} name="number" placeholder="number"></input>
            <br></br>
            <button type="submit" class="btn btn-primary" onClick={addData}>Submit</button>
        </form>
    )
}