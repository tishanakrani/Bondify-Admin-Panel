import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import axios from 'axios'
import BaseUrl from '../../Util/BaseUrl';

const Feedback = () => {

  const [review , setreview] = useState ([])
  // const [heading,setheading] = useState ([])

   const handledata = async () => {
        try {
        const result = await axios.get(`${BaseUrl}/api/admin/fetch/review`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
  
       setreview(result?.data?.data?.AllReviews )
      //  setheading(result?.data?.HeadingReviews)
  
  
  
      } catch (error) {
        console.log(error.message)
      }
    }
    useEffect(() => {
      handledata()
    }, [])

  return (
    <>
      <div className='px-5 py-8'>
        <div className='p-5 bg-white rounded-xl border w-full my-5 flex sm:justify-around items-center flex-wrap'>
  
          <div className='font-sans pb-5 sm:pb-0'>
            <p className="text-lg ">Total Reviews</p>
            <h2 className="text-2xl"></h2>
            <p className="text-sm text-gray-500 font-font">Growth in review on this Year</p>
          </div>
         
          <div class="h-[60px] w-px bg-gray-200 hidden md:block"></div>
          <div className='font-sans'>
            <p className="text-lg">Average Rating</p>
            <div className='flex items-center gap-2'>
                <h2 className="text-2xl">4.0</h2>
                <div className='flex'>
                  <FaStar className='text-xl text-[#F5C252]' />
                  <FaStar className='text-xl text-[#F5C252]' />
                  <FaStar className='text-xl text-[#F5C252]' />
                  <FaStar className='text-xl text-[#F5C252]' />
                  <FaStar className='text-xl text-gray-300' />
                </div>
            </div>
            <p className="text-sm text-gray-500 font-font">Average rating on this year</p>
          </div>
          <div className="h-[60px] w-px bg-gray-200 hidden md:block"></div>
          <div className='pt-5 sm:pt-0'>
            <div className='flex items-center gap-2 text-sm text-gray-700'>
                  <FaStar className='text-[1em] text-[#F5C252]' />1
                    <div className="w-[150px] bg-yellow-100 rounded-full h-2 relative overflow-hidden">
                      <div className="bg-[#F5C252] h-full rounded-full w-[0%]" ></div>
                    </div>
                    <span className="w-[40px] text-right font-bold font-uifontfamily">0</span>
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-700'>
                  <FaStar className='text-[1em] text-[#F5C252]' />2
                    <div className="w-[150px] bg-yellow-100 rounded-full h-2 relative overflow-hidden">
                      <div className="bg-[#F5C252] h-full rounded-full" ></div>
                    </div>
                    <span className="w-[40px] text-right font-bold font-font">1</span>
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-700'>
                  <FaStar className='text-[1em] text-[#F5C252]' />3
                    <div className="w-[150px] bg-yellow-100 rounded-full h-2 relative overflow-hidden">
                      <div className="bg-[#F5C252] h-full rounded-full" ></div>
                    </div>
                    <span className="w-[40px] text-right font-bold font-font">1</span>
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-700'>
                  <FaStar className='text-[1em] text-[#F5C252]' />4
                    <div className="w-[150px] bg-yellow-100 rounded-full h-2 relative overflow-hidden">
                      <div className="bg-[#F5C252] h-full rounded-full" ></div>
                    </div>
                    <span className="w-[40px] text-right font-bold font-font">2</span>
            </div>
             <div className='flex items-center gap-2 text-sm text-gray-700'>
                  <FaStar className='text-[1em] text-[#F5C252]' />5
                    <div className="w-[150px] bg-yellow-100 rounded-full h-2 relative overflow-hidden">
                      <div className="bg-[#F5C252] h-full rounded-full" ></div>
                    </div>
                    <span className="w-[40px] text-right font-bold font-font">3</span>
            </div>
          </div>
        </div>
        
        <div  className='gap-5 columns-1 sm:columns-2 lg:columns-3 xl:columns-4'>
          {review.map((item, index) => (
          <div key={index} className='break-inside-avoid bg-white border border-gray-200 rounded-lg shadow-sm p-5 mb-5 inline-block w-full'>
            <p className="text-sm text-gray-700 mb-4 font-font">{item.review}</p>
            <div className='flex items-center gap-1 mb-4'>
              <div className='gap-1 mt-2 flex'>
                  {[1, 2, 3, 4, 5].map((star) => (
                   <FaStar key={star} className={`text-[1em] ${star <= item.rating ? 'text-[#F5C252]' : 'text-gray-300'}`}/>
                    ))}
              </div>
            </div>
            <div className='flex items-center gap-3 mt-auto'>
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full font-medium font-font"> {item?.userId?.name?.charAt(0)?.toUpperCase() || 'N'}</div>
              <div>
                <p className="text-sm font-semibold">{item?.userId?.name || ''}</p>
                <p className="text-xs text-gray-500 font-font">  {new Date(item.createdAt).toDateString().slice(4)}</p>
              </div>
            </div> 
          </div>))}
          


        </div> 

      </div>
    </>
  )
}

export default Feedback