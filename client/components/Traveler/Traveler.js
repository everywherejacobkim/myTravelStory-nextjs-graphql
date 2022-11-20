import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Traveler = ({traveler}) => {
  return (
    <div className='relative mb-5'>
      <Accordion className='rounded-xl mb-3'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <img src={traveler.photo.url} alt={traveler.name} width='55px' height='55px' className="rounded-full" />
          <div className='align-middle ml-2'>
            <h1 className='font-bold text-sm mt-2'>Traveler</h1>
            <h3 className='text-sm mt-[-2px] w-40'>{traveler.name}</h3>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className='mb-3 ml-1.5'>
            <p className='font-mono text-sm'>{traveler.bio}</p>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Traveler