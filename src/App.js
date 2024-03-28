import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Booking from './pages/Booking.jsx';
import Result from './pages/Result.jsx';

function App() {
  const [bookingData, setBookingData] = React.useState({});
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home bookingData={bookingData} setBookingData={setBookingData} />} />
        <Route path="/booking" element={<Booking  bookingData={bookingData} setBookingData={setBookingData}/>} />
        <Route path="/result" element={<Result  bookingData={bookingData} setBookingData={setBookingData}/>} />
      </Routes>
    </Router>
  );
}

export default App;
