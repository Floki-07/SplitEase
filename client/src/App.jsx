import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, useLocation, BrowserRouter as Router } from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Groups from './pages/Groups'

import Landing from './pages/Landing'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import Moneyflow from './pages/Moneyflow'
import { Settings } from 'lucide-react'
import SettingsPage from './pages/SettingsPage'
import Analytics from './pages/Analytics'
import SavingsGoals from './pages/SavingGoals'
import Error from './pages/Error'
import Split from './pages/Split'
import FriendSplit from './pages/FriendSplit'
import GroupSplit from './pages/GroupSplit'
import BillSplit from './pages/BillSplit'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import AuthHOC from './hooks/AuthHox'
import Dashboard from './pages/Dashboard'
import Settle from './pages/Settle'
const AppLayout = () => {
  const [isLanding, setIsLanding] = useState(true)
  const location = useLocation()


  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login') {
      setIsLanding(true)
    } else {
      setIsLanding(false)
    }
  }, [location.pathname])


  // Global States
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('AvatarUrl') || null ); // Fallback avatar
 
  
  if (avatarUrl == null) {
    setAvatarUrl('/images/Profile.jpg')
  }
  const [user, setUser] = useState('');


  return (
    <div className='bg-[--background  ] h-screen text-[--primary]'>
      <Navbar isLanding={isLanding} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl}/>
      <div className='flex h-[calc(100%-60px)] custom-scrollbar'>
        <SideBar isLanding={isLanding} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/home" element={<AuthHOC><Home /></AuthHOC>} /> */}
          <Route path="/home" element={<Home avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl}  />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settle" element={<AuthHOC><Settle /></AuthHOC>} />
          <Route path="/analytics" element={<AuthHOC><Analytics /></AuthHOC>} />
          <Route path="/groups" element={<AuthHOC><Groups /></AuthHOC>} />
          <Route path="/split" element={<AuthHOC><Split /></AuthHOC>} />
          <Route path="/split/friendsplit" element={<AuthHOC><FriendSplit /></AuthHOC>} />
          <Route path="/split/groupsplit" element={<AuthHOC><GroupSplit /></AuthHOC>} />
          <Route path="/split/billsplit/:id" element={<AuthHOC><BillSplit /></AuthHOC>} />
          <Route path="/moneyflow" element={<AuthHOC><Moneyflow user={user} setUser={setUser} /></AuthHOC>} />
          <Route path="/savings" element={<AuthHOC><SavingsGoals /></AuthHOC>} />
          <Route path="/settings" element={<AuthHOC><SettingsPage /></AuthHOC>} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  )
}




function App() {
  return (
    
      <Router>
        <AppLayout />
      </Router>
  
  );
}
export default App
