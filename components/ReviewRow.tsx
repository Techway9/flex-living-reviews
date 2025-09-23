'use client';

import { Review, formatDate, getStarRating } from '../lib/reviewHelpers';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

interface ReviewRowProps {
  review: Review;
  onApprove: (reviewId: string) => void;
  onReject: (reviewId: string) => void;
}

export default function ReviewRow({ review, onApprove, onReject }: ReviewRowProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-lg text-gray-900">{review.propertyName}</h3>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500 text-lg">{getStarRating(review.overallRating)}</span>
              <span className="text-sm text-gray-600">({review.overallRating.toFixed(1)})</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(review.status)}`}>
              {getStatusIcon(review.status)}
              {review.status.toUpperCase()}
            </span>
            {review.isPubliclyVisible && (
            //   <Eye className="w-4 h-4 text-blue-500" title="Publicly visible" />
            <Eye className="w-4 h-4 text-blue-500" aria-label="Publicly visible" />
            )}
          </div>

          {/* Guest and Date */}
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
            <span className="font-medium">{review.guestName}</span>
            <span>•</span>
            <span>{formatDate(review.submittedDate)}</span>
            <span>•</span>
            <span className="capitalize">{review.channel}</span>
          </div>

          {/* Review Text */}
          <p className="text-gray-700 mb-3 leading-relaxed">{review.reviewText}</p>

          {/* Category Ratings */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <span>Cleanliness: <strong>{review.categoryRatings.cleanliness}/5</strong></span>
            <span>Communication: <strong>{review.categoryRatings.communication}/5</strong></span>
            <span>House Rules: <strong>{review.categoryRatings.respect_house_rules}/5</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        {review.status === 'pending' && (
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onApprove(review.id)}
              className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => onReject(review.id)}
              className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <XCircle className="w-4 h-4" />
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}