import Link from 'next/link';
import { Star, Users, TrendingUp, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Flex Living Reviews Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Manage guest reviews across all your properties with our powerful dashboard. 
            Monitor performance, approve reviews, and showcase the best guest experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Manager Dashboard
            </Link>
            <Link 
              href="/property/prop_1"
              className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Star className="w-5 h-5" />
              View Property Example
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Performance Monitoring</h3>
            <p className="text-gray-600">Track review trends and property performance with real-time analytics and insights.</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Review Management</h3>
            <p className="text-gray-600">Approve, reject, and manage reviews before they go live on your property pages.</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-Channel Integration</h3>
            <p className="text-gray-600">Consolidate reviews from Hostaway, Google, and other platforms in one dashboard.</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg border p-8 text-center">
          <h2 className="text-2xl font-semibold mb-6">Quick Demo Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600">7</div>
              <div className="text-gray-600">Total Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">2</div>
              <div className="text-gray-600">Approved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600">5</div>
              <div className="text-gray-600">Pending</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">4.3</div>
              <div className="text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}