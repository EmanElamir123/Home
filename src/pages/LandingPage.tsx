import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Wrench, Zap, Droplet, Sparkles, Mail, Phone, Star, Shield, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../components/ui/toast';

export function LandingPage() {
  const { addToast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Message sent successfully! We will get back to you soon.', 'success');
    setContactForm({ name: '', email: '', message: '' });
  };

  const services = [
    {
      id: 'electrician',
      title: 'Electrician Near Me',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHdvcmslMjB0b29sc3xlbnwxfHx8fDE3NjA3MDAzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Professional electrical services for your home and office',
      delay: 'animate-delay-100'
    },
    {
      id: 'ac-service',
      title: 'AC Service Near Me',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1647022528152-52ed9338611d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBjb25kaXRpb25pbmclMjByZXBhaXJ8ZW58MXx8fHwxNzYwNjI4MTQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Expert AC installation, repair, and maintenance',
      delay: 'animate-delay-200'
    },
    {
      id: 'plumber',
      title: 'Plumber Near Me',
      icon: Droplet,
      image: 'https://images.unsplash.com/photo-1563197906-c1466d8e2edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwZml4aW5nJTIwcGlwZXN8ZW58MXx8fHwxNzYwNzEwNDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Reliable plumbing solutions for all your needs',
      delay: 'animate-delay-300'
    },
    {
      id: 'cleaning',
      title: 'Cleaning Services',
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1758272421751-963195322eaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjA2MDc3NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Professional cleaning for a spotless home',
      delay: 'animate-delay-400'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All service providers are verified and trusted'
    },
    {
      icon: Star,
      title: 'Top Rated',
      description: 'Quality guaranteed with customer reviews'
    },
    {
      icon: Clock,
      title: 'Easy Scheduling',
      description: 'Set reminders and book appointments hassle-free'
    },
    {
      icon: Users,
      title: '500+ Customers',
      description: 'Join our growing community of satisfied users'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-primary text-white">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwbHVtYmVyJTIwZWxlY3RyaWNpYW4lMjBzZXJ2aWNlfGVufDF8fHx8MTc2MDcxMDQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl mb-6 animate-fade-in-up opacity-0">
              Manage and schedule your home services in one place
            </h1>
            <p className="text-lg md:text-xl mb-10 opacity-90 animate-fade-in-up animate-delay-200 opacity-0">
              Find trusted professionals for cleaning, plumbing, electrical, and AC services in Lahore
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400 opacity-0">
              <Link to="/services">
                <Button className="gradient-primary btn-shadow text-white px-8 py-6 rounded-xl hover:scale-105 transition-transform">
                  Explore Services
                </Button>
              </Link>
              <Link to="/set-reminder">
                <Button 
                  variant="outline" 
                  className="bg-white/10 backdrop-blur-lg border-white/30 text-white px-8 py-6 rounded-xl hover:bg-white/20 hover:scale-105 transition-all"
                >
                  Set a Reminder
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`text-center animate-fade-in-up opacity-0 animate-delay-${(index + 5) * 100}`}
              >
                <div className="bg-white rounded-xl p-6 card-shadow">
                  <div className="gradient-primary text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h4 className="mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up opacity-0">
            <h2 className="text-3xl md:text-4xl mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our wide range of professional home services in Lahore
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link 
                key={service.id} 
                to={`/service/${service.id}`}
                className={`animate-fade-in-up opacity-0 ${service.delay}`}
              >
                <Card className="overflow-hidden hover-zoom card-shadow group cursor-pointer h-full">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                        <service.icon className="w-6 h-6 text-[#4FC3F7]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    <Button className="w-full gradient-primary text-white rounded-lg hover:shadow-lg transition-shadow">
                      View Providers
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 bg-gradient-to-br from-[#F5F5F5] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 md:p-12 card-shadow animate-scale-in opacity-0">
              <h2 className="text-3xl md:text-4xl mb-6">Why Choose Home Services?</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Home Services helps busy families and professionals manage household tasks easily by 
                connecting them to trusted local service providers in Lahore. We verify every professional 
                to ensure you get the best quality service, every time.
              </p>
              <Link to="/about">
                <Button className="gradient-primary text-white px-8 py-6 rounded-xl btn-shadow hover:scale-105 transition-transform">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in opacity-0 animate-delay-100">
              <div className="text-4xl md:text-5xl mb-2">500+</div>
              <p className="text-white/80">Happy Customers</p>
            </div>
            <div className="animate-fade-in opacity-0 animate-delay-200">
              <div className="text-4xl md:text-5xl mb-2">100+</div>
              <p className="text-white/80">Service Providers</p>
            </div>
            <div className="animate-fade-in opacity-0 animate-delay-300">
              <div className="text-4xl md:text-5xl mb-2">4.8★</div>
              <p className="text-white/80">Average Rating</p>
            </div>
            <div className="animate-fade-in opacity-0 animate-delay-400">
              <div className="text-4xl md:text-5xl mb-2">24/7</div>
              <p className="text-white/80">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4">Get in Touch</h2>
              <p className="text-gray-600">We're here to help you with all your home service needs</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6 animate-slide-in-left opacity-0">
                <Card className="p-6 card-shadow">
                  <div className="flex items-center gap-4">
                    <div className="gradient-primary text-white p-4 rounded-lg">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="mb-1">Email Us</h4>
                      <p className="text-gray-600">ghazalahamayo@gmail.com</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 card-shadow">
                  <div className="flex items-center gap-4">
                    <div className="gradient-primary text-white p-4 rounded-lg">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="mb-1">Call Us</h4>
                      <p className="text-gray-600">03221458311</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 card-shadow gradient-primary text-white">
                  <h4 className="mb-2">Working Hours</h4>
                  <p className="text-white/90">Monday - Saturday</p>
                  <p className="text-white/90">9:00 AM - 7:00 PM</p>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="animate-slide-in-right opacity-0">
                <Card className="p-6 card-shadow">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                        className="rounded-lg min-h-[120px]"
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="w-full gradient-primary text-white rounded-lg btn-shadow hover:scale-[1.02] transition-transform"
                    >
                      Send Message
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#4FC3F7] via-[#3DAED8] to-[#0288D1] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4 animate-fade-in-up opacity-0">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in-up animate-delay-200 opacity-0">
            Join thousands of satisfied customers who trust Home Services for their home maintenance needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400 opacity-0">
            <Link to="/provider-register">
              <Button className="bg-white text-[#4FC3F7] px-8 py-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all">
                Become a Provider
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                className="bg-white/10 backdrop-blur-lg border-white/30 text-white px-8 py-6 rounded-xl hover:bg-white/20 hover:scale-105 transition-all"
              >
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
