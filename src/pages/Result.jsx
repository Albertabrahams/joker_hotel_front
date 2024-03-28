import React from 'react';
import { Link } from 'react-router-dom';

function Result({ bookingData }) {
   
  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundImage: `url('/images/hotel.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white rounded-lg p-8 space-y-4 w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-center text-3xl text-blue-500 font-semibold">Rezervasyon Başarılı!</h1>
        <p className="text-center text-lg text-gray-600">Bizi tercih ettiğiniz için teşekkür ederiz. Rezervasyon bilgileriniz aşağıdadır:</p>
        <div className="space-y-4">
          <p>Ad Soyad: {bookingData.name} {bookingData.surname}</p>
          <p>TC Kimlik Numarası: {bookingData.trin}</p>
          <p>Telefon: {bookingData.phone}</p>
          <p>Email: {bookingData.email}</p>
          <p>Giriş Tarihi: {bookingData.startDate}</p>
          <p>Çıkış Tarihi: {bookingData.endDate}</p>
          <p>Odalar: {bookingData.selectedRooms.join(', ')}</p>
        </div>
        <div className="flex justify-center">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">Yeni Rezervasyon Yap</Link>
        </div>
      </div>
    </div>
  );
}

export default Result;
