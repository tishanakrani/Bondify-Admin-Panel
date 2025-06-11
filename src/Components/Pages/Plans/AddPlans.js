import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BaseUrl from '../../Util/BaseUrl'
import { toast } from 'react-toastify'

const AddPlans = () => {
  const navigate = useNavigate()
  const [title, settitle] = useState('Add Plan')
  const [plans, setplans] = useState({
    subcriptionType: "",
    premium_name: "",
    premium_price: "",
    discount_percentage: "",
    discount_price: "",
    description: "",
    duration_day: 30
  })

  const handleCollectData = (e) => {
    setplans({
      ...plans,
      [e.target.name]: e.target.value
    })
  }

  const handleAddPlans = async () => {
    try {
      const result = await axios.post(`${BaseUrl}/api/admin/add/plan`, plans, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (result.data.data) {
        toast.success(result.data.message)
        navigate('/plans')
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  useEffect(() => {
    if (localStorage.getItem('UpdateData')) {
      const data = JSON.parse(localStorage.getItem('UpdateData'))
      setplans({
        subcriptionType: data.subcriptionType,
        premium_name: data.premium_name,
        premium_price: data.premium_price,
        discount_percentage: data.discount_percentage,
        discount_price: data.discount_price,
        description: data.description,
        duration_day: data.duration_day,
        planId: data._id
      })
      settitle('Update Plan')
    }
  }, [])

  const handleUpdate = async () => {
    try {
      const result = await axios.put(`${BaseUrl}/api/admin/update/plan`, plans, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (result.data.data) {
        toast.success(result.data.message)
        localStorage.removeItem('UpdateData')
        settitle('Add Plan')
        navigate('/plans')
      }
    } catch (error) {
      console.log(error.message)
    }
  }



 
  return (
    <>
      <div className="px-5">
        <div className="flex justify-center gap-2 pt-5 pb-16">
          <button className="px-5 flex items-center justify-center font-semibold rounded-md h-[38px] ring-1 text-nowrap hover:bg-black hover:text-white ring-black  transition duration-100 ease-in-out" onClick={() => navigate('/Plans')}>My Plans</button>
          <button className="px-5  flex items-center justify-center font-semibold rounded-md h-[38px] ring-1 text-nowrap ring-black bg-black text-white transition duration-100 ease-in-out" onClick={() => navigate('/AddPlans')}>{title}</button>
        </div><div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5"><div>
            <label for="sub" className="font-semibold font-uifontfamily text-[14px]">Subscription Type</label>
            <select id="sub" value={plans.subcriptionType} onChange={handleCollectData} name="subcriptionType" className="w-full h-14 rounded-md focus:outline-none px-3 border border-black/25">
              <option>-- Subscription Type --</option>
              <option value="Flash">Flash</option>
              <option value="Premium">Premium</option>
            </select>
          </div><div>
              <label for="premium_name" className="font-semibold font-uifontfamily text-[14px]">Premium Name</label>
              <input value={plans.premium_name} onChange={handleCollectData} placeholder="Enter Premium Name" id="premium_name" className="rounded-md border-[1px] h-14 pl-2 w-full border-black/25  text-black/80  font-Popins placeholder:font-sans focus:outline-none undefined" type="text" name="premium_name" />
            </div><div>
              <label for="premium_price" className="font-semibold font-uifontfamily text-[14px]">Premium Price</label>
              <input value={plans.premium_price} onChange={handleCollectData} placeholder="Enter Premium Price" id="premium_price" className="rounded-md border-[1px] h-14 pl-2 w-full border-black/25  text-black/80  font-Popins placeholder:font-sans focus:outline-none undefined" type="number" name="premium_price" />
            </div><div>
              <label for="discount_percentage" className="font-semibold font-uifontfamily text-[14px]">Discount Percentage %</label>
              <input value={plans.discount_percentage} onChange={handleCollectData} placeholder="Enter Discount Percentage" id="discount_percentage" className="rounded-md border-[1px] h-14 pl-2 w-full border-black/25  text-black/80  font-Popins placeholder:font-sans focus:outline-none undefined" type="number" name="discount_percentage" />
            </div><div>
              <label for="discount_price" className="font-semibold font-uifontfamily text-[14px]">Discount Price</label>
              <input value={plans.discount_price} onChange={handleCollectData} placeholder="Enter Discount Price" id="discount_price" className="rounded-md border-[1px] h-14 pl-2 w-full border-black/25  text-black/80  font-Popins placeholder:font-sans focus:outline-none undefined" type="number" name="discount_price" />
            </div><div>
              <label for="description" className="font-semibold font-uifontfamily text-[14px]">Description</label>
              <input value={plans.description} onChange={handleCollectData} placeholder="Enter Description" id="description" className="rounded-md border-[1px] h-14 pl-2 w-full border-black/25  text-black/80  font-Popins placeholder:font-sans focus:outline-none undefined" type="text" name="description" />
            </div></div>
          <div className="py-10 flex justify-center">
            <button className="px-5  flex items-center justify-center font-semibold rounded-md h-[40px] ring-1 text-nowrap ring-black hover:bg-black hover:text-white transition duration-100 ease-in-out" onClick={title === 'Add Plan' ? handleAddPlans : handleUpdate}>Save &amp; Create</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPlans