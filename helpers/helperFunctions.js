export const calcAvrRating = (reviews = []) => {
    if (reviews?.length === 0) return 0;
    const avrgRating = reviews?.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    return avrgRating.toFixed(1);
};

export const ratingPercenages = (reviews) => {
    const result = [
        { rating: 5, percentage: 0, count: 0 },
        { rating: 4, percentage: 0, count: 0 },
        { rating: 3, percentage: 0, count: 0 },
        { rating: 2, percentage: 0, count: 0 },
        { rating: 1, percentage: 0, count: 0 },
    ];
    if (reviews?.length === 0) return result;

    return reviews?.reduce((acc, review) => {
        acc.map((accItem) => {
            if (accItem.rating === Math.floor(review.rating)) {
                accItem.count++;
                accItem.percentage = Math.round((accItem.count / reviews.length) * 100);
            }
        });
        return acc;
    }, result);
};
