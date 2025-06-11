import React, { useEffect, useState } from 'react'
import { FaUsers } from "react-icons/fa";
import { PiMedalFill } from "react-icons/pi";
import { MdBlockFlipped } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import ReactApexChart from 'react-apexcharts'
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import axios from 'axios'
import BaseUrl from '../../Util/BaseUrl';

const Dashboard = () => {
  const [state] = React.useState({

    series: [{
      name: 'Active',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false
        }

      },
      dataLabels: {
        enabled: false
      },
      colors: ['#33ff36'],
      xaxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        tooltip: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
      },
      yaxis: {
        show: false
      },
      grid: {
        show: false
      },
    },
  });

  const [state2] = React.useState({

    series: [{
      name: 'Flash',
      data: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    }, {
      name: 'Summer special',
      data: [1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, {
      name: 'Monthly',
      data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, {
      name: 'Holi special',
      data: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
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
      colors: ['#0096FF', '#33ff36', '#FFBF00', '#FF0000'],
      stroke: {
        curve: 'smooth'
      },

      xaxis: {
        categories: ["jan", "feb", "march", "april", "may", "june", "july", "Aug", "spt", "oct", "nav", "Dec"],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
      },
      yaxis: {
        max: 2
      },
      legend: {
        show: true,
        position: 'top',
        offsetX: 100,
        offsetY: 0,
      }
    },
  });

  const [counters, setcounters] = useState([])
  const [Activity, setActivity] = useState([])
  const [gender, setgender] = useState({})
  const [like, setlike] = useState([])
  const [plan, setplan] = useState([])

  const handleTotlaCount = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/api/admin/dashbord/total`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (result.data) {
        setcounters([
          {
            title: "Total Users",
            icon: FaUsers,
            count: result.data.data.totalUser,
            colorcode: "#3d8bfd",
            bgcolorcode: "#f5f9ff"
          },
          {
            title: "Premium Users",
            icon: PiMedalFill,
            count: result.data.data.totalUserPreimum,
            colorcode: "#ffcd39",
            bgcolorcode: "#f5f9ff"
          },
          {
            title: "Blocked Users",
            icon: MdBlockFlipped,
            count: result.data.data.blockUser,
            colorcode: "#e35d6a",
            bgcolorcode: "#f5f9ff"
          },
          {
            title: "Admin Earning",
            icon: GiWallet,
            count: result.data.data.adminEarning,
            colorcode: "#479f76",
            bgcolorcode: "#f5f9ff"
          }
        ])
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    handleTotlaCount()
  }, [])

  const handledata = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/api/admin/activity/data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setActivity(result.data.data.Activity)
      setgender(result.data.data.GenderChart)
      setlike(result.data.data.Likers)



    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    handledata()
  }, [])

  const handleplan = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/api/admin/popular/plan`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setplan(result.data.data)
      console.log(plan, "---------")

    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    handleplan()
  }, [])

  return (
    <>

      <div className='pt-10 px-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-x-10'>
          {counters.map((item, index) => (
            <div key={index} className='flex items-center justify-between px-8 lg:px-5 xl:w-full h-[110px] border-[1px] border-[#9096a233] rounded-xl'>
              <div className='font-uifontfamily'>
                <div className='text-uicolor-0 text-[14px] font-medium text-center'>{item.title}</div>
                <h1 className='text-[32px] font-medium'>{item.count}</h1>
              </div>
              <span style={{ backgroundColor: item.bgcolorcode }} className='flex items-center justify-center h-[50px] w-[50px]  rounded-full'><item.icon color={item.colorcode} className='text-[35px]' /></span>
            </div>
          ))}
        </div>
        <div className='xl:grid grid-cols-3 gap-10 pt-10'>
          <div className='h-[481px] w-full border-[1px] border-[#9096A2]/20 rounded-xl col-span-2 overflow-x-auto'>
            <div className='w-[800px] xxl:w-full'>
              <div className="flex justify-between pt-6 px-10">
                <h1 className="text-[#2B3674] font-bold font-uifontfamily text-[16px]">Active Users</h1>
                <div className="flex gap-10">
                  <button className="bg-[#F4F4F5] border-[1px] w-[36px] h-[30px] rounded-lg text-black  text-[14px] font-medium font-uifontfamily">1M</button>
                  <button className="text-[#70707A]  text-[14px] font-medium font-uifontfamily">3M</button>
                  <button className="text-[#70707A]  text-[14px] font-medium font-uifontfamily">6M</button>
                  <button className="text-[#70707A]  text-[14px] font-medium font-uifontfamily">1Y</button>
                </div>
              </div>
              <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="area" height={418} />
              </div>
              <div id="html-dist"></div>

            </div>
          </div>

          <div className='h-[481px] w-full border-[1px] border-[#9096A2]/20 rounded-xl px-5 pt-5 overflow-y-scroll mt-10 lg:mt-0'>
            <div className='flex items-center justify-between'>
              <h4 className="text-[#2B3674] font-uifontfamily font-bold text-[16px]">Recent Activity</h4>
            </div>
            {Activity.map((item, index) => (
              <div key={index} className="flex gap-5 pt-5">
                <img src={item?.userId?.profile} className="w-[48px] h-[48px] rounded-full object-cover" />
                <div>
                  <h4 className="text-[16px] font-medium font-uifontfamily text-[#0A112F]"> {item?.userId?.name || 'No'} has been {item?.status}</h4>
                  <h4 className="text-[14px] font-uifontfamily text-uiColor">{item.createdAt}</h4>
                </div></div>
            ))}

          </div>

        </div>
        <div className='xl:grid grid-cols-3 gap-10 pt-10'>
          <div className='h-[481px] w-full border-[1px] border-[#9096A2]/20 rounded-xl'>
            <h1 className="text-[16px] font-bold text-[#2B3674] px-5 py-5">Gender Chart</h1>
            <div className='h-[140px] overflow-hidden flex justify-center pt-2 my-10'>
              <div className='w-[250px] h-[250px] border-[20px] border-t-[#6165E9] border-l-[#6165E9] border-r-[#ff62b8] border-b-[#ff62b8] rounded-full relative transition-all duration-300 ease-in-out rotate-[-22deg]'>
                <div className='absolute top-[4px] left-[166px] w-[30px] h-[30px] border-[3px] border-white rounded-full bg-[#6165E9]'>
                </div>
              </div>
            </div>
            <div className='flex justify-around items-center shadow-xl h-[75px] mx-10 rounded-lg mt-20'>
              <div className='flex items-center gap-2 leading-5'>
                <FaMale className='w-[12px] h-[26px] text-[#6165E9]' />
                <h2 className="text-[12px] font-medium text-[#A3AED0] font-uifontfamily">Male<br />
                  <span className="text-[18px] font-bold text-[#2B3674]">{gender?.maleRounded}%</span>
                </h2>
              </div>
              <div className='flex items-center gap-2 leading-5'>
                <FaFemale className='w-[12px] h-[26px] text-[#ff62b8]' />
                <h2 className="text-[12px] font-medium text-[#A3AED0] font-uifontfamily">Female<br />
                  <span className="text-[18px] font-bold text-[#2B3674]">{gender?.femaleRounded}%</span>
                </h2>
              </div>
            </div>
          </div>

          <div className='h-[481px] w-full border-[1px] border-[#9096A2]/20 rounded-xl col-span-2 overflow-x-auto lg:overflow-hidden mt-10 lg:mt-0'>
            <div className='py-3 w-[800px] xxl:w-full'>
              <h1 className="text-[#2B3674] font-bold font-uifontfamily text-[16px] translate-x-5 translate-y-5">Subscription Plan</h1>
              <div id="">
                <ReactApexChart options={state2.options} series={state2.series} type="line" height={410} />
              </div>
              <div id="html-dist">
              </div>
            </div>
          </div>


        </div>
        <div className='xxl:grid grid-cols-4 gap-10 py-10'>
          <div className="h-[400px] w-full border-[1px] border-[#9096A2]/20 rounded-xl px-5 py-5 overflow-y-scroll">
            <div className="flex items-center justify-between">
              <h4 className="text-[#2B3674] font-uifontfamily font-bold text-[16px]">Top Likes</h4>
              <h4 className="text-[#6165E9] font-uifontfamily font-medium text-[14px]">Likes</h4>
            </div>
            <div className="flex items-center gap-5 pt-5">
              {like.map((item, index) => (
                <>
                  <img src={item.profile} className="w-[55px] h-[45px] rounded-full object-cover" />
                  <div className="flex justify-between w-full">
                    <h4 className="text-[16px] font-medium font-uifontfamily text-[#0A112F]">{item.name}</h4>
                    <h4 className="text-[16px] font-medium font-uifontfamily text-[#0A112F] pr-2">{item.TotalLikes}</h4>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className='h-full lg:h-[400px] w-full border-[1px] border-[#9096A2]/20 rounded-xl col-span-3 mt-10 lg:mt-0'>
            <div className="flex justify-between px-5 py-5">
              <h2 className="text-[#2B3674] font-bold font-uifontfamily text-[18px]">Top Countries</h2>
              <select name="countryTime" class="bg-[#F4F7FF] h-[30px] text-[#64748B] w-[100px] font-uifontfamily rounded-md focus:outline-none">
                <option value="year">Year</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
            <div className='xl:flex items-start  w-full px-5'>
              <div className='m-0 p-0'>
                <div className='w-[340px] h-[250px] sm:w-[500px] sm:h-[280px] mx-auto'></div>
              </div>
              <div className="w-full h-[300px] overflow-y-scroll pt-5" >
                <div className="grid grid-cols-2 py-2">
                  <div className="flex items-center gap-2">
                    <img className="w-[25px] h-[25px] m-0 p-0" src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AU.svg" />
                    <h2 className="font-medium text-[16px] font-uifontfamily text-nowrap">Australia</h2>
                  </div>
                  <div className="w-full h-[20px] bg-[#E5E7EB] rounded-[3px]">
                    <div className="h-[20px] bg-[#6165E9] rounded-[3px]  w-[50%]">
                      <h2 className="text-white text-center font-uifontfamily text-[13px]">25%</h2>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 py-2"><div className="flex items-center gap-2">
                  <img className="w-[25px] h-[25px] m-0 p-0" src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg" />
                  <h2 className="font-medium text-[16px] font-uifontfamily text-nowrap">United States</h2>
                </div><div className="w-full h-[20px] bg-[#E5E7EB] rounded-[3px] ">
                    <div className="h-[20px] bg-[#6165E9] rounded-[3px]  w-[50%]" >
                      <h2 className="text-white text-center font-uifontfamily text-[13px]">25%</h2>
                    </div></div></div>
                <div className="grid grid-cols-2 py-2"><div className="flex items-center gap-2">
                  <img className="w-[25px] h-[25px] m-0 p-0" src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NZ.svg" />
                  <h2 className="font-medium text-[16px] font-uifontfamily text-nowrap">New zealand</h2>
                </div>
                  <div className="w-full h-[20px] bg-[#E5E7EB] rounded-[3px]">
                    <div className="h-[20px] bg-[#6165E9] rounded-[3px]  w-[50%]">
                      <h2 className="text-white text-center font-uifontfamily text-[13px]">25%</h2>
                    </div></div></div>
                <div className="grid grid-cols-2 py-2">
                  <div className="flex items-center gap-2">
                    <img className="w-[25px] h-[25px] m-0 p-0" src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg" />
                    <h2 className="font-medium text-[16px] font-uifontfamily text-nowrap">India</h2>
                  </div>
                  <div className="w-full h-[20px] bg-[#E5E7EB] rounded-[3px]">
                    <div className="h-[20px] bg-[#6165E9] rounded-[3px] w-[50%]">
                      <h2 className="text-white text-center font-uifontfamily text-[13px]">50%</h2>
                    </div></div></div>
              </div>
            </div>
          </div>

        </div>

      </div>





    </>
  )
}

export default Dashboard