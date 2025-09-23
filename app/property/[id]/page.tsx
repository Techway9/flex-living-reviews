'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Review, formatDate, getStarRating } from '../../../lib/reviewHelpers';
import { Star, MapPin, Wifi, Car, Coffee, ArrowLeft } from 'lucide-react';

interface PublicReviewCardProps {
  review: Review;
}

function PublicReviewCard({ review }: PublicReviewCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {review.guestName.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{review.guestName}</p>
            <p className="text-sm text-gray-500">{formatDate(review.submittedDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-500 text-lg">{getStarRating(review.overallRating)}</span>
          <span className="text-sm text-gray-600 ml-1">({review.overallRating.toFixed(1)})</span>
        </div>
      </div>
      
      <p className="text-gray-700 leading-relaxed mb-4">{review.reviewText}</p>
      
      <div className="flex flex-wrap gap-4 text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Cleanliness: {review.categoryRatings.cleanliness}/5</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Communication: {review.categoryRatings.communication}/5</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>House Rules: {review.categoryRatings.respect_house_rules}/5</span>
        </div>
      </div>
    </div>
  );
}

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [propertyName, setPropertyName] = useState('');
  
  // Unwrap the params Promise
  const resolvedParams = use(params);
  const propertyId = resolvedParams.id;

  useEffect(() => {
    fetchApprovedReviews();
  }, [propertyId]);

  const fetchApprovedReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reviews/hostaway');
      const data = await response.json();
      
      if (data.status === 'success') {
        const approved = data.data.filter((review: Review) => 
          review.status === 'approved' && 
          review.isPubliclyVisible &&
          review.propertyId === propertyId
        );
        setApprovedReviews(approved);
        
        if (approved.length > 0) {
          setPropertyName(approved[0].propertyName);
        } else {
          // Set a default name if no reviews found
          const propertyNames: { [key: string]: string } = {
            'prop_1': 'Downtown Loft',
            'prop_2': 'Seaside Villa', 
            'prop_3': 'Mountain Cabin'
          };
          setPropertyName(propertyNames[propertyId] || 'Property');
        }
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const averageRating = approvedReviews.length > 0 
    ? approvedReviews.reduce((sum, review) => sum + review.overallRating, 0) / approvedReviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Property Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Property Image Placeholder */}
            <div className="lg:w-1/2">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{propertyName}</h2>
                  <p className="text-blue-100">Professional photos coming soon</p>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{propertyName}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">Prime location in the heart of the city</span>
              </div>

              {/* Rating Summary */}
              {averageRating > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-2xl">{getStarRating(averageRating)}</span>
                    <span className="text-xl font-semibold">{averageRating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500">
                    Based on {approvedReviews.length} review{approvedReviews.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}

              {/* Amenities */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Amenities</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-blue-500" />
                    <span>Free WiFi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-blue-500" />
                    <span>Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-blue-500" />
                    <span>Kitchen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Guest Reviews
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-500">Loading reviews...</div>
            </div>
          ) : approvedReviews.length > 0 ? (
            <div className="space-y-6">
              {approvedReviews.map(review => (
                <PublicReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No reviews available for this property yet.</p>
              <p className="text-sm mt-1">Reviews will appear here once approved by management.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}