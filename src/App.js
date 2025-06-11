import './App.css';
import MainLayout from './Components/Pages/Layout/MainLayout';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import User from './Components/Pages/User/User';
import Plans from './Components/Pages/Plans/Plans';
import Feedback from './Components/Pages/Feedback/Feedback';
import Interest from './Components/Pages/Interest/Interest';
import Avatar from './Components/Pages/Avatar/Avatar';
import Finance from './Components/Pages/Finance/Finance';
import { ToastContainer } from 'react-toastify'
import Login from './Components/Pages/Login/Login';
import AddPlans from './Components/Pages/Plans/AddPlans';


function App() {
  return (
    <>
      <ToastContainer position='top-right' />
      <Routes>

        <Route path='/' element={
          <Login />
        } />

        <Route path='/Dashboard' element={
          <privateRoute>
              <MainLayout>
               <Dashboard />
              </MainLayout>
          </privateRoute>
        
        } />

        <Route path='/User' element={
          <privateRoute>
             <MainLayout>
              <User />
             </MainLayout>
          </privateRoute>
        } />

        <Route path='/Plans' element={
          <privateRoute>
          <MainLayout>
            <Plans />
          </MainLayout>
          </privateRoute>
        } />

        
        <Route path='/AddPlans' element={
          <privateRoute>
          <MainLayout>
            <AddPlans />
          </MainLayout>
          </privateRoute>
        } />

        <Route path='/Feedback' element={
          <privateRoute>
            <MainLayout>
              <Feedback />
            </MainLayout>
          </privateRoute>
          
        } />

        <Route path='/Interest' element={
          <privateRoute>
           <MainLayout>
            <Interest />
            </MainLayout>
          </privateRoute>
        } />

        <Route path='/Avatar' element={
          <privateRoute>
            <MainLayout>
               <Avatar />
            </MainLayout>
          </privateRoute>
        } />

        <Route path='/Finance' element={
          <privateRoute>
            <MainLayout>
             <Finance />
            </MainLayout>
          </privateRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
