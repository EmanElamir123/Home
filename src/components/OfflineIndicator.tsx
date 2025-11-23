import { useApp } from '../context/AppContext';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const { isOnline } = useApp();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 z-50 animate-slide-in-down">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm md:text-base">
        <WifiOff className="w-4 h-4" />
        <span>You are offline — favorites will sync when online</span>
      </div>
    </div>
  );
}
