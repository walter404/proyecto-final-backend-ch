import { useState } from 'react'
import './itemCount.css'

const ItemCount = ({stock, onAdd}) => {

  const [count, setCount] = useState(1)

  const add = () => {
    if (count < stock) {
      setCount(count + 1)
    }
  }

  const remove = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  return (
    <div>
      <div className="itemCountContainer">
        <div className='counterContainer'>
          <button onClick={remove}>-</button>
          <p>{count}</p>
          <button onClick={add}>+</button>
        </div>
        <button onClick={() => onAdd(count)}>Agregar al carrito</button>
      </div>
    </div>
  )
}

export default ItemCount