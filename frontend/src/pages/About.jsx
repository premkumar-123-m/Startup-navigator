import { Compass, Users, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">Our Mission</h1>
        <p className="text-xl text-gray-600">
          To democratize startup knowledge and empower founders to build the future.
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-8">
          Building a startup is incredibly difficult. Most founders spend months trying to figure out legal structures, 
          finding the right funding mechanisms, and navigating the complexities of early-stage growth. 
          <strong className="text-gray-900"> Startup Navigator</strong> was built to solve this problem.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 my-16 not-prose">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF6A00]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Guidance</h3>
            <p className="text-sm text-gray-600">Clear, structured paths through the chaos of starting a company.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF8C00]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Accuracy</h3>
            <p className="text-sm text-gray-600">Verified knowledge powered by advanced AI and human experts.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Community</h3>
            <p className="text-sm text-gray-600">Tools designed to help founders support each other and grow.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Built for the Modern Entrepreneur</h2>
        <p>
          We leverage the latest in AI technology (RAG with Google Gemini) to instantly search through thousands of curated 
          articles, guides, and templates. Whether you are bootstrapping a SaaS business or raising a Series A for a deep-tech 
          hardware startup, our platform provides tailored answers to your specific situation.
        </p>
      </div>
    </div>
  );
};

export default About;
