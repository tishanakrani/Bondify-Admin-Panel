import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { LuInfo } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios'
import BaseUrl from '../../Util/BaseUrl';

const User = () => {

    const [user, setuser] = useState([])

     const handledata = async () => {
      try {
      const result = await axios.get(`${BaseUrl}/api/admin/users?page=1&limit=10`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

     setuser(result?.data?.data?.users)
      
  


    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    handledata()
  }, [])
  

  return (
    <>
        <div className='px-5'>
            <div className='md:flex items-center justify-between'> 
                <h2 className='text-[18px] font-medium font-font'>Manage User</h2>
                  <div className='items-center gap-2 flex justify-between'>
                    <div className='relative py-5'>
                      <IoIosSearch className='h-[24px] w-[24px] absolute top-[35px] left-4 text-gray-500' />
                      <input class="pl-11 xxl:w-[298px] w-full h-[50px] rounded-3xl border-[1px] border-black/25  text-black/80  font-Popins placeholder:font-sans focus:outline-none" placeholder="Serach by users..." type="text" />
                    </div>
                    <div >
                        <select name='Gender' className='w-full  h-[50px] rounded-3xl  px-3 mr-10 border border-black/25 focus:outline-none'>
                          <option value="All">Sort by: All</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                    </div>
                  </div>
            </div>

            <div className='border-[1px] border=[#E4E4E4] rounded-lg overflow-x-auto w-full'>
                <table className='w-full divide-y'>
                    <thead className='h-[58px]'>
                      <tr className='text-left font-font text-[14px] text-[#534D59]'>
                        <th class="text-nowrap px-8">Users</th>
                        <th class="text-nowrap px-5">Status</th>
                        <th class="text-nowrap px-5">Premium</th>
                        <th class="text-nowrap px-5">Phone Number</th>
                        <th class="text-nowrap px-5">Gender</th>
                        <th class="text-nowrap px-5">Join Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className='divide-y'>
                      {user.map((item, index) => (
                      <tr  key={index}  className='h-[58px]'>
                        <td className='px-8'>
                          
                          <div className='flex items-center gap-3'>
                          <img className='w-[40px] h-[40px] rounded-full object-cover ' src={item?.profile_picture} />
                              <div className='leading-5'>
                                  <h2 className="text-[14px] text-[#1B2128] font-semibold font-font text-nowrap">{item.name}</h2>
                                  <h4 className="text-[14px] font-font text-[#959595] text-nowrap">{item.email}</h4>
                              </div>
                          </div>
                          </td>

                        <td className='text-[14px] px-5 text-[#1B2128] font-font text-nowrap'>
                          <label className='flex cursor-pointer select-none items-center'>
                            <div className='relative'>
                              <input className="sr-only" type="checkbox" checked="" />
                              <div className="box block h-6 w-10 rounded-full bg-blue-500"></div>
                              <div className="absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition translate-x-full"></div>
                            </div>  
                          </label>
                        </td>  
                        
                        <td className="px-5">
                          <div className="bg-[#E9FFEF] text-[#409261] w-[85px] h-[25px] text-sm font-medium me-2 py-0.5 rounded-full flex items-center justify-center gap-2">
                            <span>Active</span>
                          </div>
                        </td>

                        <td className="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">{item.mobileNumber}</td>
                        <td className="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">{item.gender}</td>
                        <td className="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">{item.createdAt}</td>

                        <td className='px-5'>
                            <div className='flex items-center gap-10'>
                                <button type="button"><LuInfo className='text-[24px] text-gray-400'/></button>
                                <button type="button"><RiDeleteBinLine  className='text-[24px] text-gray-400'/></button>
                            </div>
                        </td>
                      </tr>
                      ))}
                        
                    </tbody>
                </table>
            </div>

            <div class="flex gap-2 justify-center py-5">
              <button class="w-8 h-8 rounded text-sm bg-[#F9FAFC] border">01</button>
            </div>

        </div>
    </>
  )
}

export default User