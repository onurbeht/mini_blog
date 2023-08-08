import styles from './PostData.module.css'

import { Link } from 'react-router-dom'

const PostData = ({post}) => {
  return (
    <div className={styles.post_data}>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p>{post.createdBy}</p>
        <div>
            {post.tagsArray.map((tag) => (
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        <Link to={`/posts/${post.id}`} className='btn btn_outline'>Ler</Link>
    </div>
  )
}

export default PostData