function calculateRating(rating) {
    if (rating < 3) {
        return 'bg-red';
    } else if (rating > 3 && rating < 4) {
        return 'bg-yellow';
    } else {
        return 'bg-green';
    }
}
function processRatingStars(rating) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(<i className="fas fa-star" key={i}></i>);
    }
    if (rating && rating > 0) {
        for (let i = 0; i <= rating - 1; i++) {
            stars[i] = <i className="fas fa-star text-yellow" key={i}></i>;
        }
    }
    return stars;
}
function restaurantRatingStars(rating) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(<span className="fs-16" key={i}><i className="fas fa-star"></i></span>);
    }
    if (rating && rating > 0) {
        for (let i = 0; i <= rating - 1; i++) {
            stars[i] = <span className="text-yellow fs-16" key={i}><i className="fas fa-star"></i></span>;
        }
    }
    return stars;
}
function fetchFlavorIcon(flavor) {
    return flavor;
}
export { calculateRating, processRatingStars, fetchFlavorIcon, restaurantRatingStars };
