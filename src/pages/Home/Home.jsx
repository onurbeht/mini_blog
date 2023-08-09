import styles from './Home.module.css'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

//components
import PostData from '../../components/PostData/PostData'

const Home = () => {

  const [query, setQuery] = useState('')

  const {documents: posts, loading, error} = useFetchDocuments("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault

    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder='Ou busque por tags' onChange={(e) => setQuery(e.target.value)}/>
        <button className='btn btn_dark'>Pesquisar</button>
      </form>
      <>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <PostData post={post} key={post.id}/>
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.no_posts}>
            <p>Não foram encotrados posts</p>
            <Link to='/posts/create' className='btn'>Criar primeiro post</Link>
          </div>
        )}
      </>
    </div>
  )
}

export default Home