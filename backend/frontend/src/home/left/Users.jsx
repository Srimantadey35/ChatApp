import React from 'react'
import User from './User'
import GetAllUser from '../../components/GetAllUser'

function Users() {
    const [allUser,loading] = GetAllUser();
    
    return (
        <div className=' py-2 flex-srimanta overflow-y-auto' style={{maxHeight:"calc(84vh - 2vh)"}}>
          {
            allUser.map((item)=>
              <User item = {item} key={item._id}/>
            )
          }
          
          
        </div>
    )
}

export default Users