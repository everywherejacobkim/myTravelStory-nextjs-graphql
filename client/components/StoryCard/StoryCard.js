import React from 'react'

const StoryCard = ({story}) => {
    return (
        <div>
            <h2 className='text-2xl font-bold'>{story.title}</h2>
            <p className='text-gray-500'>{story.excerpt}</p>
        </div>
        
    )
}

export default StoryCard