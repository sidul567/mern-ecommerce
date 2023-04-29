import React from 'react'
import profileImg from '../../images/profile.jpg'
import ReactStars from 'react-stars';
import './ProductDetails.css'

function ReviewCard({ review }) {
    return (
        <div className='reviewCard'>
            <img src={profileImg} alt="" />
            <h2>{review.name}</h2>
            <ReactStars
                edit={false}
                color1='rgba(20,20,20,0.1)'
                color2="tomato"
                value={review.rating}
                size={window.innerWidth < 600 ? 20 : 25}
            />
            <p className="comment">{review.comment}</p>
        </div>
    )
}

export default ReviewCard