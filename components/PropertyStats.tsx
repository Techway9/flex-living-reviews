import { Review, getPropertyStats } from '../lib/reviewHelpers';
import { Star, MessageSquare, Clock, CheckCircle } from 'lucide-react';

interface PropertyStatsProps {
  reviews: Review[];
}

export default function PropertyStats({ reviews }: PropertyStatsProps) {
  const propertyStats = getPropertyStats(reviews);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {Object.entries(propertyStats).map(([propId, stats]: [string, any]) => (
        <div key={propId} className="bg-white rounded-lg border p-4 shadow-sm">
          <h3 className="font-semibold text-lg mb-3">{stats.name}</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-500" />
                Average Rating
              </div>
              <span className="font-semibold text-lg">{stats.avgRating.toFixed(1)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MessageSquare className="w-4 h-4" />
                Total Reviews
              </div>
              <span className="font-medium">{stats.totalReviews}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-yellow-500" />
                Pending
              </div>
              <span className="font-medium">{stats.pendingCount}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Approved
              </div>
              <span className="font-medium">{stats.approvedCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}