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
import SideBar from './components/Sidebar'
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
const AppLayout = () => {
  const [isLanding, setIsLanding] = useState(false)
  const location = useLocation()


  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login') {
      setIsLanding(true)
    } else {
      setIsLanding(false)
    }
  }, [location.pathname])


  // Global States
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('AvatarUrl')); // Fallback avatar
 
  
  if (avatarUrl == null) {
    setAvatarUrl('/images/Profile.jpg')
  }
  const [user, setUser] = useState(null);


  return (
    <div className='bg-[--background  ] h-screen text-[--primary]'>
      <Navbar isLanding={isLanding} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} user={user} />
      <div className='flex h-[calc(100%-60px)] custom-scrollbar'>
        <SideBar isLanding={isLanding} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUpGoogleWrapper />} />
          <Route path="/login" element={<LoginGoogleWrapper />} />
          {/* <Route path="/home" element={<AuthHOC><Home /></AuthHOC>} /> */}
          <Route path="/home" element={<Home avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} user={user} setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard />} />
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




const SignUpGoogleWrapper = () => {
  return <GoogleOAuthProvider clientId="429032797665-vjlut1lkn6g4o05gqgdnnp1rs5m2t68k.apps.googleusercontent.com">
    <Signup />
  </GoogleOAuthProvider>
}
const LoginGoogleWrapper = () => {
  return <GoogleOAuthProvider clientId="429032797665-vjlut1lkn6g4o05gqgdnnp1rs5m2t68k.apps.googleusercontent.com">
    <Login />
  </GoogleOAuthProvider>
}
function App() {

  return (
    <>
      <Router>
        <AppLayout />
      </Router>
    </>
  )
}

export default App
