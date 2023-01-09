import { Link } from 'react-router-dom'
import './chatBtn.css'

const ChatBtn = () => {
  return (
    <button className="chatBtn">
      <Link to="/chat">Chat</Link>
    </button>
  )
}

export default ChatBtn