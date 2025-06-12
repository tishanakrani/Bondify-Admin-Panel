import React from 'react';
import { RiHome6Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { GiHearts } from "react-icons/gi";
import { HiFaceSmile } from "react-icons/hi2";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { BiSolidMessageRounded } from "react-icons/bi";
import { RiVipDiamondFill } from "react-icons/ri";
import { IoLogOutOutline, IoNotifications } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import logo from '../../Assets/logo.svg'


const Navigation = () => {

  const navigate = useNavigate()

  const showMessage = () => {
    toast.success("Interest fatch successfully")
  }

  const showuser = () => {
    toast.success("User fatched successfully")
  }

  const showplan = () => {
    toast.success("Plan fatch successfully")
  }

  const showreview = () => {
    toast.success("Review fatched successfully")
  }

  const showavatar = () => {
    toast.success("Avatar fatch successfully")
  }

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <>
      <div className='bg-white w-[279px] z-50 transition-transform duration-300 ease-in-out fixed h-screen'>

        <div className='mx-5 mt-10'>
          <img className='w-[140px] h-[25px] ' src={logo} />
        </div>

        <div className='mt-10'>
          <ul className='grid grid-cols-1'>
            <li className='px-5 py-3'>
              <Link to={'/Dashboard'} className='text-[#718096] hover:text-[#d82f57] hover:bg-[#9096A2]/10 hover:border-[1px] hover:border-[#9096A2]/20 rounded-xl font-medium gap-2 flex text-[16px] p-[12px]  font-font  items-center'>
                <RiHome6Fill className='text-[26px]' />Dashboard
              </Link >
            </li>

            <li className='px-5 py-3'>
              <Link to={'/User'} className='text-[#718096] hover:text-[#d82f57] hover:bg-[#9096A2]/10 hover:border-[1px] hover:border-[#9096A2]/20 rounded-xl font-medium gap-2 flex text-[16px] p-[12px]  font-font  items-center' onClick={showuser}>
                <FaUser className='text-[24px]' />User Manage
              </Link >
            </li>

            <li className='px-5 py-3'>
              <Link to={'/Plans'} className='text-[#718096] hover:text-[#d82f57] hover:bg-[#9096A2]/10 hover:border-[1px] hover:border-[#9096A2]/20 rounded-xl font-medium gap-2 flex text-[16px] p-[12px]  font-font  items-center' onClick={showplan}>
                <RiVipDiamondFill className='text-[26px]' />Plans
              </Link >
            </li>

            <li className='px-5 py-3'>
              <Link to={'/Feedback'} className='text-[#718096] hover:text-[#d82f57] hover:bg-[#9096A2]/10 hover:border-[1px] hover:border-[#9096A2]/20 rounded-xl font-medium gap-2 flex text-[16px] p-[12px]  font-font  items-center' onClick={showreview}>
                <BiSolidMessageRounded className='text-[26px]' />Feedback
              </Link >
            </li>

            <li className='px-5 py-3'>
              <Link to={'/Interest'} className='text-[#718096] hover:text-[#d82f57] hover:bg-[#9096A2]/10 hover:border-[1px] hover:border-[#9096A2]/20 rounded-xl font-medium gap-2 flex text-[16px] p-[12px]  font-font  items-center' onClick={showMessage}>
                <GiHearts className='text-[24px]' />Interest
              </Link >
            </li>

            <li className='px-5 py-3'>
              <Link to={'/Avatar'} className='text-[#718096] hover:text-[#d82f57] hover:bg-[#9096A2]/10 hpver:border-[1px] hover:border-[#9096A2]/20 rounded-xl font-medium gap-2 flex text-[16px] p-[12px]  font-font  items-center' onClick={showavatar}>
                <HiFaceSmile className='text-[26px]' />Avatar
              </Link >
            </li>

            <li className='px-5 py-3'>
              <Link to={'/Finance'} className='text-[#718096] hover:text-[#d82f57] hover:bg-[#9096A2]/10 hover:border-[1px] hover:border-[#9096A2]/20 rounded-xl font-medium gap-2 flex text-[16px] p-[12px]  font-font  items-center'>
                <BsCreditCard2FrontFill className='text-[26px]' />Finance
              </Link >
            </li>

            <li className='px-8 py-3'>
              <button type='button' onClick={logout} className='flex items-center gap-2  text-[#718096] font-medium text-[17px] font-uifontfamily'>
                <IoLogOutOutline className='text-[25px]' /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className='lg:pl-[279px]'>
        <div className='sticky z-10 h-[90px] flex justify-between w-full items-center px-5 gap-2 bg-white top-0' >
          <div className='font-font'>
            <h1 className='text-[30px] font-bold'>Good evening, codeline  </h1>
          </div>

          <div className='flex items-center'>
            <IoNotifications className='text-[24px] text-[#718096]' />
            <div className='flex gap-2 pl-9'>
              <img className='rounded-full h-[40px] w-[40px]' src={localStorage.getItem('profile')} />
              <div className='font-font'>
                <h2 className='text-[15px]  font-medium'>{localStorage.getItem('name')}</h2>
                <h3 className='text-[#718096] text-xs'>Admin</h3>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Navigation