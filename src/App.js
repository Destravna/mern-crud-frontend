import Table from "./componenets/table";
import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";

function App() {
  return (
   

   <div>
     <h1 style={{textAlign:"center"}}>Basic Crud Application with React</h1>
     <nav style={{margin:"1%", padding:"2%"}}>
       <NavLink to="/add">Add</NavLink>&nbsp;
       <NavLink to="/view">View</NavLink>
     </nav>
     <hr></hr>
     <Outlet/>
   </div>
  );
}

export default App;
