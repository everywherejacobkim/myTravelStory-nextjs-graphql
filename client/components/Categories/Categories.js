import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import { getCategories } from '../../services'

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((result) => setCategories(result));
    },[])

    console.log(categories);
    return (
        <div className='bg-white p-5 mb-5 shadow-lg rounded-xl'>
        <h3 className='text-lg mb-5'>    
            Categories
        </h3>
        {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
                <div>
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