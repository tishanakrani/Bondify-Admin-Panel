import React, { useEffect, useState } from 'react';
import { GrEdit } from "react-icons/gr";
import { LuTrash2 } from "react-icons/lu";
import axios from 'axios';
import BaseUrl from '../../Util/BaseUrl';
import { toast } from 'react-toastify';

const Avatar = () => {
  const [avatar, setAvatar] = useState([]);
  const [showAddAvatar, setShowAddAvatar] = useState(false);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("Clothes");
  const [primum, setPrimum] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handledata = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/api/admin/fetch/avtar`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAvatar(result?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSaveAvatar = async () => {
    if (!image && !editMode) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    if (image) formData.append('avtarId', image);
    formData.append('name', category);
    formData.append('primum', primum);

    try {
      if (editMode) {

        await axios.put(`${BaseUrl}/api/admin/update/avtar/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Avatar updated successfully');
      } else {

        await axios.post(`${BaseUrl}/api/admin/add/avtar`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Avatar added successfully');
      }

      setShowAddAvatar(false);
      setImage(null);
      setCategory("Clothes");
      setPrimum(false);
      setEditMode(false);
      setEditId(null);
      handledata();
    } catch (error) {
      console.error("Save failed:", error.response?.data || error.message);
      toast.error('Failed to save avatar');
    }
  };
 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/api/admin/remove/avtar/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Avatar deleted successfully');
      handledata();
    } catch (error) {
      toast.error('Failed to delete avatar');
      console.error(error.message);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditId(item._id);
    setCategory(item.name);
    setPrimum(item.primum);
    setImage(null); 
    setShowAddAvatar(true);
  };

  useEffect(() => {
    handledata();
  }, []);

  return (
    <>
      <div className='px-5 py-5'>
        <div className='flex justify-end gap-2 pt-2 pb-16'>
          <button
            onClick={() => {
              setShowAddAvatar(true);
              setEditMode(false);
              setEditId(null);
              setImage(null);
              setCategory("Clothes");
              setPrimum(false);
            }}
            className='justify-center px-5 rounded-full flex items-center w-[170px] h-[48px] bg-[#6165E9] text-white font-font'
          >
            Add Avatar
          </button>
        </div>

        <div className='flex justify-center gap-4 pb-10 items-center'>
          {["Clothes", "Hat", "Glasses", "Hair", "Beard", "Face"].map(type => (
            <button key={type} type="button" className="border-[1px] border-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white px-4 py-2 rounded-md font-font">
              {type}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
          {avatar.map((item, index) => (
            <div key={index} className='relative backdrop-blur-md rounded-3xl p-6 shadow-lg bg-[#6165E9] text-white flex flex-col items-center w-[220px] h-[300px] transition-transform hover:scale-105'>
              <div className='absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-[9px] font-semibold font-uifontfamily px-2 py-1 rounded-full shadow-md flex items-center gap-1'>
                <span>⭐</span> {item.primum ? "Yes" : "No"}
              </div>
              <div className='bg-white rounded-full p-3 mb-4 w-[90px] h-[90px] flex items-center justify-center shadow-md'>
                <img className='w-[70px] h-[70px] object-contain' src={item.svgData} alt="avatar" />
              </div>
              <h3 className="text-lg font-font">{item.name}</h3>
              <p className="text-xs px-3 py-1 rounded-full mt-2 mb-4">
                {new Date(item.createdAt).toDateString().slice(4)}
              </p>
              <div className='flex gap-6 mt-auto'>
                <button
                  onClick={() => handleEdit(item)}
                  className='bg-white/20 hover:bg-blue-500/40 p-2 rounded-full backdrop-blur-md transition'
                >
                  <GrEdit className='text-[24px]' />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className='bg-white/20 hover:bg-red-500/40 p-2 rounded-full backdrop-blur-md transition'
                >
                  <LuTrash2 className='text-[24px]' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddAvatar && (  
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className='bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg'>
            <button onClick={() => setShowAddAvatar(false)} className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg'>✕</button>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{editMode ? "Edit Avatar" : "Add Avatar"}</h2>

            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Avatar Image</label>
              <div className='flex items-center justify-between border border-[#6165E9] rounded-lg px-4 py-2 bg-gray-50'>
                <span className="text-sm text-gray-600">{image?.name || (editMode ? "Keep existing image or upload new" : "Upload Image")}</span>
                <input
                  id="avatarImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="avatarImage" className="bg-[#6165E9] text-white text-sm px-4 py-1.5 rounded-md cursor-pointer hover:bg-indigo-600 transition-all">Upload</label>
              </div>
            </div>

            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="avtar">Select Avatar Type</label>
              <select
                id="avtar"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg w-full h-[40px] text-gray-700 focus:outline-none border font-font"
              >
                <option value="Clothes">Clothes</option>
                <option value="Hat">Hat</option>
                <option value="Glasses">Glasses</option>
                <option value="Hair">Hair</option>
                <option value="Beard">Beard</option>
                <option value="Face">Face</option>
              </select>
            </div>

            <div className="flex gap-2 mb-4 items-center">
              <input
                id='primum'
                type="checkbox"
                checked={primum}
                onChange={(e) => setPrimum(e.target.checked)}
                className='h-[16px] w-[16px] cursor-pointer rounded border border-slate-300 text-[#6165E9] focus:ring-0'
              />
              <label htmlFor="primum" className="text-sm text-gray-700 font-medium">Premium</label>
            </div>

            <div className='flex justify-between items-center mt-4'>
              <button onClick={() => setShowAddAvatar(false)} className="text-sm text-gray-500 hover:underline">Cancel</button>
              <button onClick={handleSaveAvatar} className="bg-[#6165E9] text-white px-5 py-2 rounded-full text-sm font-medium">
                {editMode ? "Update Avatar" : "Save Avatar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Avatar;
