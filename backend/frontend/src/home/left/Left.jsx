import React from 'react'
import Search from './Search'
import Users from './Users'

function Left() {
  return (
    <>
        <div className='w-[30%]  bg-black text-white'>
          <h1 className='font-bold text-3xl p-2 px-8'>Chats</h1>
        <Search/>
        <Users/>
        </div>
    </>
  )
}

export default Left