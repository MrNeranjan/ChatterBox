'use client'
import Image from "next/image"

function AvatarGroup({users}) {
  return (
    <div className="Avatar_container">
      <Image
        alt="avatar"
        src={"/images/groupChat.webp"}
        width={45}
        height={45}
        style={{ borderRadius: '50%' , objectFit: 'cover'}}
      />
    </div>
  )
}

export default AvatarGroup
