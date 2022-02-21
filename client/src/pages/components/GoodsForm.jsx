import { useState } from "react"
import { useDispatch } from 'react-redux'
import { createGoods} from '../../features/goods/goodsSlice'
import logo from './img/392530_add_create_cross_new_plus_icon.png'

function GoodsForm() {
    const [text, setText] = useState("")
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createGoods({text}))
        setText('')
    }
    const dispatch = useDispatch()

  return (
    <section className="form">
        <form onSubmit={onSubmit}>
            <input type="text" 
            name="text" 
            placeholder="Mi kell a boltból?"
            id="text"
            onChange={
                (e) => setText(e.target.value)
            }/>
            <button className="btn" type="submit">
                <img src={logo} alt="logo" />
            </button>
        </form>
    </section>
  )
}

export default GoodsForm