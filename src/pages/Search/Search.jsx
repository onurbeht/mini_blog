import styles from './Search.module.css'

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

import PostData from '../../components/PostData/PostData'

import { Link } from 'react-router-dom'

const Search = () => {

    const query = useQuery()
    const search = query.get("q")

    const { documents: posts, loading } = useFetchDocuments("posts", search)

    return (
        <div className={styles.container}>
            <h1>Busca</h1>

            <>
                {loading && <p>Carregando...</p>}
                {posts && posts.map((post) => (
                    <PostData post={post} key={post.id} />
                ))}
                {posts && posts.length === 0 && (
                    <div>
                        <p>Não foram encotrados posts a partir da sua busca...</p>
                    </div>
                )}
                <Link to='/' className='btn btn_dark'>Voltar</Link>
            </>

        </div>
    )
}

export default Search