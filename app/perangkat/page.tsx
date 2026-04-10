'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';
import { Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Perangkat() {
  const [devices, setDevices] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) router.push('/');
      else setUser(u);
    });
    return unsubAuth;
  }, [router]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'devices'), where('userId', '==', user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setDevices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user]);

  return (
    <>
      <div className="max-w-md mx-auto min-h-screen bg-white pb-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 text-white sticky top-0">
          <h1 className="text-2xl font-bold">Perangkat Terhubung</h1>
          <div className="flex justify-between mt-6 text-sm">
            <div>Total <span className="font-bold">{devices.length}</span></div>
            <div>Online <span className="text-green-300 font-bold">{devices.filter(d => d.status === 'online').length}</span></div>
            <div>Offline <span className="text-red-300 font-bold">{devices.filter(d => d.status === 'offline').length}</span></div>
          </div>
        </div>

        <div className="px-4 pt-6 space-y-4">
          {devices.map((dev, index) => (
            <motion.div
              key={dev.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push(`/panel/${dev.id}`)}
              className="card bg-white border rounded-3xl p-5 flex items-center gap-4 cursor-pointer shadow-md"
            >
              <Smartphone className="w-12 h-12 text-indigo-600" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">{dev.model || 'Realme RMX3939'}</p>
                    <p className="text-sm text-gray-500">Android 15 • Indonesia</p>
                    <p className="text-xs text-gray-400">IP: {dev.ip || '192.168.1.100'}</p>
                  </div>
                  <span className={`px-4 py-1 text-xs font-medium rounded-full ${dev.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {dev.status?.toUpperCase() || 'ONLINE'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          {devices.length === 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-400 py-10">
              Tunggu APK di-install... perangkat akan muncul otomatis
            </motion.p>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
