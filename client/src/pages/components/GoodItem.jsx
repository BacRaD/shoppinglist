import { useDispatch } from 'react-redux'
import { deleteGood } from '../../features/goods/goodsSlice'

function GoodItem({good}) {
    const dispatch = useDispatch()
  return (
    <div className='good'
         onClick={() => dispatch(deleteGood(good._id))}
    >
        <h2>{good.text}</h2>
    </div>
  )
}

export default GoodItem