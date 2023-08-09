import styles from './PostData.module.css'

import { Link } from 'react-router-dom'

const PostData = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <div className={styles.post_img}>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
      </div>
        <p className={styles.createdBy}>{post.createdBy}</p>
        <p>{post.body}</p>
        <div className={styles.tags}>
          {post.tagsArray.map((tag) => (
            <p key={tag}><span>#</span>{tag}</p>
          ))}
        </div>
        <Link to={`/posts/${post.id}`} className='btn btn_outline'>Ler</Link>
    </div>
  )
}

export default PostData