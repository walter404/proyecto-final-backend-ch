import "./error.css"

const Error = ({error}) => {
  return (
    <div className="divContainer">
      <h1 className="error">{error}</h1>      
    </div>    
  )
}

export default Error