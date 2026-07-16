import { Building, Landmark, FileText, Users, Globe, Megaphone, Briefcase, Zap, Search } from 'lucide-react';

const topics = [
  { id: 1, title: 'Company Registration', icon: Building, desc: 'Learn how to incorporate, choose the right entity, and get started.', color: 'text-blue-500', bg: 'bg-blue-50 border-blue-200 hover:border-blue-400' },
  { id: 2, title: 'Funding & Investment', icon: Landmark, desc: 'From bootstrapping to Series A. Learn how to pitch and raise capital.', color: 'text-[#FF6A00]', bg: 'bg-orange-50 border-orange-200 hover:border-[#FF6A00]' },
  { id: 3, title: 'Legal Compliance', icon: FileText, desc: 'Contracts, IP protection, terms of service, and regulatory compliance.', color: 'text-red-500', bg: 'bg-red-50 border-red-200 hover:border-red-400' },
  { id: 4, title: 'Hiring & Team', icon: Users, desc: 'Building culture, equity distribution, and talent acquisition strategies.', color: 'text-purple-500', bg: 'bg-purple-50 border-purple-200 hover:border-purple-400' },
  { id: 5, title: 'Branding & Design', icon: Globe, desc: 'Creating a memorable brand identity and establishing market presence.', color: 'text-pink-500', bg: 'bg-pink-50 border-pink-200 hover:border-pink-400' },
  { id: 6, title: 'Marketing Strategy', icon: Megaphone, desc: 'Go-to-market strategies, SEO, content marketing, and growth hacking.', color: 'text-[#FF8C00]', bg: 'bg-orange-50 border-orange-200 hover:border-[#FF8C00]' },
  { id: 7, title: 'Taxation & Finance', icon: Briefcase, desc: 'Accounting basics, managing burn rate, and understanding tax obligations.', color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400' },
  { id: 8, title: 'AI Tools & Tech', icon: Zap, desc: 'Leveraging AI for productivity, automation, and competitive advantage.', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400' },
];

const Explore = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Explore Topics</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Everything you need to know about building a startup, organized by category.
        </p>
      </div>

      <div className="relative mb-12 max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6A00] focus:border-[#FF6A00] transition-all shadow-sm"
          placeholder="Search topics, articles, or keywords..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${topic.bg} bg-white`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-white shadow-sm border border-gray-100 ${topic.color}`}>
                <topic.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{topic.title}</h3>
            <p className="text-sm text-gray-600">{topic.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
