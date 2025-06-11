import React, { useEffect, useState } from 'react'
import { FaDatabase } from "react-icons/fa";
import { RiRefundFill } from "react-icons/ri";
import { GiWallet } from "react-icons/gi";
import { MdWorkspacePremium } from "react-icons/md";
import ReactApexChart from 'react-apexcharts';
import { MdBarChart } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { PiDotOutlineFill } from "react-icons/pi";
import axios from 'axios'
import BaseUrl from '../../Util/BaseUrl';


const Finance = () => {

  const [income , setincome] = useState ([])
  const [user , setuser] = useState ([])

   const handledata = async () => {
        try {
        const result = await axios.get(`${BaseUrl}/api/admin/total/payments?page=1&limit=10`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (result.data) {
          setincome([
           {
            title: "Total Income",
            icon: FaDatabase,
            count: result.data.data.TotalRevenue,
            colorcode: "#3d8bfd",
            bgcolorcode: "#f5f9ff"
           },
           {
            title: "Total Refunds",
            icon: RiRefundFill,
            count: result.data.data.TotalRefunds,
            colorcode: "#e35d6a",
            bgcolorcode: "#f5f9ff"
          },
          {
            title: "Balance",
            icon: GiWallet,
            count: result.data.data.TotalRevenue,
            colorcode: "#479f76",
            bgcolorcode: "#f5f9ff"
          },
          {
            title: "Premium Users",
            icon: MdWorkspacePremium,
            count: result.data.data.totalUserPreimum,
            colorcode: "#ffcd39",
            bgcolorcode: "#f5f9ff"
           }
          ])
              }
            } catch (error) {
              console.log(error.message)
            }
          }
        

    useEffect(() => {
      handledata()
    }, [])

const handleuser = async () => {
        try {
        const result = await axios.get(`${BaseUrl}/api/admin/total/payments?page=1&limit=10`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
  
       setuser(result?.data?.data?.PaymentRecode)
  
      } catch (error) {
        console.log(error.message)
      }
    }
    useEffect(() => {
      handleuser()
    }, [])
    
const [state] = React.useState({

    series: [{
      name: 'Summer special',
      data: [0, 750, 1200, 5000, 100, 200, 300, 400, 500, 600, 700, 800]
    }, {
      name: 'Flash',
      data: [0, 0, 0, 6750, 1000, 800, 700, 600, 500, 300, 200, 100]
    }, {
      name: 'Monthly',
      data: [500, 1000, 1500, 5000, 4000, 3000, 2000, 1000, 500, 300, 200, 100]
    }, {
      name: 'Holi special',
      data: [50, 0, 4500, 0, 600, 800, 900, 1000, 2000, 1500, 1000, 500]
    }],
    options: {
      chart: {
        type: 'line',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      colors:['#0284C7', '#10B981', '#F59E0B', '#F43F5E'],
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Subscription Plan Earning',
        style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#2B3674'
    },
      },
      xaxis: {
        categories: ["jan", "feb", "march", "april", "may", "june", "july", "Aug", "spt", "oct", "nav", "Dec"],
      },
      yaxis: {
        max: 8000
      },
      legend: {
        show: true,
        position: 'top',
        offsetX: 200,
        offsetY: -30,
      }
    },
  });


  
 
const [barChart] = React.useState({

    series: [{
      name: 'Earnings',
      data: [5750, 6750, 5000, 4550, 0, 0, 0, 0, 0, 0, 0, 0]
    },],
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false
        },
      },
     plotOptions: {
      bar: {
        columnWidth: '45%',
        borderRadius: 6,
        horizontal: false,
        distributed: true  
      }
    },
      dataLabels: {
        enabled: false
      },
    
      colors: ['#e5e7eb','#7366FF','#e5e7eb','#e5e7eb','#e5e7eb','#e5e7eb','#e5e7eb','#e5e7eb','#e5e7eb','#e5e7eb','#e5e7eb','#e5e7eb'],
     
      stroke: {
        curve: 'smooth'
      },
  
  
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "may", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"],
           labels: {
          style: {
            colors: '#a3aed0',
            fontSize: '15px',
            fontWeight: 400,
          }
        }
      },
      yaxis: {
        show: false,
      },
      grid: {
       show: false
      },
      legend: {
        show: false,  
      }
    },
  });


  return (
    <>
        <div className='px-5 pt-10'>
        <div className='grid grid-cols-2 gap-5'> 
          {income.map((item, index) => (
          <div key={index} >
            <div className='flex items-center justify-between px-8 h-24 border-[1px] border-[#9096A2]/20 rounded-xl'>
            <div className='font-font'>
              <h4 class="text-[#718096] text-[14px] font-medium text-center text-nowrap">{item.title}</h4>
              <h1 class="text-[32px] font-medium">{item.count}</h1>
            </div>
            <span style={{ backgroundColor: item.bgcolorcode }}  className='flex items-center justify-center w-[50px] h-[50px] bg-[#F5F9FF] rounded-full '>
             <item.icon color={item.colorcode} className='text-[35px]' />
            </span>
            </div>
          </div>
           ))}
          </div>
        
              <div className='xxl:col-span-2 border-[1px] border-[#9096A2]/20 rounded-xl overflow-x-auto xxl:overflow-hidden mt-5'>
              <div className='py-3 w-[800px] xxl:w-full'>
                <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
              </div>
              </div>
        
        <div className='py-5 px-5 my-5 border-[1px] border-[#E4E4E4] rounded-lg overflow-x-auto w-full '>
          <div className=' xxl:w-full'>
            <div className='flex items-center justify-between px-5'>
              <div>
                <h2 className="text-[14px] font-font text-[#A3AED0]">Total Earning</h2>
                <h1 className="text-[34px] font-font text-[#1B2559] font-bold">6750</h1>
              </div>
              <div className='bg-[#F4F7FE] relative height-[35px] width-[35px] rounded-md '>
              <MdBarChart className='text-[33px] text-[#7366FF]' />
              </div>
            </div>
            <ReactApexChart options={barChart.options} series={barChart.series} type="bar" height={300} />
          </div>
        </div>

        <div className='md:flex items-center gap-2 justify-between'>
          <div className='relative py-5'>
            <IoSearch className='text-gray-500 absolute top-[35px] left-4 text-[24px]' />
            <input className="pl-11 xxl:w-[500px] w-full h-[50px] rounded-3xl border-[1px] border-black/25  text-black/80  font-Popins placeholder:font-sans focus:outline-none" placeholder="Serach by users..." type="text" />
          </div>
          <div className='flex gap-3'>
            <select name="PaymentStatus" className="w-full mb-5 md:mb-0 md:w-[170px] h-[50px] rounded-3xl focus:outline-none px-3 border border-black/25 font-font text-[#092C4C]">
              <option value="All">Payment Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
            <select name="Gender" className="w-full mb-5 md:mb-0 md:w-[155px] h-[50px] rounded-3xl focus:outline-none px-3 border border-black/25 font-font text-[#092C4C]">
              <option value="All">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className='border-[1px] border-[#E4E4E4] rounded-lg overflow-x-auto w-full '>
          <table className='w-full divide-y'>
            <thead className="h-[58px]">
              <tr className="text-left font-font text-[14px] text-[#534D59]">
                <th className="text-nowrap px-8">Users</th>
                <th className="text-nowrap px-5">Gender</th>
                <th className="text-nowrap px-5">Subscription Plan</th>
                <th className="text-nowrap px-5">Payment Getaway</th>
                <th className="text-nowrap px-5">Payment Id</th>
                <th className="text-nowrap px-5">Paid Amount</th>
                <th className="text-nowrap px-5">Payment Status</th>
                <th className="text-nowrap px-5">Payment Date</th>
                <th className="text-nowrap px-5">Refund</th>
              </tr>
            </thead>
            <tbody>
              {user.map((item, index) => (
              <tr key={index} className='h-[58px]'>
                <td className='px-8'>
                  <div className='flex items-center gap-3'>
                    <img  className='w-[40px] h-[40px] rounded-full object-cover' src={item?.userId?.profile || 'NA'}    />
                    <div className='leading-5'>
                      <h2 className="text-[14px] text-[#1B2128] font-semibold font-font text-nowrap">{item?.userId?.name || 'NA'}</h2>
                      <h4 className="text-[14px] font-font text-[#959595] text-nowrap">{item?.userId?.email || 'NA'}</h4>
                    </div>
                
                    </div>
                
                </td>
                <td className="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">{item?.userId?.gender || 'NA'}</td>
                <td className="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">{item?.planId?.premium_name}</td>
                <td className="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">{item?.paymentGetway}</td>
                <td className="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">{item?.payId}</td>
                <td className="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">{item?.paidAmount}</td>
                <td className="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">
                  <div className='bg-[#E9FFEF] text-[#409261]  text-sm font-medium me-2 w-[85px] h-[25px] py-0.5 rounded-full flex items-center justify-center gap-2 '>
                    <PiDotOutlineFill className='text-[40px]' />
                    <span>{item.paymentStatus}</span>
                  </div>
                </td>
                  <td className="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">{new Date(item.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    }).replace(',', '')}</td>
                  <td className="text-[14px] px-5 text-[#1B2128] font-font text-nowrap">
                    <button type="button" className="bg-red-500 font-font rounded-full px-5 py-1 text-white shadow-lg">Refund</button>
                  </td>
              </tr> 
  ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2 justify-center py-5">
          <button className="w-8 h-8 rounded text-sm bg-[#F9FAFC] border">01</button>
        </div>


        </div>

    </>
  )
}

export default Finance