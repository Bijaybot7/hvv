import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import ArtistProfile from './ArtistProfile';
import Home from './Home';
import MessageSection from './MessageSection';
import ArtistHome from './ArtistHome';
import Lesson from './Lesson';  // Import the Lesson component
import ArtistMessage from './ArtistMessage';
import AboutUs from './AboutUs';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/artisthome' element={<ArtistHome />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/artistprofile' element={<ArtistProfile />} />
        <Route path='/message-section' element={<MessageSection />} />
        <Route path='/artistmessage' element={<ArtistMessage />} />
        {/* Add the new route for the Lesson component */}
        <Route path='/lesson' element={<Lesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
