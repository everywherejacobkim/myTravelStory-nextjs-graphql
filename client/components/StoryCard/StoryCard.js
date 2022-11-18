import React from 'react';
import Link from 'next/link';

const StoryCard = ({ story }) => {
    console.log(story);
    return (
        <div className='bg-white shadow-lg rounded-2xl p-0 lg:p-0 pb-10 mb-8'>
            <div className='relative overflow shadow-md pb-80 mb-6'>
                <img
                    src={story.featuredImage.url}
                    alt={story.title}
                    className='absolute h-80 w-full object-cover shadow-lg rounded-t-2xl' />
            </div>
            <div className='px-5 cursor-pointer lg:pb-5'>
                <h2 className='text-2xl font-bold hover:text-[#023e8a] transition duration-700 '>
                    <Link href={`/story/${story.slug}`}>
                        {story.title}
                    </Link>
                </h2>
                <p className='text-[80%] mt-1 mb-3'>{story.date}</p>
                <p className='hover:text-[#023e8a] transition duration-700'>{story.excerpt}</p>
                <div className='flex justify-end items-end mt-4'>
                    <p className='text-[12px] mr-1 mb-[0.1em]'>/ {story.traveler.name}</p>
                    <img src={story.traveler.photo.url} alt={story.traveler.name} height='40px' width='40px' className='rounded-full' />
                </div>
            </div>
        </div>
        
    )
}

export default StoryCard