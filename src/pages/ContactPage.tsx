import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import { useToast } from '../components/ui/toast';

export function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      addToast('Message sent successfully! We will get back to you soon.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <div className="gradient-primary text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl mb-4 animate-fade-in-up opacity-0">Get in Touch</h1>
          <p className="text-base md:text-lg opacity-90 animate-fade-in-up animate-delay-200 opacity-0">We'd love to hear from you. Send us a message!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="animate-slide-in-left opacity-0">
            <Card className="p-6 md:p-8 card-shadow">
              <h2 className="text-xl md:text-2xl mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>

                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>

                <div className="relative">
                  <Input
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>

                <div className="relative">
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="min-h-[150px] transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full gradient-primary text-white btn-shadow hover:scale-[1.02] transition-transform"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>

            {/* Happy Professional Image */}
            <div className="mt-8 hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1691317635349-0d9dfdd4c734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBsdW1iZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNzA5NTk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Happy Professional"
                className="rounded-2xl shadow-xl w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 animate-slide-in-right opacity-0">
            {/* Contact Details Card */}
            <Card className="p-6 md:p-8 card-shadow">
              <h2 className="text-xl md:text-2xl mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#4FC3F7] text-white p-3 rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="mb-1">Email</h4>
                    <p className="text-gray-600">ghazalahamayo@gmail.com</p>
                    <p className="text-sm text-gray-500 mt-1">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#4FC3F7] text-white p-3 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="mb-1">Phone</h4>
                    <p className="text-gray-600">03221458311</p>
                    <p className="text-sm text-gray-500 mt-1">Call us for immediate assistance</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#4FC3F7] text-white p-3 rounded-lg">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="mb-1">Working Hours</h4>
                    <p className="text-gray-600">Monday – Saturday</p>
                    <p className="text-gray-600">9:00 AM – 7:00 PM</p>
                    <p className="text-sm text-gray-500 mt-1">Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#4FC3F7] text-white p-3 rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="mb-1">Location</h4>
                    <p className="text-gray-600">Lahore, Pakistan</p>
                    <p className="text-sm text-gray-500 mt-1">Serving all areas of Lahore</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map Card */}
            <Card className="p-6 md:p-8 card-shadow">
              <h3 className="text-lg md:text-xl mb-4">Find Us on Map</h3>
              <div className="bg-gray-200 rounded-lg overflow-hidden h-64 relative">
                {/* Embedded map placeholder - you can replace with actual Google Maps embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435519.227274671!2d74.00472390820312!3d31.483103300000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lahore Map"
                ></iframe>
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">
                We serve all major areas in Lahore including DHA, Model Town, Gulberg, and more
              </p>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center bg-gradient-to-br from-[#4FC3F7] to-[#3DAED8] text-white">
                <p className="text-3xl mb-1">500+</p>
                <p className="text-sm opacity-90">Happy Customers</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <p className="text-3xl mb-1">100+</p>
                <p className="text-sm opacity-90">Providers</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <p className="text-3xl mb-1">24/7</p>
                <p className="text-sm opacity-90">Support</p>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="p-6">
              <h4 className="mb-2">How do I book a service?</h4>
              <p className="text-sm text-gray-600">
                Browse our services, select a provider, and use the "Set Reminder" button to schedule your appointment.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="mb-2">Are the providers verified?</h4>
              <p className="text-sm text-gray-600">
                Yes, all our service providers are verified and vetted to ensure quality and reliability.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="mb-2">Is there a service fee?</h4>
              <p className="text-sm text-gray-600">
                No, our platform is completely free to use. You only pay the service provider for their work.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="mb-2">What areas do you cover?</h4>
              <p className="text-sm text-gray-600">
                We currently serve all major areas in Lahore, including DHA, Model Town, Gulberg, and surrounding localities.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
