import React, { useState } from 'react';
import axios from 'axios';
import swal from "sweetalert2";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function AuthModal() {
    const [registerInput,setRegister] = useState({
        first_name:'',
        last_name:'',
        password:'',
        email:'',
        confirm:'',
        error_list:[],
    });
    const [cookies,setCookie] = useCookies(['name']);

    const navigate = useNavigate()
    const loginSubmit=async()=>{
        if (
            loginInput.email == "" ||
            loginInput.password == "" 
        ) {
          swal.fire("Invalid !!", "Please provide all inputs", "warning");
        } else {
          
            const data = {
              email: loginInput.email,
              password: loginInput.password,
            };
    
            console.log(
              "🚀 ~ file: UserLogin.jsx:129 ~ UserLogin ~ UserLogin:",
              data
            );
            try {
              const response = await axios.post(
                "http://localhost:8080/api/v1/auth/authenticate",
                data
              );
              setCookie('jwt',response.data)
              swal.fire("Bienvenu", "", "success");
              navigate('')
              window.location.reload();
            } catch (error) {
              swal.fire("Echec !!", "Invalid credantials", "warning");
              console.error(error);
            }
          
        }
    }
    const registerSubmit=async()=>{
        if ( registerInput.last_name == "" ||
            registerInput.first_name == "" ||
            registerInput.email == "" ||
            registerInput.password == "" ||
            registerInput.confirm == ""
        ) {
          swal.fire("Invalid !!", "Please provide all inputs", "warning");
        } 
        else if(registerInput.password != registerInput.confirm )
        {
          swal.fire("Invalid !!", "Password doesnt match", "warning");
        }
        else {
          
            const data = {
              email: registerInput.email,
              password: registerInput.password,
              first_name: registerInput.first_name,
              last_name:registerInput.last_name
            };
    
            console.log(
              "🚀 ~ file: Userregister.jsx:129 ~ Userregister ~ Userregister:",
              data
            );
            try {
              const response = await axios.post(
                "http://localhost:8080/api/v1/auth/register",
                data
              );
              swal.fire("Your account has been created", "", "success");
              loginForm();
            } catch (error) {
              swal.fire("Echec !!", "Invalid credantials", "warning");
              console.error(error);
            }
          
        }
    }

    const ModalAuth =()=>{
        const modal= document.querySelector('.authmodal')
        modal.classList.add('hidden')
        modal.classList.remove('flex')
    }

    const [loginInput,setLogin] = useState({
        email:'',
        password:'',
        error_list:[],
    });

    const loginForm = () =>{
        const login= document.querySelector('.login')
        const register = document.querySelector('.register')
        login.classList.remove('hidden')
        login.classList.add('flex')
        register.classList.remove('flex')
        register.classList.add('hidden')
    }
    const registerForm = () =>{
        const login= document.querySelector('.login')
        const register = document.querySelector('.register')
        login.classList.remove('flex')
        login.classList.add('hidden')
        register.classList.remove('hidden')
        register.classList.add('flex')
        console.log("Hi")
    }

    
    const handleRegisterInput =(e) =>{
        e.persist();
        setRegister({...registerInput,[e.target.name]:e.target.value});
    }
    const handleInput =(e) =>{
        e.persist();
        setLogin({...loginInput,[e.target.name]:e.target.value});
    }

  return (
    <div className="fixed z-100 w-full h-screen top-0 hidden items-center justify-center bg-gray-900/70 authmodal fade">
      
        <div className="relative flex items-center justify-center z-5 w-full h-full md:w-[850px] md:h-[510px] bg-white  zoom-in">
            <div className="flex px-7 md:w-1/2 flex-col items-center space-y-5">
                <div className = "absolute left-0 p-4 top-0" >
                      <i className = "bx bx-x cursor-pointer text-2xl font-semibold hover:text-main" onClick={ModalAuth}/>
                </div>
                {/* Register Modal */}
                <div className="w-full hidden flex-col space-y-4 register relative z-100">
                    <h2 className = "text-2xl text-center font-bold text-gray-900 ">
                        Crée votre compte
                    </h2>
                    <div className = "flex w-full flex-col space-y-3">
                        <input name="first_name" value={registerInput.first_name} onChange={handleRegisterInput} placeholder = "First Name" type="text" className = "focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600" />
                        <input name="last_name" value={registerInput.last_name} onChange={handleRegisterInput} placeholder = "Last Name" type="text" className = "focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600" />
                        <input name="email" value={registerInput.email} onChange={handleRegisterInput} placeholder = "Email" type="text" className = "focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600" />
                        <input name="password" value={registerInput.password} onChange={handleRegisterInput} placeholder = "Password" type="password" className = "focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600" />
                        <input name="confirm" value={registerInput.confirm} onChange={handleRegisterInput} placeholder = "Confirmer votre Mot de passe" type="password" className = "focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600" />

                        <button onClick={registerSubmit} className = "bg-main text-white flex items-center justify-center py-2 rounded text-sm" >
                                <span>S'inscrire</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        <div className="cursor-pointer bg-red-600 text-white text-lg drop-shadow-md flex justify-center py-2 rounded">
                             <i className='bx bxl-google-plus'></i>
                        </div>
                        <div className="cursor-pointer bg-blue-600 text-white text-lg drop-shadow-md flex justify-center py-2 rounded">
                            <i className='bx bxl-facebook' ></i>
                        </div>
                        <div className="cursor-pointer border border-blue-500 text-white text-lg drop-shadow-md flex justify-center py-2 rounded">
                            <i className='bx bxl-twitter text-blue-500' ></i>
                        </div>
                    </div>
                    <div className = "flex items-center w-full justify-between" >
                        <p onClick={loginForm} className = "text-sm hover:text-main cursor-pointer font-semibold duration-300" >
                           Se connectez!
                        </p>
                        <p className = "text-sm hover:text-main cursor-pointer font-semibold duration-300" >
                            Mot de passe oublier ?
                        </p>
                    </div>
                    {
                        (registerInput.error_list.error)
                        &&
                        <div className="flex text-xs text-red-500 absolute -bottom-10">
                            {
                                registerInput.error_list.messageErr
                            }
                        </div>
                    }
                </div>
                {/* Login Modal */}
                <div  className="w-full flex flex-col space-y-4 login relative">
                    <h2 className = "text-2xl text-center font-bold text-gray-900 ">
                        Se connectez à votre compte
                    </h2>
                    <div method="post"  className = "flex w-full flex-col space-y-3">
                        <input name="email" onChange={handleInput} value={loginInput.email} placeholder = "Adresse Email" type="text" className = "focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600" />
                        <input name="password" onChange={handleInput} value={loginInput.password} placeholder = "Mot de passe" type="password" className = "focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600" />
                        <button onClick={loginSubmit} className = "bg-main text-white flex items-center justify-center py-2 rounded text-sm" >
                                <span>Se connectez</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        <div className="cursor-pointer bg-red-600 text-white text-lg drop-shadow-md flex justify-center py-2 rounded">
                             <i className='bx bxl-google-plus'></i>
                        </div>
                        <div className="cursor-pointer bg-blue-600 text-white text-lg drop-shadow-md flex justify-center py-2 rounded">
                            <i className='bx bxl-facebook' ></i>
                        </div>
                        <div className="cursor-pointer border border-blue-500 text-white text-lg drop-shadow-md flex justify-center py-2 rounded">
                            <i className='bx bxl-twitter text-blue-500' ></i>
                        </div>
                    </div>
                    <div className = "flex items-center w-full justify-between" >
                        <p onClick={registerForm} className = "text-sm hover:text-main cursor-pointer font-semibold duration-300" >
                           Inscription içi!
                        </p>
                        <p className = "text-sm hover:text-main cursor-pointer font-semibold duration-300" >
                            Mot de passe oublier ?
                        </p>
                    </div>
                    {
                        (loginInput.error_list.error)
                        &&
                        <div className="flex text-xs text-red-500 absolute -bottom-10">
                            {
                                loginInput.error_list.messageErr
                            }
                        </div>
                    }
                </div>
            </div>
            <img src="/pharmacie.jpg" className="hidden md:flex w-1/2 object-right object-cover h-full "/>
        </div>
    </div>
  )
}

export default AuthModal
