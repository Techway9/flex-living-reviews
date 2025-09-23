'use client';

import { useState, useEffect } from 'react';
import { Review } from '../../lib/reviewHelpers';
import ReviewRow from '../../components/ReviewRow';
import PropertyStats from '../../components/PropertyStats';
import { Filter, Search, RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  // Apply filters when reviews or filter criteria change
  useEffect(() => {
    let filtered = [...reviews];

    // Status filter
    if (filter !== 'all') {
      filtered = filtered.filter(review => review.status === filter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewText.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  }, [reviews, filter, searchTerm]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reviews/hostaway');
      const data = await response.json();
      
      if (data.status === 'success') {
        setReviews(data.data);
      } else {
        console.error('Failed to fetch reviews:', data.message);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId: string) => {
    try {
      const response = await fetch('/api/reviews/hostaway', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, status: 'approved' })
      });

      if (response.ok) {
        setReviews(reviews.map(review =>
          review.id === reviewId
            ? { ...review, status: 'approved' as const, isPubliclyVisible: true }
            : review
        ));
      }
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleReject = async (reviewId: string) => {
    try {
      const response = await fetch('/api/reviews/hostaway', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, status: 'rejected' })
      });

      if (response.ok) {
        setReviews(reviews.map(review =>
          review.id === reviewId
            ? { ...review, status: 'rejected' as const, isPubliclyVisible: false }
            : review
        ));
      }
    } catch (error) {
      console.error('Error rejecting review:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <RefreshCw className="w-5 h-5 animate-spin" />
          Loading reviews...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reviews Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage and monitor guest reviews across all properties</p>
            </div>
            <button
              onClick={fetchReviews}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Property Stats */}
        <PropertyStats reviews={reviews} />

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Reviews ({reviews.length})</option>
                <option value="pending">Pending ({reviews.filter(r => r.status === 'pending').length})</option>
                <option value="approved">Approved ({reviews.filter(r => r.status === 'approved').length})</option>
                <option value="rejected">Rejected ({reviews.filter(r => r.status === 'rejected').length})</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by property, guest name, or review content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-lg border shadow-sm">
          {filteredReviews.length > 0 ? (
            <>
              <div className="px-4 py-3 border-b bg-gray-50 rounded-t-lg">
                <p className="text-sm font-medium text-gray-700">
                  Showing {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''}
                </p>
              </div>
              {filteredReviews.map(review => (
                <ReviewRow
                  key={review.id}
                  review={review}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </>
          ) : (
            <div className="px-4 py-12 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No reviews match your current filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}