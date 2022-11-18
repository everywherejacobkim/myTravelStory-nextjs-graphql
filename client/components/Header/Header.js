import React, { useContext } from 'react';
import Link from 'next/link';
import moment from 'moment/moment';

const categories = [
    { name: 'Africa', slug: 'africa' },
    { name: 'South America', slug: 'south-america' },
    { name: 'North America', slug: 'north-america' },
    { name: 'Europe', slug: 'europe' },
    { name: 'Asia', slug: 'asia' },
]

const Header = () => {
    return (
        <div className='header container mx-auto px-10 mb-8'>
            <div className='border-b w-full inline-block border-gray-800 py-8'>
                <div className='md:float-left block'>
                    <Link href='/'>
                        <span className='cursor-pointer font-bold text-4xl'>
                            My Travel Story
                        </span>
                    </Link>
                </div>
                <div className='hidden md:float-left md:contents'>
                    {categories.map((category) => (
                        <Link href={`/category/${category.slug}`} key={category.slug}>
                            <span className='text-lg md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer'>
                                {category.name}
                            </span>
                        </Link>)
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header