import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import { toast } from 'react-toastify';
import BaseUrl from '../../Util/BaseUrl';
import { useNavigate } from 'react-router-dom'; 

const Plans = () => {
  const navigate = useNavigate()
  const [Plan, setPlan] = useState([])

  const handledata = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/api/admin/get/plan`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPlan(result?.data?.data)

    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    handledata()
  }, [])

const handleRemovePlans = async (planId) => {
  try {
    const result = await axios.delete(`${BaseUrl}/api/admin/remove/plan/${planId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (result?.data?.success) {
      toast.success(result.data.message);
      handledata(); 
    } else {
      toast.error(result.data.message || "Failed to delete plan.");
    }
  } catch (error) {
    console.log(error.message);

  }
};

 const handleEdit = (id) => {
    const result = Plan.find(item => item._id === id)
    localStorage.setItem('UpdateData', JSON.stringify(result))
    navigate('/AddPlans')
  }


  return (
    <>
      <div className='px-5'>
        <div className='flex justify-center gap-2 pt-5 pb-16'>
          <button className='px-5 flex items-center justify-center font-semibold rounded-md h-[38px]  border-black border-[1.5px] hover:bg-black  hover:text-white transition duration-100 ease-in-out' onClick={() => navigate('/Plans')}>My Plans</button>
          <button className='px-5 flex items-center justify-center font-semibold rounded-md h-[38px] text-black  border-black border-[1.5px] hover:bg-black hover:text-white transition duration-100 ease-in-out' onClick={() => navigate('/AddPlans')}>Add Plans</button>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='grid grid-cols-2 gap-10'>
          {Plan.map((item, index) => (
            <div key={index} className='relative w-[250px] shadow-shadow bg-[#F7F6FF] py-5 rounded-md transition-transform duration-300 hover:scale-105 '>
              <button className='absolute top-2 right-10 bg-white hover:bg-gray-100 p-1.5 rounded-full shadow-md' onClick={() => handleEdit(item._id)}  >
                <RiPencilFill className='h-[1em] w-[1em]' />
              </button>
              <button className='absolute top-2 right-2 bg-white hover:bg-gray-100 p-1.5 rounded-full shadow-md'   onClick={() => handleRemovePlans(item._id)}>
                <FaTrash className='h-[1em] w-[1em]' />
              </button>
              <div className='flex justify-center pb-5'>
                <div className='flex items-center justify-center py-5 w-[80px] h-[80px] bg-white rounded-full'>
                  <FaCrown className='h-[64px] w-[64px] text-yellow-500' />
                </div>
              </div>
              <div className='flex justify-center items-center gap-2'>
                <h1 class="text-xl font-semibold text-gray-800 text-center font-font">{item.premium_name}</h1>
                <p class="text-green-600 font-semibold text-sm font-font">{item.discount_percentage}%</p>
              </div>
              <div class="mt-2 flex justify-center items-center gap-2">
                <p class="text-2xl font-bold text-gray-900 font-font">{item.discount_price}</p>
                <p class="text-gray-400 line-through text-sm font-font">{item.premium_price}</p>
              </div>
              <div class="mt-4">
                <ul class="space-y-1 text-sm text-gray-700 text-center">
                  <li class="text-indigo-600 font-medium font-font">{item.subcriptionType}</li>
                  <li class="text-gray-600 font-font">{item.duration_day} days</li>
                  <li class="text-gray-600 font-font">{item.description}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
} 

export default Plans