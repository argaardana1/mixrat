'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { Phone, Mail, Lock } from 'lucide-react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch {
      Swal.fire({ icon: 'error', title: 'Login Gagal', text: 'Email atau password salah', confirmButtonColor: '#6366f1' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="mx-auto w-28 h-28 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <Phone className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl font-bold mt-6 text-gray-800">ControlHub</h1>
          <p className="text-indigo-600 mt-1">Remote Control Premium</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none" placeholder="nama@email.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none" placeholder="••••••••" required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl text-lg hover:brightness-110 transition">
              {loading ? 'Sedang masuk...' : 'Login'}
            </button>
          </form>
          <p className="text-center mt-8 text-gray-600">
            Tidak punya akun?{' '}
            <span onClick={() => window.open('https://wa.me/6285890204192', '_blank')} className="text-indigo-600 font-semibold cursor-pointer hover:underline">
              Klik di sini (WA Admin)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
