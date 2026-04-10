'use client';
import Link from "next/link";
import { Home, Smartphone, Package, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 border-t border-gray-200 shadow-2xl z-50 max-w-md mx-auto backdrop-blur-lg">
      <div className="grid grid-cols-4 py-2">
        <Link href="/dashboard" className={`flex flex-col items-center ${pathname.includes('dashboard') ? 'text-indigo-600' : 'text-gray-500'}`}>
          <Home className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">HOME</span>
        </Link>
        <Link href="/perangkat" className={`flex flex-col items-center ${pathname.includes('perangkat') ? 'text-indigo-600' : 'text-gray-500'}`}>
          <Smartphone className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">PERANGKAT</span>
        </Link>
        <Link href="/apk" className={`flex flex-col items-center ${pathname.includes('apk') ? 'text-indigo-600' : 'text-gray-500'}`}>
          <Package className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">APK</span>
        </Link>
        <Link href="/profile" className={`flex flex-col items-center ${pathname.includes('profile') ? 'text-indigo-600' : 'text-gray-500'}`}>
          <User className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">PROFIL</span>
        </Link>
      </div>
    </div>
  );
}
