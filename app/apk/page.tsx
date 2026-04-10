'use client';
import BottomNav from '../../components/BottomNav';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

export default function APK() {
  const createAPK = () => {
    Swal.fire({
      title: '✅ APK Berhasil Dibuat',
      html: `Link download:<br><a href="#" class="text-indigo-600 underline">https://controlhub.app/apk/xxxxxxx.apk</a>`,
      icon: 'success',
      confirmButtonColor: '#6366f1'
    });
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
        <div className="px-6 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h1 className="text-2xl font-bold">APK Manager</h1>
        </div>

        <div className="p-6">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-white border rounded-3xl p-8">
            <h2 className="font-semibold mb-6 text-lg">Buat APK Baru</h2>
            <input type="text" placeholder="Masukan Foto (URL)" className="w-full py-4 px-5 border rounded-2xl mb-4" />
            <input type="text" placeholder="Nama APK" className="w-full py-4 px-5 border rounded-2xl mb-4" />
            <motion.button whileHover={{ scale: 1.03 }} onClick={createAPK} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold text-lg">CREATE APK</motion.button>
          </motion.div>

          <h2 className="font-semibold mt-10 mb-4 px-2">APK Ready to Use</h2>
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} className="flex justify-between items-center bg-white p-5 rounded-3xl border">
              <span className="font-medium">Game Pou Controller</span>
              <button className="text-indigo-600 text-sm font-medium">Download</button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="flex justify-between items-center bg-white p-5 rounded-3xl border">
              <span className="font-medium">Remote Control Full</span>
              <button className="text-indigo-600 text-sm font-medium">Download</button>
            </motion.div>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
