import React from 'react';
import { StoryDetail, Categories, Traveler, StoryWidget, CommentsForm } from '../../components';
import { getStoryDetails, GET_TRAVELER } from '../../services';
import { Layout } from '../../components';

const StoryDetails = ({story, traveler}) => {
    console.log(story)
    return (
        <Layout>
            <div className='container mx-auto px-10 mb-5'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                    <div className='col-span-1 lg:col-span-8'>
                        <StoryDetail story={story} />
                        <CommentsForm slug={story.slug} />
                    </div>
                    <div className='col-span-1 lg:col-span-4'>
                        <div className='relative lg:sticky top-5'>
                            <Traveler traveler={traveler} />
                            <StoryWidget slug={story.slug} continents={story.continent} />
                            <Categories />
                        </div>
                    </div>
                </div>    
            </div>
        </Layout>
    )
}

export default StoryDetails 

export async function getStaticProps({params}) {
    const data = await getStoryDetails(params.slug);
    const traveler = (await GET_TRAVELER()) || [];
    return {
        props: {
            story: data,
            traveler
        }
    }
}
    
export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

