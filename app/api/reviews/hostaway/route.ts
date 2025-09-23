import { NextResponse } from 'next/server';
import mockReviews from '../../../../data/mockReviews.json';
import type { Review } from '../../../../lib/reviewHelpers';

// This simulates the Hostaway API integration
// In real implementation, you'd call the actual Hostaway API here
async function fetchHostawayReviews(): Promise<Review[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // In production, this would be:
  // const response = await fetch(`https://api.hostaway.com/v1/reviews`, {
  //   headers: {
  //     'Authorization': `Bearer f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152`,
  //     'Content-Type': 'application/json'
  //   }
  // });
  // return response.json();
  
  return mockReviews as Review[];
}

// Normalize the review data to ensure consistent format
function normalizeReviews(reviews: Review[]): Review[] {
  return reviews.map(review => ({
    id: review.id,
    propertyId: review.propertyId,
    propertyName: review.propertyName,
    guestName: review.guestName,
    overallRating: Number(review.overallRating),
    categoryRatings: {
      cleanliness: Number(review.categoryRatings.cleanliness),
      communication: Number(review.categoryRatings.communication),
      respect_house_rules: Number(review.categoryRatings.respect_house_rules)
    },
    reviewText: review.reviewText.trim(),
    submittedDate: review.submittedDate,
    channel: review.channel,
    status: review.status,
    isPubliclyVisible: review.isPubliclyVisible
  }));
}

export async function GET() {
  try {
    console.log('Fetching reviews from Hostaway API...');
    
    const rawReviews = await fetchHostawayReviews();
    const normalizedReviews = normalizeReviews(rawReviews);
    
    console.log(`Successfully fetched and normalized ${normalizedReviews.length} reviews`);
    
    return NextResponse.json({
      status: 'success',
      data: normalizedReviews,
      count: normalizedReviews.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to fetch reviews',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Add PUT method to update review status
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { reviewId, status } = body;
    
    // In production, this would update the database
    console.log(`Updating review ${reviewId} to status: ${status}`);
    
    return NextResponse.json({
      status: 'success',
      message: `Review ${reviewId} updated to ${status}`,
      reviewId,
      newStatus: status
    });
  } catch (err) {
  console.error('Error fetching reviews:', err);
  
  return NextResponse.json(
    { 
      status: 'error', 
      message: 'Failed to fetch reviews',
      error: err instanceof Error ? err.message : 'Unknown error'
    },
    { status: 500 }
  );
}
}