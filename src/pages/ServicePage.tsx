import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Star, Search, MapPin, Phone, Calendar, MessageSquare } from 'lucide-react';
import { FavoriteButton } from '../components/FavoriteButton';
import { useToast } from '../components/ui/toast';

export function ServicePage() {
  const { serviceType } = useParams();
  const { providers, addReview } = useApp();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string>('');
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const serviceNames: Record<string, string> = {
    'electrician': 'Electrician Near Me',
    'ac-service': 'AC Service Near Me',
    'plumber': 'Plumber Near Me',
    'cleaning': 'Cleaning Services'
  };

  const filteredProviders = providers.filter((provider) => {
    const matchesService = provider.serviceType.toLowerCase() === serviceType?.replace('-', ' ');
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = ratingFilter === 'all' || provider.rating >= parseInt(ratingFilter);
    const matchesCity = cityFilter === 'all' || provider.city === cityFilter;
    
    return matchesService && matchesSearch && matchesRating && matchesCity;
  });

  const cities = [...new Set(providers.map(p => p.city))];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    addReview(selectedProviderId, {
      id: Date.now().toString(),
      name: reviewForm.name,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toLocaleDateString()
    });
    addToast('Review submitted successfully!', 'success');
    setReviewDialogOpen(false);
    setReviewForm({ name: '', rating: 5, comment: '' });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="gradient-primary text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl mb-4 animate-fade-in-up opacity-0">{serviceNames[serviceType || '']}</h1>
          <p className="text-lg opacity-90 animate-fade-in-up animate-delay-200 opacity-0">Find verified and trusted service providers in your area</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="p-6 mb-8 card-shadow animate-fade-in-up opacity-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
              </SelectContent>
            </Select>

            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={() => {
                setSearchQuery('');
                setRatingFilter('all');
                setCityFilter('all');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        </Card>

        {/* Provider Cards */}
        {filteredProviders.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No providers found matching your criteria</p>
            <Link to="/provider-register">
              <Button className="bg-[#4FC3F7] hover:bg-[#3DAED8] text-white">
                Become a Provider
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider, index) => (
              <Card key={provider.id} className={`overflow-hidden hover-zoom card-shadow group animate-fade-in-up opacity-0 animate-delay-${(index % 6 + 1) * 100}`}>
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={provider.photo || 'https://via.placeholder.com/400x300?text=Provider'}
                    alt={provider.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <FavoriteButton providerId={provider.id} />
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFB300] text-[#FFB300]" />
                    <span className="text-sm">{provider.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2">{provider.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(provider.rating)}
                    <span className="text-sm text-gray-600">
                      ({provider.reviews?.length || 0} reviews)
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{provider.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{provider.contact}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Experience: {provider.experience} years
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/set-reminder">
                      <Button variant="outline" size="sm" className="w-full gap-2 hover:bg-[#F5F5F5] transition-all hover:scale-[1.02]">
                        <Calendar className="w-4 h-4" />
                        Set Reminder
                      </Button>
                    </Link>
                    
                    <Dialog open={reviewDialogOpen && selectedProviderId === provider.id} onOpenChange={(open) => {
                      setReviewDialogOpen(open);
                      if (open) setSelectedProviderId(provider.id);
                    }}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="w-full gap-2 gradient-primary text-white btn-shadow hover:scale-[1.02] transition-transform">
                          <MessageSquare className="w-4 h-4" />
                          Add Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Review for {provider.name}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                          <div>
                            <label className="block mb-2">Your Name</label>
                            <Input
                              value={reviewForm.name}
                              onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block mb-2">Rating</label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                >
                                  <Star
                                    className={`w-8 h-8 cursor-pointer ${
                                      star <= reviewForm.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block mb-2">Review</label>
                            <Textarea
                              value={reviewForm.comment}
                              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                              required
                              className="min-h-[100px]"
                            />
                          </div>

                          <Button type="submit" className="w-full gradient-primary text-white btn-shadow hover:scale-[1.02] transition-transform">
                            Submit Review
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Recent Reviews */}
                  {provider.reviews && provider.reviews.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm mb-2">Recent Reviews:</p>
                      <div className="space-y-2">
                        {provider.reviews.slice(0, 2).map((review) => (
                          <div key={review.id} className="bg-[#F5F5F5] p-3 rounded">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">{review.name}</span>
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-gray-600">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
