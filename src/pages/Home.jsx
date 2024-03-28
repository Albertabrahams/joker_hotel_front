import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  personCount: yup
    .number()
    .typeError('Lütfen bir sayı girin')
    .positive('Kişi sayısı pozitif olmalı')
    .integer('Tam sayı girin')
    .max(15, 'En fazla 15 kişi katılabilir')
    .required('Bu alan zorunludur'),
  startDate: yup
    .date()
    .typeError('Lütfen geçerli bir tarih girin')
    .min(new Date(), 'Başlangıç tarihi bugünden küçük olamaz')
    .max(yup.ref('endDate'), 'Başlangıç tarihi bitiş tarihinden büyük olamaz')
    .required('Bu alan zorunludur'),
  endDate: yup
    .date()
    .typeError('Lütfen geçerli bir tarih girin')
    .min(yup.ref('startDate'), 'Bitiş tarihi başlangıç tarihinden küçük olamaz')
    .min(new Date(), 'Bitiş tarihi bugünden küçük olamaz')
    .required('Bu alan zorunludur'),
});

function Home({ setBookingData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formattedStartDate = new Date(data.startDate).toISOString().split('T')[0];
      const formattedEndDate = new Date(data.endDate).toISOString().split('T')[0];

      const response = await axios.get(`https://hotel-backend-aed0e92deeca.herokuapp.com/rooms/Room/?start_date=${formattedStartDate}&end_date=${formattedEndDate}&attendees=${data.personCount}`);
      console.log(response.data);

      setBookingData({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        personCount: data.personCount,
        rooms: response.data,
      });


      navigate('/booking');
    } catch (error) {
      console.error(error);
      alert( "Uygun oda bulunmamaktadır. Lütfen tarih aralığını ve kişi sayısını kontrol ediniz.");
    }
  };



  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-8 space-y-4 w-80  z-10">
        <label htmlFor="startDate" className="block text-gray-700">Başlangıç Tarihi</label>
        <input
          {...register('startDate')}
          type="date"
          className="border rounded-lg px-3 py-2 w-full "
          id="startDate"
        />
        {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}

        <label htmlFor="endDate" className="block text-gray-700">Bitiş Tarihi</label>
        <input
          {...register('endDate')}
          type="date"
          className="border rounded-lg px-3 py-2 w-full"
          id="endDate"
        />
        {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}

        <label htmlFor="personCount" className="block text-gray-700">Kişi Sayısı</label>
        <input
          {...register('personCount')}
          type="number"
          className="border rounded-lg px-3 py-2 w-full"
          id="personCount"
          placeholder="Kişi Sayısı"
        />
        {errors.personCount && <p className="text-red-500">{errors.personCount.message}</p>}
        <div className="flex justify-end ">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Gönder
        </button>
        </div>
      </form>

      <img src="/images/hotel.jpg" alt="Arka Plan Resmi" className="object-cover fixed top-0 left-0 w-screen h-screen z-0" />
    </div>
  );
}

export default Home;
