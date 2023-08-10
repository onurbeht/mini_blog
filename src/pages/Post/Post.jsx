import styles from './Post.module.css'

//hooks
import { Link, useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {

    const { id } = useParams()
    const { document: post, loading, error } = useFetchDocument("posts", id)

    return (
        <>

            {loading && <p>Carregando post...</p>}
            {post &&
                <div className={styles.container}>
                    <div className={styles.image}>
                        <img src={post.image} alt={post.title} />
                        <h2>{post.title}</h2>
                    </div>
                    <div className={styles.info}>
                        <p className={styles.body}>{post.body}</p>
                        <h3>Este post trata sobre:</h3>
                        <div className={styles.tags}>
                            {post.tagsArray.map(tag => (
                                <p key={tag}><span>#</span>{tag}</p>
                            ))}
                        </div>
                        <Link to='/' className={`btn btn_dark ${styles.button}`}>Voltar</Link>
                    </div>
                </div>}
        </>
    )
}

export default Post