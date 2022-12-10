import LoginForm from '../components/LoginForm/LoginForm';

export default function Home({ stories }) {
  
  return (
      <div>
        {/* <Link href={'/home'}>
          <Button variant="contained" className='bg-blue-500 hover:bg-blue-200 hover:text-blue-700'>Enter</Button>
        </Link> */}
        <LoginForm />
      </div>  
  )
}
  