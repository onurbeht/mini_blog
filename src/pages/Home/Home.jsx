import styles from './Home.module.css'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Home = () => {

  const [query, setQuery] = useState('')
  const [posts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder='Ou busque por tags' onChange={(e) => setQuery(e.target.value)}/>
        <button className='btn btn_dark'>Pesquisar</button>
      </form>
      <div>
        <h2>Posts...</h2>
        {posts && posts.length === 0 && (
          <div className={styles.no_posts}>
            <p>Não foram encotrados posts</p>
            <Link to='/posts/create' className='btn'>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home