import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout';

function Login() {
const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] =useState({});
  const [passwordVisible, setPasswordVisible] = useState(false)
  
  useEffect(()=> {
  if(localStorage.getItem("token")!= "" && localStorage.getItem("token")!= null)
    navigate("/logout")}, [])
  
  
  const loginAction = (e)=>{
    e.preventDefault();
    setIsSubmitting=(true)
    let payload = {
        email : email,
        password : password,
       
    };
    axios.post('/api/login', payload)
    .then((res) => {
      setIsSubmitting(false)
      localStorage.setItem('token', res.data.token)  
    })
    .catch((error)=> {
        setIsSubmitting(false)
        if (error.response.data.errors != undefined){
            setValidationErrors(error.response.data.errors)
        }
    });

 }
















 const handletogglePassword= () => {
    setPasswordVisible (!passwordVisible)
   };
const inputType = passwordVisible ? 'text' : 'password';

 
        return(
    <Layout>
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form onSubmit={(e) =>{loginAction(e)}}  className="space-y-4 md:space-y-6" action="#">
                {Object.keys(validationErrors).length !=0 &&
                <p className='text-center'><small className='text-red-800'>incorrect email or password</small></p>}
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" value={email} name="email" onChange={(e)=>{setEmail(e.target.value)}} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type={inputType}  value={password} name="password" onChange={(e)=>{setPassword(e.target.value)}} id="pswd" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
            <button className=' text-white bg-red-600 hover:bg-primary-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-primary-700  dark:focus:ring-primary-800" pr-5 cursor:pointer ' onClick={handletogglePassword}>{passwordVisible ? "hide" : "show"  }</button>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          
                         
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600   dark:focus:ring-primary-800"
                   disabled={isSubmitting}>Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Dont have an account yet? <Link to="/register" href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" >Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
   </Layout>
    )

};
export default Login;