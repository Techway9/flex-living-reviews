export interface Review {
  id: string;
  propertyId: string;
  propertyName: string;
  guestName: string;
  overallRating: number;
  categoryRatings: {
    cleanliness: number;
    communication: number;
    respect_house_rules: number;
  };
  reviewText: string;
  submittedDate: string;
  channel: string;
  status: 'pending' | 'approved' | 'rejected';
  isPubliclyVisible: boolean;
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getStarRating = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  let stars = '★'.repeat(fullStars);
  if (hasHalfStar) stars += '☆';
  
  return stars;
};

export const getPropertyStats = (reviews: Review[]) => {
  const propertyGroups = reviews.reduce((acc, review) => {
    if (!acc[review.propertyId]) {
      acc[review.propertyId] = {
        name: review.propertyName,
        reviews: [],
        totalReviews: 0,
        avgRating: 0,
        pendingCount: 0,
        approvedCount: 0
      };
    }
    acc[review.propertyId].reviews.push(review);
    return acc;
  }, {} as Record<string, {
    name: string;
    reviews: Review[];
    totalReviews: number;
    avgRating: number;
    pendingCount: number;
    approvedCount: number;
  }>);

  Object.keys(propertyGroups).forEach(propId => {
    const prop = propertyGroups[propId];
    prop.totalReviews = prop.reviews.length;
    prop.avgRating = prop.reviews.reduce((sum: number, r: Review) => sum + r.overallRating, 0) / prop.totalReviews;
    prop.pendingCount = prop.reviews.filter((r: Review) => r.status === 'pending').length;
    prop.approvedCount = prop.reviews.filter((r: Review) => r.status === 'approved').length;
  });

  return propertyGroups;
};