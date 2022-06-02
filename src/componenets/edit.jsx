import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";


export default function Edit(){

    let history = useNavigate();
    const params = useParams();
    const id = params.id;
    const [formData, setForm] = useState({
        name:"",
        email:"",
        job:"",
        number:"",
        _id:""
    })
    const setData = (e) =>{
        const {name, value} = e.target;
        setForm({...formData, [name]:value});
    }

    const getData = async()=>{
        const response = await fetch("https://merncrudserver.herokuapp.com/data/"+id, {
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
            //console.log(data);
            setForm(data);
        }
    }

    

    useEffect(()=>{
        getData();
    }, []);

    const upateData = async(e)=>{
        e.preventDefault();
        const {name, email, job, number} = formData;
        //console.log(name, email, job, number);
        const response = await fetch("https://merncrudserver.herokuapp.com/edit/" + id, {
            method:"PATCH",
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
            //console.log(data);
            alert(data.msg);
            history("/");
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
            <button type="submit" onClick={upateData} class="btn btn-primary">Submit</button>
        </form>
    )
}