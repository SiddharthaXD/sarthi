import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Headphones } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for contacting us! We will get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general'
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-blue-400" />,
      title: 'Phone Support',
      details: '+91 98765 43210',
      subtitle: 'Available 24/7'
    },
    {
      icon: <Mail className="h-6 w-6 text-green-400" />,
      title: 'Email Support',
      details: 'support@sarthi.com',
      subtitle: 'Response within 2 hours'
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-400" />,
      title: 'Office Address',
      details: 'Sector 17, Chandigarh',
      subtitle: 'Punjab, India 160017'
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-400" />,
      title: 'Operating Hours',
      details: '24/7 Service',
      subtitle: 'Always here to help'
    }
  ];

  const supportCategories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'booking', label: 'Booking Issues' },
    { value: 'refund', label: 'Refund Request' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'complaint', label: 'Complaint' }
  ];

  const faqItems = [
    {
      question: 'How do I book a bus ticket?',
      answer: 'Go to the Ticketing page, select your route, date, and number of passengers, then choose from available buses and complete the payment.'
    },
    {
      question: 'Can I track my bus in real-time?',
      answer: 'Yes! Use our ETA page to track your bus location, get real-time updates, and see accurate arrival times.'
    },
    {
      question: 'What if my bus is delayed?',
      answer: 'You will receive automatic notifications about delays. You can also report delays through the ETA tracking page.'
    },
    {
      question: 'How do I cancel my booking?',
      answer: 'Contact our support team with your booking reference. Cancellation policies apply based on timing and route.'
    },
    {
      question: 'Are there student discounts available?',
      answer: 'Yes, we offer student discounts at selected routes. Contact support with valid student ID for more information.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We're here to help! Get in touch with our support team for any questions or assistance.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
              <div className="flex justify-center mb-4">
                {info.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
              <p className="text-white font-medium mb-1">{info.details}</p>
              <p className="text-sm text-gray-400">{info.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MessageCircle className="h-6 w-6 mr-2 text-blue-400" />
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {supportCategories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief subject line"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* FAQ and Quick Help */}
          <div className="space-y-8">
            {/* FAQ Section */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Headphones className="h-6 w-6 mr-2 text-green-400" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-white font-medium py-3 px-4 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                      <span>{faq.question}</span>
                      <span className="transform group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="mt-2 p-4 text-gray-300 bg-gray-750 rounded-md">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Quick Help */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-400" />
                Need Immediate Help?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-gray-700 rounded-md">
                  <Phone className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Call Support</h4>
                    <p className="text-gray-300 text-sm">For urgent issues, call our 24/7 helpline</p>
                    <p className="text-blue-400 font-medium">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-gray-700 rounded-md">
                  <MessageCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Live Chat</h4>
                    <p className="text-gray-300 text-sm">Chat with our support team in real-time</p>
                    <button className="text-green-400 font-medium text-sm hover:text-green-300 transition-colors">
                      Start Chat →
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-gray-700 rounded-md">
                  <Mail className="h-5 w-5 text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Email Support</h4>
                    <p className="text-gray-300 text-sm">Get detailed assistance via email</p>
                    <p className="text-orange-400 font-medium">support@sarthi.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">We Value Your Feedback</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Your suggestions help us improve Sarthi. We're committed to providing the best bus travel experience in Punjab.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white bg-opacity-20 rounded-md px-6 py-3 text-white">
              <div className="text-2xl font-bold">4.8/5</div>
              <div className="text-sm">Customer Rating</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-6 py-3 text-white">
              <div className="text-2xl font-bold">24hr</div>
              <div className="text-sm">Response Time</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-6 py-3 text-white">
              <div className="text-2xl font-bold">99%</div>
              <div className="text-sm">Issue Resolution</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;