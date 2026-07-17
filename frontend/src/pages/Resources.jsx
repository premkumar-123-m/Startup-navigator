import { Download, ExternalLink, Filter } from 'lucide-react';

const Resources = () => {
  const resources = [
    { type: 'Template', title: 'Y-Combinator SAFE Note Template', desc: 'Standard Simple Agreement for Future Equity document used by top startups.', tag: 'Legal', link: 'https://www.ycombinator.com/documents' },
    { type: 'Tool', title: 'Stripe Atlas', desc: 'A powerful tool to handle company formation and banking for internet startups.', tag: 'Registration', link: 'https://stripe.com/atlas' },
    { type: 'Guide', title: 'The Lean Startup Methodology', desc: 'Essential reading for building a product that customers actually want.', tag: 'Growth', link: 'http://theleanstartup.com/' },
    { type: 'Template', title: 'Cap Table Excel Model', desc: 'Track equity distribution among founders, employees, and investors.', tag: 'Finance', link: 'https://carta.com/blog/equity-cap-table-template/' },
    { type: 'Tool', title: 'Notion Startup Workspace', desc: 'Pre-built workspace templates for team collaboration and wiki.', tag: 'Productivity', link: 'https://www.notion.so/startups' },
    { type: 'Template', title: 'Pitch Deck Structure', desc: 'Sequoia Capital\'s recommended slide structure for raising seed rounds.', tag: 'Funding', link: 'https://www.sequoiacap.com/article/writing-a-business-plan/' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Startup Resources</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Curated tools, templates, and guides to accelerate your startup journey.
          </p>
        </div>
        <button 
          onClick={() => alert("Filter options coming soon!")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Filter className="w-4 h-4" /> Filter Resources
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col h-full hover:border-[#FF6A00]/50 hover:shadow-lg hover:shadow-orange-100 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                {res.type}
              </span>
              <span className="text-xs font-medium text-[#FF8C00]">{res.tag}</span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF6A00] transition-colors">{res.title}</h3>
            <p className="text-gray-600 text-sm mb-6 flex-grow">{res.desc}</p>
            
            <button 
              onClick={() => {
                if (res.link) {
                  window.open(res.link, "_blank");
                } else {
                  alert(`Starting download for: ${res.title}`);
                }
              }}
              className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-[#FF6A00] transition-colors mt-auto w-fit"
            >
              {res.type === 'Tool' ? (
                <><ExternalLink className="w-4 h-4" /> Visit Website</>
              ) : (
                <><Download className="w-4 h-4" /> Download Resource</>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
