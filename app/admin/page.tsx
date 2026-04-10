'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Admin() {
  const [pin, setPin] = useState('');
  const [logged, setLogged] = useState(false);

  const checkPin = () => {
    if (pin === '658947') setLogged(true);
    else Swal.fire('PIN Salah!', '', 'error');
  };

  if (!logged) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold mb-8">HALAMAN ADMIN</h1>
          <input type="password" value={pin} onChange={e => setPin(e.target.value)} placeholder="Masukkan PIN" className="bg-white/10 border border-white/30 text-white px-8 py-5 rounded-3xl text-center text-3xl w-72" />
          <button onClick={checkPin} className="block mx-auto mt-8 px-12 py-5 bg-white text-gray-900 rounded-3xl font-bold text-xl">LOGIN ADMIN</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <button className="w-full py-4 bg-green-600 text-white rounded-3xl mb-6 text-lg">+ Buat Akun Baru</button>
      <p className="text-gray-400 text-center">List user akan muncul di sini (Firestore realtime)</p>
    </div>
  );
}
