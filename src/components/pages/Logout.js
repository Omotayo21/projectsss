import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout'

function Logout() {
  const navigate = useNavigate();
  const[user, setUser] = useState("");
  useEffect(()=> {
    if(localStorage.getItem("token")!= "" && localStorage.getItem("token")!= null)
      navigate("/")
    else{getUser()}}, [])
    const getUser = () =>{
axios.get('/api/user',{headers:{Authorization: 'Bearer' + localStorage.getItem ('token')}})

      .then((res) => {
        setUser(res.data)
      })
      .catch((error)=> {
          console.log(error)
          })
    }

    
    
    const logoutAction = () => {
      axios.post('/api/logout',{} ,{headers:{Authorization: 'Bearer' + localStorage.getItem ('token')}})
      .then((res) => {
        localStorage.setItem('token', "")
        navigate("/")
        console.log(res)
      })
      .catch((error)=> {
          console.log(error)
          })
         
      
      
        }
    
   
// const logoutAction = () =>{
  
// }

  return(
        <Layout> 
        <div className="flex flex-row-reverse pt-4 pr-3" >
           <button className=" bg-gray-600 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5  text-center"> <a onClick={() => logoutAction} >Logout</a></button>
           </div>
        <h2 className="text-center font-medium text-xl text-green-500">Welcome, {user.name}</h2>
        </Layout>
    )
};
 export default Logout;