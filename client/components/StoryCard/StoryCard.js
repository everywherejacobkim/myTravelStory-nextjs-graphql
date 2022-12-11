import React from 'react';
import Link from 'next/link';
import { CalendarIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const StoryCard = ({ story }) => {
    console.log(story);
    return (
        <div className='bg-white shadow-lg rounded-2xl p-0 lg:p-0 pb-10 mb-8'>
            <Link href={`/story/${story.slug}`}>
            <div className='relative overflow shadow-md pb-80 mb-6'>
                <img
                    src={story.featuredImage.url}
                    alt={story.title}
                    className='absolute h-80 w-full object-cover shadow-lg rounded-t-2xl' />
            </div>      
            </Link>
            <div className='px-5 lg:pb-5'>
            <Link href={`/story/${story.slug}`}>
                    <div className='cursor-pointer'>        
                        <h2 className='text-2xl font-bold text-[#37392e] hover:text-[#023e8a] transition duration-700 '>
                                {story.title}
                        </h2>
                        <div className='flex items-center align-middle mt-1 mb-3'>
                            <CalendarIcon className="h-4 w-4 text-yellow-700" />
                            <p className='text-[80%] mt-0.5 ml-1'>{story.date}</p>
                        </div>      
                        <p className='text-[#212529] hover:text-[#023e8a] transition duration-700'>{story.excerpt}.. <span className='text-xs text-sky-600'>read more</span></p>
                    </div>
            </Link>     
            <div className='flex justify-end items-end mt-4'>
                <UserCircleIcon className="h-4 w-4 mr-1 mb-0.5" />
                <p className='text-[12px] mr-1 mb-[0.1em]'>{story.traveler.name}</p>
                <img src={story.traveler.photo.url} alt={story.traveler.name} height='40px' width='40px' className='rounded-full' />
            </div>
            </div>

        </div>
        
    )
}

export default StoryCard