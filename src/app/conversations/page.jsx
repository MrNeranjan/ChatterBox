'use client'

import clsx from "clsx"
import UseConversation from "../hooks/useConversation"
import EmptyEstate from "../pages/components/EmptyEstate"
import "./pageStyle.css"

function Conversation() {

  const { isOpen } = UseConversation();

  return (
    <div className={clsx(
      "Conversation_container"
      , !isOpen && "Conversation_container_hidden"
    )}>
      <div className='Conversation_container_emptySate'>
        <EmptyEstate />
      </div>
    </div>
  )
}

export default Conversation

