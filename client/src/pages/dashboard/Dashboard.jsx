import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoodsForm from "../components/GoodsForm"
import { getGoods, reset } from "../../features/goods/goodsSlice"
import GoodItem from "../components/GoodItem"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const {goods, isLoading, isError, message} = useSelector((state) => state.goods)

  useEffect (() => {
    if(isError) {
      console.log(message)
    }
    if(!user) {
      navigate('/login')
    }

    dispatch(getGoods())

    if(isLoading) {
      return "Loading"
    }

    return () => {
      dispatch(reset)
    }
  }, [user, navigate, isError, message, dispatch])

  return (
    <div className="container">
      <section className="content">
        {goods.length > 0 ? <div>
            {goods.map((good) => (
              <GoodItem key={good._id} good={good}/>
              ))}
        </div> : <h3>Ügyes vagy, mehetsz haza!</h3>}
      </section>
      <GoodsForm />
    </div>
  )
}

export default Dashboard