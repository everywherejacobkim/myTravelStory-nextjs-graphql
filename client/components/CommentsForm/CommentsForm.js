import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { submitComment } from '../../services';

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState([]);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const comment = useRef();
  const name = useRef();
  const email = useRef();
  const storeData = useRef();

  useEffect(() => {
    name.current.value = window.localStorage.getItem('name');
    email.current.value = window.localStorage.getItem('email');
  }, []);

  const handleCommentSubmit = (e) => {
    if (!comment.current.value) {
      setError(true);
      return;
    } 

    const commentObj = {
      name, email, comment, slug
    };

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }

    submitComment(commentObj)
      .then((res) => {
        setShowSuccessMsg(true);

        setTimeout(() => {
          setShowSuccessMsg(false);
        }, 3000);
      })
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-5 mt-5 mb-5'>
      <h3 className='text-md mb-3 font-semibold border-b pb-2'>Comment</h3>
      <div className='grid grid-cols-1 gap-5 mb-3'>
        <textarea ref={comment} name='comment' className='px-2 py-2 outline-none w-full rounded-lg bg-gray-100 focus:ring-1 focus:ring-gray-200' placeholder='memo'/>
      </div>
      <div className='grid grid-cols-1 gap-5 mb-3'>
        <input type='text' ref={name} name='name' className='px-2 py-2 outline-none w-full rounded-lg bg-gray-100 focus:ring-1 focus:ring-gray-200' placeholder='name'/>
      </div>
      <div className='grid grid-cols-1 gap-5 mb-3'>
        <input type='text' ref={email} name='email' className='px-2 py-2 outline-none w-full rounded-lg bg-gray-100 focus:ring-1 focus:ring-gray-200' placeholder='email'/>
      </div>
      <div className='grid grid-cols-1 gap-5 mb-3'>
        <div>
          <input type="checkbox" ref={storeData} id='storeData' name='storeData' value='true' />
          <label className='ml-2 text-gray-400 cursor-pointer' htmlFor="storeData">Save my info for the next time I comment</label>
        </div>
      </div>
      <div className='text-center mt-5 mb-1'>
        <Button variant="contained" className='bg-blue-500 hover:bg-blue-200 hover:text-blue-700' onClick={handleCommentSubmit}>Post</Button>
        {showSuccessMsg && <p className='text-green-500'>Comment posted successfully</p>}
      </div>
    </div>    
  )   
}

export default CommentsForm