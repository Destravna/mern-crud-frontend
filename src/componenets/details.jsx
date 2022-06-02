import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import PhoneIcon from '@mui/icons-material/Phone';
import { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from "react-router-dom";

const Details = ()=>{
    const id = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const getData = async()=>{
        const response = await fetch("https://merncrudserver.herokuapp.com/data/"+id.id, {
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
    
    const deleteData = async() =>{
        alert("Delete called");
        const response = await fetch("https://merncrudserver.herokuapp.com/delete/"+id.id, {
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
   
    //console.log(id);

    return (
        <div>
            <h1>Welcome {userData.name}</h1>
            <Card sx = {{maxWidth: 400}}>
                <CardContent>
                    <div style={{marginLeft:"65%"}}>
                    <NavLink to={"/edit/" + userData._id}><button type="button" class="btn btn-primary"><EditRoundedIcon /></button>&nbsp;</NavLink>
                    <button type="button" class="btn btn-danger" onClick={deleteData}><DeleteRoundedIcon /></button>&nbsp;
                    </div>
                    <img src = "https://www.kindpng.com/picc/m/24-248729_stockvader-predicted-adig-user-profile-image-png-transparent.png" alt= "profile pic" style={{ width: 70 }}></img>
                    <h3>Name : {userData.name}</h3>
                    <h3>Age : 19</h3>
                    <h3><Grid3x3Icon/> {id.index}</h3>
                    <p> <EmailIcon/> : {userData.email}</p>
                    <p><WorkIcon/> : {userData.job}</p>
                    <p><PhoneIcon/> : {userData.number}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Details;