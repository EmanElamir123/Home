import { useState } from 'react';
import { Heart, Loader2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from './ui/toast';

type FavoriteState = 'idle' | 'loading' | 'success' | 'error';

interface FavoriteButtonProps {
  providerId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showToast?: boolean;
}

export function FavoriteButton({ 
  providerId, 
  size = 'md', 
  className = '',
  showToast = true
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const { addToast } = useToast();
  const [state, setState] = useState<FavoriteState>('idle');
  const [animationKey, setAnimationKey] = useState(0);
  const [lastError, setLastError] = useState<string>('');
  const [previousFavState, setPreviousFavState] = useState<boolean | null>(null);

  const isFav = isFavorite(providerId);

  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleToggle = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (state === 'loading') return;

    const wasRemoving = isFav;
    setPreviousFavState(isFav);
    setState('loading');
    setLastError('');

    const result = await toggleFavorite(providerId);

    if (result.success) {
      setState('success');
      setAnimationKey(prev => prev + 1);
      
      if (showToast) {
        addToast(
          wasRemoving ? 'Removed from favorites' : 'Added to favorites',
          'success'
        );
      }

      setTimeout(() => setState('idle'), 600);
    } else {
      setState('error');
      setLastError(result.error || 'Failed to update favorites');
      setAnimationKey(prev => prev + 1);
      
      if (showToast) {
        const errorMessage = wasRemoving 
          ? 'Failed to remove from favorites' 
          : result.error || 'Failed to add to favorites';
        
        addToast(
          errorMessage,
          'error',
          {
            action: {
              label: 'Retry',
              onClick: () => handleToggle()
            }
          }
        );
      }

      setTimeout(() => setState('idle'), 3000);
    }
  };

  const getAnimationClass = () => {
    if (state === 'success') return 'heart-bounce';
    if (state === 'error') return 'heart-shake';
    return '';
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleToggle}
        disabled={state === 'loading'}
        className={`
          favorite-heart 
          bg-white/90 
          backdrop-blur-sm 
          rounded-full 
          hover:bg-white 
          transition-all
          disabled:opacity-70
          disabled:cursor-not-allowed
          flex
          items-center
          justify-center
          relative
          ${sizeClasses[size]}
          ${className}
          ${getAnimationClass()}
        `}
        style={{ minWidth: '44px', minHeight: '44px' }}
        key={animationKey}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        title={state === 'error' ? 'Failed to add favorite — Tap to retry' : undefined}
      >
        {state === 'loading' ? (
          <Loader2 className={`${iconSizes[size]} text-[#4FC3F7] spinner`} />
        ) : (
          <Heart
            className={`
              ${iconSizes[size]} 
              transition-all
              ${
                isFav && state !== 'error'
                  ? 'fill-[#FF5252] text-[#FF5252]'
                  : 'text-[#B0BEC5]'
              }
            `}
          />
        )}

        {state === 'error' && (
          <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
            <AlertCircle className="w-3 h-3 text-white" />
          </div>
        )}
      </button>

      {state === 'error' && lastError && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50 pointer-events-none">
          {lastError}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
        </div>
      )}
    </div>
  );
}
