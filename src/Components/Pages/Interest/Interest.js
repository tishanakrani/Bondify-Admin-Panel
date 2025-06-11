import React, { useEffect, useState } from 'react';
import { GoPencil } from "react-icons/go";
import axios from 'axios'
import BaseUrl from '../../Util/BaseUrl';
import { GoTrash } from "react-icons/go";


const Interest = () => {

    const [intrest , setintrest] = useState ([])

    const handledata = async () => {
        try {
        const result = await axios.get(`${BaseUrl}/api/admin/fetch/interset`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
  
       setintrest(result?.data?.data )
  
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
          <div class="flex justify-end gap-2 pt-5 pb-16">
            <button class="px-5 flex items-center justify-center w-[170px] h-[48px] bg-[#6165E9] rounded-full text-white font-font ">Add Interest</button>
          </div>

          <div className='border-[1px] border-[#E4E4E4] rounded-lg overflow-x-auto w-full'>
            <table className='w-full divide-y'>
                <thead className='h-[58px]'>
                  <tr className='text-left font-font text-[14px] text-[#534D59]'>
                      <th class="text-nowrap px-8">Interest Image</th>
                      <th class="text-nowrap px-5">Interest Name</th>
                      <th class="text-nowrap px-5">Created At</th>
                      <th></th>
                  </tr>
                </thead> 
                {intrest.map((item, index) => (
                <tbody key={index} className='divide-y'>
                  <tr className='h-[58px]'>
                      <td className='px-8'>
                        <img className='w-[40px] h-[40px] text-[#d82f57] rounded-full' src={item.interestImage} />  
                      </td>
                      <td class="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">{item.interest}</td>
                      <td class="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">  {new Date(item.createdAt).toDateString().slice(4)}</td>
                      <td className='px-5'>
                        <div className='flex item-center gap-10'>
                            <button><GoPencil className='w-[24px] h-[24px] text-[#959595]'/></button>
                            <button><GoTrash className='w-[24px] h-[24px] text-[#959595]'/></button>

                        </div>
                      </td>
                  </tr>
        
                </tbody>
                   ))}
            </table>
          </div>

        </div>
   </>
  )
}

export default Interest