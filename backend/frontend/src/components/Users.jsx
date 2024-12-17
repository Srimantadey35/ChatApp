import React from 'react'

export default function Users() {
  return (
    <div className='py-7 px-8 flex space-x-4 hover:bg-slate-600 duration-300 cursor-pointer'>
       <div className="avatar online">
       <div className="w-14 rounded-full">
       <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
       </div>
      </div>
       <div>
        <h1 className='font-bold'>Srimanta Dey</h1>
        <span>srimanta@gmail.com</span>
     </div>
     </div>
  )
}
