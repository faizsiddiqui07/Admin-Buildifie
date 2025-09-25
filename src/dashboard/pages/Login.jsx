import React, { useContext, useState } from "react";
import { base_url } from "../../config/config";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import storeContext from "../../context/storeContext";

const Login = () => {

  const {dispatch} = useContext(storeContext)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const [state, setState] = useState({
    email: "",
    password:""
  })

  const inputHandle = (e)=>{ 
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      setLoader(true)
      const { data } = await axios.post(`${base_url}/api/admin/login`, state)
      setLoader(false)
      localStorage.setItem('Buildifie', data.token)
      if (data.success) {
        toast.success(data.message)
        navigate('/dashboard/admin')
      }
      dispatch({
        type: "login_success",
        payload: {
          token: data.token
        }
      })
    } catch (error) {
      setLoader(false)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="w-screen min-h-screen bg-slate-200 flex justify-center items-center px-4">
      <div className="w-full max-w-sm text-slate-600 shadow-md">
        <div className="bg-white h-full px-7 py-8 rounded-md">
          <div className="w-full flex justify-center items-center">
            <h2 className="text-3xl cursor-default mb-8">Buildifie</h2>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-2 mb-2">
              <label
                htmlFor="email"
                className="text-md font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                value={state.email}
                onChange={inputHandle}
                className="px-3  py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="email"
                className="text-md font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={state.password}
                onChange={inputHandle}
                className="px-3  py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
              />
            </div>
            <div className="mt-4">
              <button disabled={loader} className="px-3 py-[6px] w-full bg-purple-500 rounded-sm text-white hover:bg-purple-600" >{loader? "Loading...":"Login"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
