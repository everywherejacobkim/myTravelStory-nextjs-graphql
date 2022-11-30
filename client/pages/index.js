import HomePage from './home';
import Link from 'next/link';
import Button from '@mui/material/Button';
import LogInForm from '../components/LogInForm/LogInForm';

export default function Home({ stories }) {
  
  return (
      <div className='grid grid grid-cols-1 lg:grid-cols-16 gap-6'>
        {/* <Link href={'/home'}>
          <Button variant="contained" className='bg-blue-500 hover:bg-blue-200 hover:text-blue-700'>Enter</Button>
        </Link> */}
        <LogInForm />
      </div>  
  )
}
  