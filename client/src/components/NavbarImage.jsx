import React from 'react'

const NavbarImage = ({user}) => {
  return (
    <div>
      <img
                src={user?.avatar}
                alt="Avatar"
                className="h-[50px] w-[50px] rounded-full"
             
              />
    </div>
  )
}

export default NavbarImage
