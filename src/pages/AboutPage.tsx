import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Card } from '../components/ui/card';
import { CheckCircle, Target, Users, Shield } from 'lucide-react';

export function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: 'Verified & Trusted Professionals',
      description: 'All service providers are carefully verified to ensure quality and reliability.'
    },
    {
      icon: CheckCircle,
      title: 'Easy Reminder System',
      description: 'Never miss an appointment with our smart reminder system.'
    },
    {
      icon: Users,
      title: 'User Ratings & Reviews',
      description: 'Make informed decisions based on genuine customer reviews.'
    },
    {
      icon: Target,
      title: 'Free to Use',
      description: 'Connect with service providers at no cost - pay only for services rendered.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758518729371-5ee28c4ddf60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRlYW0lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNzA5NTU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Our Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4FC3F7]/90 to-[#3DAED8]/90 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl mb-4 animate-fade-in-up opacity-0">About Home Services</h1>
            <p className="text-base md:text-xl opacity-90 animate-fade-in-up animate-delay-200 opacity-0">Connecting You with Trusted Local Professionals</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Who We Are */}
        <section className="mb-12 md:mb-16 animate-fade-in-up opacity-0">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl mb-6">Who We Are</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Home Services is a platform that connects families and working professionals with 
              trusted local service providers in Lahore. We understand the challenges of maintaining 
              a home while juggling busy schedules, which is why we've created a seamless solution 
              to help you find reliable professionals for all your home service needs.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-12 md:mb-16 bg-[#F5F5F5] -mx-4 px-4 py-8 md:py-12 animate-fade-in-up opacity-0 animate-delay-100">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To simplify home maintenance by making it easy to find verified, reliable, and 
                  skilled service providers. We believe that everyone deserves access to quality 
                  home services without the hassle of endless searching and uncertainty.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our platform brings together the best electricians, plumbers, AC technicians, 
                  and cleaning professionals in Lahore, all in one convenient place. We're committed 
                  to building trust between service providers and customers through transparency, 
                  quality, and reliability.
                </p>
              </div>
              <div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1553268107-a74f013ceb59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwc2VydmljZSUyMHByb2Zlc3Npb25hbHN8ZW58MXx8fHwxNzYwNzA5NTU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Home Services"
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12 md:mb-16 animate-fade-in-up opacity-0 animate-delay-200">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're more than just a directory - we're your trusted partner in home maintenance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="p-4 md:p-6 text-center card-shadow hover-lift">
                <div className="bg-[#4FC3F7] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Meet the Team */}
        <section className="mb-12 md:mb-16 animate-fade-in-up opacity-0 animate-delay-300">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl mb-4">Meet the Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals working to make your life easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="overflow-hidden text-center card-shadow hover-lift">
              <div className="bg-gradient-to-br from-[#4FC3F7] to-[#3DAED8] h-48 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl">
                  👨‍💼
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2">Muhammad Ahmed</h3>
                <p className="text-sm text-gray-600 mb-2">Founder & CEO</p>
                <p className="text-sm text-gray-500">
                  Passionate about connecting people with quality services
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden text-center hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 h-48 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl">
                  👩‍💼
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2">Ayesha Khan</h3>
                <p className="text-sm text-gray-600 mb-2">Operations Manager</p>
                <p className="text-sm text-gray-500">
                  Ensuring smooth operations and customer satisfaction
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden text-center hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 h-48 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl">
                  👨‍💻
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2">Hassan Ali</h3>
                <p className="text-sm text-gray-600 mb-2">Technical Lead</p>
                <p className="text-sm text-gray-500">
                  Building technology that makes a difference
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="gradient-primary rounded-2xl p-8 md:p-12 text-center text-white animate-scale-in opacity-0">
          <h2 className="text-2xl md:text-3xl mb-4">Ready to Get Started?</h2>
          <p className="text-base md:text-lg mb-8 opacity-90">
            Join thousands of satisfied customers who trust Home Services for their home maintenance needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/services">
              <button className="w-full sm:w-auto bg-white text-[#4FC3F7] px-6 md:px-8 py-3 rounded-lg hover:bg-gray-100 hover:scale-[1.02] transition-all">
                Browse Services
              </button>
            </a>
            <a href="/provider-register">
              <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 rounded-lg hover:bg-white/10 hover:scale-[1.02] transition-all">
                Become a Provider
              </button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
