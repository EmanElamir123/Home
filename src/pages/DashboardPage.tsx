import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { LayoutDashboard, Bell, MessageSquare, Settings, Star, Calendar, Heart } from 'lucide-react';
import { FavoriteButton } from '../components/FavoriteButton';
import { useState } from 'react';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, reminders, providers, favorites, toggleFavorite } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    navigate('/login');
    return null;
  }

  // Get user's reviews (simulated from localStorage)
  const userReviews = providers
    .flatMap(provider => 
      (provider.reviews || []).map(review => ({
        ...review,
        providerName: provider.name,
        serviceType: provider.serviceType
      }))
    )
    .slice(0, 5);

  // Get actual favorite providers
  const favoriteProviders = providers.filter(p => favorites.includes(p.id));

  const upcomingReminders = reminders
    .filter(r => new Date(r.date + ' ' + r.time) >= new Date())
    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
    .slice(0, 3);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-[#FFB300] text-[#FFB300]' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r min-h-screen p-6 sticky top-0">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:scale-[1.02] ${
                activeTab === 'dashboard' 
                  ? 'gradient-primary text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('reminders');
                navigate('/set-reminder');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all hover:scale-[1.02]"
            >
              <Bell className="w-5 h-5" />
              <span>Set Reminder</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:scale-[1.02] ${
                activeTab === 'reviews' 
                  ? 'gradient-primary text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>My Reviews</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:scale-[1.02] ${
                activeTab === 'settings' 
                  ? 'gradient-primary text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6 md:mb-8 animate-fade-in-up opacity-0">
              <h1 className="text-2xl md:text-3xl mb-2">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 text-sm md:text-base">Here's what's happening with your home services</p>
            </div>

            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <Card className="p-6 gradient-primary text-white card-shadow hover-lift animate-fade-in-up opacity-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Upcoming Reminders</p>
                        <p className="text-3xl mt-2">{upcomingReminders.length}</p>
                      </div>
                      <Bell className="w-12 h-12 opacity-80" />
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white card-shadow hover-lift animate-fade-in-up opacity-0 animate-delay-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Favorite Providers</p>
                        <p className="text-3xl mt-2">{favoriteProviders.length}</p>
                      </div>
                      <Heart className="w-12 h-12 opacity-80" />
                    </div>
                  </Card>

                  <Card className="p-6 gradient-accent text-white card-shadow hover-lift animate-fade-in-up opacity-0 animate-delay-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Reviews Given</p>
                        <p className="text-3xl mt-2">{userReviews.length}</p>
                      </div>
                      <MessageSquare className="w-12 h-12 opacity-80" />
                    </div>
                  </Card>
                </div>

                {/* Upcoming Reminders */}
                <Card className="p-4 md:p-6 card-shadow animate-fade-in-up opacity-0 animate-delay-300">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#4FC3F7]" />
                      Upcoming Reminders
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate('/set-reminder')}
                      className="text-[#4FC3F7] hover:bg-[#4FC3F7]/10 text-xs md:text-sm"
                    >
                      View All
                    </Button>
                  </div>
                  
                  {upcomingReminders.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500 mb-4 text-sm">No upcoming reminders</p>
                      <Button 
                        onClick={() => navigate('/set-reminder')}
                        className="gradient-primary text-white btn-shadow hover:scale-[1.02] transition-transform"
                      >
                        Set Your First Reminder
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {upcomingReminders.map((reminder) => (
                        <div key={reminder.id} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#F5F5F5] rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="gradient-primary text-white p-2 md:p-3 rounded-lg">
                            <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate text-sm md:text-base">{reminder.serviceType}</p>
                            <p className="text-xs md:text-sm text-gray-600">
                              {new Date(reminder.date).toLocaleDateString()} at {reminder.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                {/* Favorite Providers */}
                <Card className="p-4 md:p-6 card-shadow animate-fade-in-up opacity-0 animate-delay-400">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#FF5252] fill-[#FF5252]" />
                      Your Favorite Providers
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate('/services')}
                      className="text-[#4FC3F7] hover:bg-[#4FC3F7]/10 text-xs md:text-sm"
                    >
                      Browse All
                    </Button>
                  </div>
                  
                  {favoriteProviders.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-600 mb-2 text-lg">No favorites yet</p>
                      <p className="text-gray-500 mb-6 text-sm">Tap the heart ❤️ on provider cards to add them here</p>
                      <Button 
                        onClick={() => navigate('/services')}
                        className="gradient-primary text-white btn-shadow hover:scale-[1.02] transition-transform"
                      >
                        Browse Services
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favoriteProviders.map((provider) => (
                        <div key={provider.id} className="relative group">
                          <Card className="overflow-hidden card-shadow hover-lift">
                            <div className="relative h-32 md:h-40">
                              <ImageWithFallback
                                src={provider.photo}
                                alt={provider.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2 z-10">
                                <FavoriteButton providerId={provider.id} size="sm" showToast={false} />
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="mb-1 truncate">{provider.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{provider.serviceType}</p>
                              <div className="flex items-center justify-between">
                                {renderStars(provider.rating)}
                                <span className="text-sm text-gray-600">{provider.rating}</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-2 truncate">{provider.city}</p>
                            </div>
                          </Card>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {activeTab === 'reviews' && (
              <Card className="p-4 md:p-6 card-shadow animate-fade-in-up opacity-0">
                <h2 className="text-xl md:text-2xl mb-6">My Reviews</h2>
                
                {userReviews.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-4">You haven't left any reviews yet</p>
                    <Button 
                      onClick={() => navigate('/services')}
                      className="gradient-primary text-white btn-shadow hover:scale-[1.02] transition-transform"
                    >
                      Browse Services
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userReviews.map((review) => (
                      <div key={review.id} className="p-4 bg-[#F5F5F5] rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-start justify-between mb-2 gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{review.providerName}</p>
                            <p className="text-sm text-gray-600">{review.serviceType}</p>
                          </div>
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                        <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {activeTab === 'settings' && (
              <Card className="p-4 md:p-6 card-shadow animate-fade-in-up opacity-0">
                <h2 className="text-xl md:text-2xl mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm md:text-base">Name</label>
                    <input
                      type="text"
                      value={user.name}
                      disabled
                      className="w-full p-3 bg-[#F5F5F5] rounded-lg border border-gray-200 text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm md:text-base">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full p-3 bg-[#F5F5F5] rounded-lg border border-gray-200 text-sm md:text-base"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-base md:text-lg mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm md:text-base">Email notifications for reminders</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm md:text-base">SMS notifications for reminders</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm md:text-base">Newsletter and updates</span>
                      </label>
                    </div>
                  </div>

                  <Button className="w-full md:w-auto gradient-primary text-white btn-shadow hover:scale-[1.02] transition-transform">
                    Save Settings
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 shadow-lg z-50">
        <div className="grid grid-cols-4 gap-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              activeTab === 'dashboard' ? 'text-[#4FC3F7] bg-[#4FC3F7]/10' : 'text-gray-600'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </button>

          <button
            onClick={() => navigate('/set-reminder')}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-gray-600 transition-all active:scale-95"
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs">Reminders</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              activeTab === 'reviews' ? 'text-[#4FC3F7] bg-[#4FC3F7]/10' : 'text-gray-600'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Reviews</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              activeTab === 'settings' ? 'text-[#4FC3F7] bg-[#4FC3F7]/10' : 'text-gray-600'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
