import React, { useEffect, useState } from 'react'

const Review = ({ id, author, created_at, content }) => {
  //DECLARATIONS
  const [reviewShowMore, setReviewShowMore] = useState(true)
  const [showMoreCollapse, setShowMoreCollapse] = useState(true)
  const [reviewLength, setReviewLength] = useState(false)


  const showMore = () => {
    reviewShowMore ? setReviewShowMore(false) : setReviewShowMore(true)
    setShowMoreCollapse(!showMoreCollapse)
  }

  useEffect(() => {
    const checkLength = () => {
      if (content.length >= 1000) {
        setReviewLength(true)
      }
    }
    checkLength()
  })

  return (
    <div>
      <div style={{ backgroundColor: '#474747', margin: '20px 0', padding: '0.5em' }} key={id}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>{author}</h1>
          <h1>{created_at.slice(0, 10)}</h1>
        </div>
        {showMoreCollapse ? <h4 key={id}>{content.slice(0, 1000)}</h4> : <h4 key={id}>{content}</h4>}
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          {reviewLength ? <button className='specific-review-button' onClick={showMore}>{showMoreCollapse ? 'Show More' : 'Show less'}</button> : null}
        </div>
      </div>
    </div>
  )
}

export default Review