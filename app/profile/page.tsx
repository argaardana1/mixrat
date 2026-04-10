'use client';
import BottomNav from '../../components/BottomNav';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

export default function Profile() {
  return (
    <>
      <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
        <div className="px-6 py-8 text-center">
          <motion.div whileHover={{ scale: 1.1 }} className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center text-5xl text-white">👤</motion.div>
          <h1 className="text-2xl font-bold mt-4">Ragz</h1>
          <p className="text-indigo-600">@ragz_control</p>
        </div>

        <div className="px-6 space-y-6">
          <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-3xl p-6">
            <label className="text-sm block mb-2">Nama Lengkap</label>
            <input className="w-full border rounded-2xl px-5 py-4" defaultValue="Ragz" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-3xl p-6">
            <label className="text-sm block mb-2">Username</label>
            <input className="w-full border rounded-2xl px-5 py-4" defaultValue="@ragz_control" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-3xl p-6">
            <label className="text-sm block mb-2">WA</label>
            <input className="w-full border rounded-2xl px-5 py-4" defaultValue="085890204192" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-3xl p-6">
            <label className="text-sm block mb-2">Status Akun</label>
            <div className="px-5 py-4 bg-green-100 text-green-700 rounded-2xl font-semibold">PERMANEN</div>
          </motion.div>

          <motion.button whileHover={{ scale: 1.03 }} onClick={() => Swal.fire('Tersimpan!', 'Profil berhasil diperbarui', 'success')} className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl font-semibold">SIMPAN PERUBAHAN</motion.button>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
