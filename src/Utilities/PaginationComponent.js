import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export function PaginationComponent(page, setPage) {

  const JumpTenPageFunction = () => {
    page > 10 ? setPage(page - 10) : setPage(1)
  }
  const JumpOnePageFunction = () => {
    page > 1 ? setPage(page - 1) : setPage(1)
  }
  return <div className='buttons'>
    <button onClick={() => JumpTenPageFunction()}><FaArrowLeft /><FaArrowLeft /></button>
    <button onClick={() => JumpOnePageFunction()}><FaArrowLeft /></button>
    <p className='current-page'>{page}</p>
    <button onClick={() => setPage(page + 1)}><FaArrowRight /></button>
    <button onClick={() => setPage(page + 10)}><FaArrowRight /><FaArrowRight /></button>
  </div>;
}
