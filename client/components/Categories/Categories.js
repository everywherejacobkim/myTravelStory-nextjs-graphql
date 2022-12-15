import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import { getCategories } from '../../services'

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((result) => setCategories(result));
        console.log(categories)
    },[])

    return (
        <div className='bg-white p-5 mb-5 shadow-xl rounded'>
        <h3 className='title-font text-lg mb-4'>    
            Categories
        </h3>
        {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
                <div className='category text-lg'>
                    {category.name}
                </div>
            </Link>
            )  
        )
        }
        </div>
    )
}

export default Categories