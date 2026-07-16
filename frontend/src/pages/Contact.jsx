import { Mail, MessageSquare, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Get in Touch</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have a question about our platform or want to contribute to our startup knowledge base? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]" placeholder="Jane" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]" placeholder="Doe" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]" placeholder="jane@startup.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]" placeholder="How can we help you?"></textarea>
            </div>

            <button type="button" className="w-full bg-[#FF6A00] text-white font-bold py-4 rounded-xl hover:bg-[#E65100] transition-colors shadow-md shadow-orange-500/20">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
              <Mail className="w-6 h-6 text-[#FF6A00]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Email Us</h3>
              <p className="text-gray-600">Our team usually responds within 24 hours.</p>
              <a href="mailto:hello@startupnavigator.com" className="text-[#FF8C00] font-medium hover:underline mt-2 inline-block">hello@startupnavigator.com</a>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
              <MessageSquare className="w-6 h-6 text-[#FF6A00]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Live Chat</h3>
              <p className="text-gray-600">Available Monday through Friday, 9am - 5pm EST.</p>
              <button className="text-[#FF8C00] font-medium hover:underline mt-2">Start a conversation</button>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-gray-100 p-4 rounded-2xl border border-gray-200">
              <MapPin className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Headquarters</h3>
              <p className="text-gray-600">
                123 Innovation Drive<br/>
                San Francisco, CA 94105<br/>
                United States
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
