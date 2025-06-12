import React, { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import SigninImage from '../../Assets/signin.svg'
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import BaseUrl from '../../Util/BaseUrl';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const [isPassword, setisPassword] = useState(false)
    const [logindata, setlogindata] = useState({
        email: "",
        password: ""

    })

    const handleCollectdata = (e) => {
        setlogindata({
            ...logindata,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async () => {
        try {
            const result = await axios.post(`${BaseUrl}/api/admin/login`, logindata)

            console.log(result.data, "=========")
            if (result.data) {
                toast.success(result.data.message)
                localStorage.setItem('token', result.data.Token)
                localStorage.setItem('name', result.data.data.name)
                localStorage.setItem('email', result.data.data.email)
                localStorage.setItem('profile', result.data.data.profile)

                setTimeout(() => {
                    navigate('/dashboard')
                }, 1000)

            } else {
                toast.error(result.data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='h-screen'>
            <div className='grid lg:grid-cols-2 h-full'>
                <div className='bg-[#d82f57] h-full flex justify-center items-center '>
                    <div className='text-center text-white py-10 lg:py-0'>
                        <img className='w-[350px] sm:w-full block mr-auto ml-auto' src={SigninImage} />
                        <h1 className="text-2xl sm:text-4xl font-semibold font-font pt-14">Discover Love Where Your</h1>
                        <h1 className="text-2xl sm:text-4xl font-semibold font-font">Story Begins.</h1>
                        <p className="text-[18px] sm:text-[22px] font-font pt-5">Join us to discover your ideal partner <br /> and ignite the sparks of romance in <br /> your journey.</p>
                    </div>
                </div>

                <div className='flex items-center justify-center'>
                    <div className='w-full px-5 py-10 md:px-0 md:w-[530px] lg:py-0'>
                        <div className='text-5xl font-bold font-font'>
                            <h1>Sign In</h1>
                        </div>

                        <div className='pt-10'>
                            <label htmlFor='email' className='font-medium text-[#718096]'>Email</label>
                            <input id='email' className='pl-2 text-[#718096] mt-2 border-[1px] border-[#CBD5E0] bg-transparent focus:outline-none w-full h-[55px] rounded-xl ' placeholder="Enter your email" type='email' name='email' onChange={handleCollectdata} />
                        </div>

                        <div className='relative pt-8'>
                            <label for="email" className="text-[#718096] font-medium">Password</label>
                            <input placeholder="Enter your password" className="w-full mt-2 focus:outline-none h-[55px] text-[#718096] border-[1px] border-[#CBD5E0] rounded-xl pl-2 bg-transparent" type={isPassword ? 'text' : 'password'} name="password" onChange={handleCollectdata} />
                            <button className="absolute right-4 pl-3 top-[75px] border-l-[1px] h-9 border-[#CBD5E0] ">
                                {isPassword ?
                                    <IoMdEye className='text-[20px] text-[#718096]' onClick={() => setisPassword(false)} />
                                    :
                                    <IoMdEyeOff className='text-[20px] text-[#718096]' onClick={() => setisPassword(true)} />
                                }
                            </button>
                        </div>

                        <div className='py-10 flex justify-between'>
                            <div className=' flex gap-2 '>
                                <div className='inline-flex items-center'>
                                    <label className='flex items-center cursor-pointer relative'>
                                        <input className="peer h-[16px] w-[16px] cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600" id="check1" type="checkbox" />
                                        <span className='absolute text-white opacity-0 peer-checked:opacity-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'> <FaCheck /></span>
                                    </label>
                                </div>

                                <label htmlForfor="rember" className="text-uiColor">Remember me</label>
                            </div>

                            <Link className="text-right underline text-[#1D1D1D] font-medium cursor-pointer">Forgot Password?</Link>
                        </div>

                        <button type="button" className="w-full h-[60px] text-white rounded-full bg-[#6165E9] text-[20px] font-semibold" onClick={handleLogin}>Sign in</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login