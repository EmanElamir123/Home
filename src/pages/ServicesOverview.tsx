import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Wrench, Snowflake, Droplet, Sparkles } from 'lucide-react';

export function ServicesOverview() {
  const services = [
    {
      title: '🧰 Electrician Near Me',
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1660330589693-99889d60181e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzYwNTE4NTE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      path: '/service/electrician',
      description: 'Expert electrical services for your home. From installations to repairs, our certified electricians ensure safety and quality.',
      features: ['Emergency repairs', 'Wiring & installations', 'Safety inspections', 'Smart home setup']
    },
    {
      title: '❄️ AC Service Near Me',
      icon: Snowflake,
      image: 'https://images.unsplash.com/photo-1649335143768-e96bea9104ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBjb25kaXRpb25pbmclMjB0ZWNobmljaWFufGVufDF8fHx8MTc2MDU4NzAwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      path: '/service/ac-service',
      description: 'Professional AC repair and maintenance services. Keep your home cool and comfortable year-round.',
      features: ['AC repair', 'Maintenance & cleaning', 'Installation', 'Gas refilling']
    },
    {
      title: '🔧 Plumber Near Me',
      icon: Droplet,
      image: 'https://images.unsplash.com/photo-1624101910729-b4f4371ff265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwZml4aW5nfGVufDF8fHx8MTc2MDU4NzEzMnww&ixlib=rb-4.1.0&q=80&w=1080',
      path: '/service/plumber',
      description: 'Reliable plumbing solutions for all your needs. Fast response time and quality workmanship guaranteed.',
      features: ['Pipe repairs', 'Drain cleaning', 'Leak detection', 'Fixture installation']
    },
    {
      title: '🧹 Cleaning Services',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1758272421751-963195322eaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjA0NzMyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      path: '/service/cleaning',
      description: 'Professional home cleaning services. Enjoy a spotless home without lifting a finger.',
      features: ['Deep cleaning', 'Regular maintenance', 'Move-in/out cleaning', 'Eco-friendly products']
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#4FC3F7] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl mb-4">Our Services</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Comprehensive home services delivered by trusted professionals. 
            Choose from our range of services and book with confidence.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12">
          {services.map((service, index) => (
            <Card key={service.path} className={`overflow-hidden ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:grid md:grid-cols-2 gap-8">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#4FC3F7] text-white p-3 rounded-lg">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl">{service.title}</h2>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="mb-3">What we offer:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#4FC3F7] rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link to={service.path}>
                    <Button className="w-full md:w-auto bg-[#4FC3F7] hover:bg-[#3DAED8] text-white">
                      View Providers
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
