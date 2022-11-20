import React from 'react';
import { StoryDetail, Categories, Traveler, StoryWidget, CommentsForm, Comments } from '../../components';
import { getStories, getStoryDetails } from '../../services';

const StoryDetails = ({story}) => {
    return (
        <div className='container mx-auto px-10 mb-5'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                <div className='col-span-1 lg:col-span-8'>
                    <StoryDetail story={story} />
                    <Traveler traveler={story.traveler} />
                    <CommentsForm slug={story.slug} />
                    <Comments slug={story.slug} />
                </div>
                <div className='col-span-1 lg:col-span-4'>
                    <div className='relative lg:sticky top-5'>
                        <StoryWidget slug={story.slug} continents={story.categories.map((category) => category.slug)} />
                        <Categories />
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default StoryDetails 

export async function getStaticProps({params}) {
    const data = await getStoryDetails(params.slug);
    return {
        props: {
            story: data
        }
        }
}
    
export async function getStaticPaths() {
    const stories = await getStories();
    return {
        paths: stories.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: false
    }
}