import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { UserPlus } from 'lucide-react';
import { useToast } from '../components/ui/toast';

export function ProviderRegisterPage() {
  const navigate = useNavigate();
  const { addProvider } = useApp();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    serviceType: '',
    city: '',
    contact: '',
    experience: '',
    rating: '5',
    photo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.serviceType || !formData.city || !formData.contact || !formData.experience) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    const provider = {
      id: Date.now().toString(),
      name: formData.name,
      serviceType: formData.serviceType,
      city: formData.city,
      contact: formData.contact,
      experience: parseInt(formData.experience),
      rating: parseFloat(formData.rating),
      photo: formData.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&size=400&background=4FC3F7&color=fff`,
      reviews: []
    };

    addProvider(provider);
    addToast('Registration successful! You can now be found by customers.', 'success');
    
    // Navigate to the relevant service page
    const serviceTypeMap: Record<string, string> = {
      'Electrician': 'electrician',
      'AC Service': 'ac-service',
      'Plumber': 'plumber',
      'Cleaning': 'cleaning'
    };
    
    setTimeout(() => {
      navigate(`/service/${serviceTypeMap[formData.serviceType]}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#4FC3F7] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <UserPlus className="w-10 h-10" />
            <h1 className="text-4xl">Service Provider Registration</h1>
          </div>
          <p className="text-lg opacity-90">Join our network of trusted professionals</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <h2 className="text-2xl mb-6">Register as a Service Provider</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2">Full Name *</label>
                <Input
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Service Type *</label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electrician">Electrician</SelectItem>
                    <SelectItem value="AC Service">AC Service</SelectItem>
                    <SelectItem value="Plumber">Plumber</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2">City *</label>
                <Input
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Contact Number *</label>
                <Input
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Experience (in years) *</label>
                <Input
                  type="number"
                  min="0"
                  placeholder="Enter years of experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Initial Rating (Optional)</label>
                <Select
                  value={formData.rating}
                  onValueChange={(value) => setFormData({ ...formData, rating: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4.5">4.5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3.5">3.5 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2">Photo URL (Optional)</label>
                <Input
                  type="url"
                  placeholder="Enter photo URL (leave blank for default)"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Leave blank to use a default avatar
                </p>
              </div>

              <Button type="submit" className="w-full bg-[#4FC3F7] hover:bg-[#3DAED8] text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Register as Provider
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Once registered, you will appear in the relevant service category 
                and customers will be able to contact you directly. Make sure your contact information is accurate.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
