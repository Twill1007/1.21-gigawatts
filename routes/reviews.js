const express = require('express');
const router = express.Router({ mergeParams: true });

const Campground = require('../models/Campground');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js')


const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }

};

router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully added a review!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:reviewID', catchAsync(async (req, res) => {
    const { id, reviewID } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewID } })
    await Review.findByIdAndDelete(reviewID);
    req.flash('success', 'Successfully deleted!');
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;