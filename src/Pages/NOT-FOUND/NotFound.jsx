import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from "./NotFound.module.scss"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <section className={style.main}>
      <div>
        <img src="https://img.freepik.com/free-vector/404-error-lost-space-concept-illustration_114360-7971.jpg?size=626&ext=jpg&ga=GA1.2.1457292162.1713696621&semt=ais_hybrid" alt="" />
      </div>
      <button onClick={() => navigate("/")}>Home</button>
    </section>
  )
}

export default NotFound