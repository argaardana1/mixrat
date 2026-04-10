'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Gift, Youtube, Heart } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push('/');
      else setUser(u);
    });
    return () => unsub();
  }, [router]);

  return (
    <>
      <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">ControlHub</h1>
          </div>
          <div>
            <p className="text-sm text-gray-500">Halo,</p>
            <p className="font-semibold">{user?.email?.split('@')[0] || 'User'}</p>
          </div>
        </motion.div>

        <div className="px-4 mt-4">
          <Swiper modules={[Navigation, Autoplay]} autoplay={{ delay: 4000 }} navigation loop className="rounded-3xl overflow-hidden shadow-2xl">
            <SwiperSlide>
              <motion.div initial={{ scale: 0.95 }} whileInView={{ scale: 1 }} className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white flex items-center">
                <div>
                  <h2 className="text-3xl font-bold">Promo UK 16:9</h2>
                  <p className="mt-2">Akses permanen hanya Rp 299.000</p>
                </div>
              </motion.div>
            </SwiperSlide>
            <SwiperSlide>
              <motion.div initial={{ scale: 0.95 }} whileInView={{ scale: 1 }} className="h-48 bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white flex items-center">
                <div>
                  <h2 className="text-3xl font-bold">Diskon 50%</h2>
                  <p className="mt-2">Upgrade sekarang!</p>
                </div>
              </motion.div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="px-4 mt-8 grid grid-cols-3 gap-4">
          <motion.div whileHover={{ scale: 1.05 }} onClick={() => window.open('https://wa.me/6285890204192', '_blank')} className="card bg-white rounded-3xl p-6 text-center cursor-pointer shadow">
            <Gift className="mx-auto w-10 h-10 text-indigo-600" />
            <p className="mt-3 font-semibold text-sm">JOIN SALURAN</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} onClick={() => window.open('https://tiktok.com', '_blank')} className="card bg-white rounded-3xl p-6 text-center cursor-pointer shadow">
            <Youtube className="mx-auto w-10 h-10 text-pink-600" />
            <p className="mt-3 font-semibold text-sm">TIKTOK</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} onClick={() => Swal.fire('Terima kasih!', 'Donate via WA', 'success')} className="card bg-white rounded-3xl p-6 text-center cursor-pointer shadow">
            <Heart className="mx-auto w-10 h-10 text-red-500" />
            <p className="mt-3 font-semibold text-sm">DONATE</p>
          </motion.div>
        </div>

        <div className="px-4 mt-8">
          <h2 className="text-xl font-semibold px-2 mb-4">Perangkat Aktif</h2>
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => router.push('/perangkat')} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl font-medium text-lg shadow-lg">
            Lihat Semua Perangkat
          </motion.button>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
