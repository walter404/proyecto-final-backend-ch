import './chat.css'
import io from "socket.io-client";
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"



const Chat = () => {

  const socket = io('http://localhost:8080', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
}) 

  /* chat with socket.io */
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [message , setMessage] = useState({
    email: '',
    fecha: '',
    mensaje: ''
  }) 

  // Expresiones regulares para los campos del formulario  
  // eslint-disable-next-line
  const emailRegex = /^[\w_\.-]+@[\w\.-]+\.[a-z\.]{2,6}$/i

  const handleChange = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value
    })
  }  

  

  useEffect(() => { 
    socket.on('messages', (data) => {
      setMessages(data)
    })     
    setLoading(false) // eslint-disable-next-line
  }, [])   

 
  
  const addMessage = (e) => {
    e.preventDefault()
    console.log(message);
    const mensaje = {
      email: message.email,
      fecha: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      mensaje: message.mensaje
    }
    socket.emit('new-message', mensaje) 
    /* refresh form */
    document.getElementById("mail").value = "";
    document.getElementById("mensaje").value = "";

  }


  return (
    <div className='sectionContainer chatContainer'>
      <h2>CENTRO DE MENSAJES</h2>        
      {loading ? <h3>Cargando mensajes...</h3> :
      <>
      <div id="mensajes" className='messageContainer'>
        {messages.map((message, index) => (
          <div key={index}>
            <p className="emailMensaje">{message.email}</p>
            <p className="fechaMensaje">[{message.fecha}]:</p>
            <p className="mensajeMensaje">{message.mensaje}</p>
          </div>
        ))}
      </div>
      <form onSubmit={addMessage} className="formularioMensajes">
        <input type="text" id="mail" name='email' placeholder="Tu Mail" required onChange={handleChange}/>
        <input type="text" id="mensaje" name='mensaje' placeholder="Ingresa un mensaje..." onChange={handleChange}/>

        { 
          emailRegex.test(message.email) && message.mensaje.length
            ?<input type="submit" value="ENVIAR" className="submitButtonMns"/>             
            :<input disabled type="submit" value="ENVIAR" className="submitButtonMnsDsbl"/>      
        }        
        <div id="mensajes"></div>
      </form> 
      </>
      }

      <div className="linkContainer"><Link to="/">VOLVER A HOME</Link></div>

    </div>
  )
}

export default Chat