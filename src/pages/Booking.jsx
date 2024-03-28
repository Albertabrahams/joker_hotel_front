import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const schema = yup.object().shape({
  name: yup.string().required('İsim zorunludur'),
  surname: yup.string().required('Soyisim zorunludur'),
  email: yup.string().email('Geçersiz email').required('Email zorunludur'),
  phone: yup.string().required('Telefon zorunludur'),
  trin: yup.string()
  .required('TC Kimlik Numarası Zorunludur')
  .length(11, 'TC Kimlik Numarası Tam 11 Haneli Olmalıdır')
  .matches(/^[0-9]+$/, 'Geçersiz TC Kimlik Numarası'),
  selectedRooms: yup.array().min(1, 'En az bir oda seçilmelidir')
});

function Booking({ setBookingData, bookingData }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema)
    });

    const [selectedRooms, setSelectedRooms] = useState([]);

    const handleRoomSelect = (roomId) => {
      if (selectedRooms.includes(roomId)) {
        setSelectedRooms(selectedRooms.filter(id => id !== roomId));
      } else {
        setSelectedRooms([...selectedRooms, roomId]);
      }
    };
    
  const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
           await axios.post('https://hotel-backend-aed0e92deeca.herokuapp.com/bookings/booking/', {
            trin: data.trin, 
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            email: data.email,
            attendees: bookingData?.personCount,
            start_date: bookingData?.startDate,
            end_date: bookingData?.endDate,
            room: selectedRooms,
          });
    
            setBookingData({
                ...bookingData,
                ...data,
                selectedRooms: selectedRooms,
                });
            navigate('/result');
        
        } catch (error) {
          console.error('Booking error:', error);
          alert('Rezervasyon sırasında bir hata oluştu. Lütfen tekrar deneyin.')
        }
      };
      const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: false,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  
    return (
      <div className="flex justify-center items-center min-h-screen " style={{backgroundImage: `url('/images/background.png')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="bg-white rounded-lg p-8 space-y-4 w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-center text-3xl text-blue-500 font-semibold">JOKER HOTELE HOŞGELDİNİZ</h1>
        <h1 class="text-center text-3xl text-blue-500 font-semibold">Rezervasyon Formu</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div >
            <Slider {...settings}>
              {bookingData?.rooms?.map(room => (
                <div key={room.id} className={`border rounded-lg p-4 cursor-pointer ${selectedRooms.includes(room.id) ? 'border-blue-500 border-2' : 'border-gray-300'}`} onClick={() => handleRoomSelect(room.id)}>
                  <img src={`/images/${room.view}.jpg`} alt={room.view} className="rounded-lg" style={{ width: '100%', height: 'auto' }} />
                  <h4>Oda {room.id}</h4>
                  <p>Kapasite: {room.size}</p>
                  <p>Fiyat: ${room.price}</p>
                  <p>Manzara: {room.view === "sea" ? "Deniz" : "Orman"}</p>
                  <input type="checkbox" className="hidden" checked={selectedRooms.includes(room.id)} />
                </div>
              ))}
            </Slider>
            </div>
            {errors.selectedRooms && <p className="text-red-500">{errors.selectedRooms.message}</p>}

            {selectedRooms.length > 0 && (
                <p>
                    Seçilen Odalar: {selectedRooms.sort((a, b) => a - b).join(', ')}
                </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className='flex flex-col'> <input type="text" className="border rounded-lg px-3 py-2 w-full" {...register('name')} placeholder="İsim" />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>} </div>
              <div className='flex flex-col'>  <input type="text" className="border rounded-lg px-3 py-2 w-full" {...register('surname')} placeholder="Soyisim" />
              {errors.surname && <p className="text-red-500">{errors.surname.message}</p>}</div>
              <div className='flex flex-col'> <input type="email" className="border rounded-lg px-3 py-2 w-full" {...register('email')} placeholder="Email" />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>} </div>
              <div className='flex flex-col'>  <input type="text" className="border rounded-lg px-3 py-2 w-full" {...register('phone')} placeholder="Telefon" />
                
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>} </div>
              <input type="text" className="border rounded-lg px-3 py-2 w-full" {...register('trin')} placeholder="TC Kimlik Numarası" />
              
            {errors.trin && <p className="text-red-500">{errors.trin.message}</p>}
            </div>
           
            
          
            
           
            
            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400  ">Şimdi Rezerve Et</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default Booking;
  