import React, {useState, useEffect} from 'react';
import { getRecentStories, getSimilarStories } from '../../services';
import Link from 'next/link';

const StoryWidget = ({stories, slug, continents}) => {
    const [recentStories, setRecentStories] = useState([]);
    
    useEffect(() => {
        if(slug) {
            getSimilarStories(slug, continents).then((result) => setRecentStories(result));
        } else {
            getRecentStories().then((result) => setRecentStories(result));
        }
    }, [slug])
    
    return (
        <div className='bg-white p-5 mb-5 shadow-xl rounded'>
            <h3 className='text-lg mb-5'>    
                {recentStories.length > 3 ? `More Stories in ${recentStories[0].country}` : 'Recent Stories' }
            </h3>
            <div>
                {recentStories.map((story) => (
                <Link href={`/story/${story.slug}`}>
                    <div key={story.slug} className='flex items-center w-full'>
                        <div className='flex mb-3 align-middle border-b pb-2 w-full'>
                            <img src={story.featuredImage.url} alt={story.title} className='h-[40px] w-[40px] rounded-lg' />
                            <div className='recent-story text-sm ml-5'>
                                <p className='mb-[-1%]'>{story.date}</p>
                                <p className='text-base font-semibold'>{story.title}</p> 
                            </div>
                        </div>

                        </div>  
                </Link>
                    )  
                )
                }
                </div>
        </div>
    )
}

export default StoryWidget  