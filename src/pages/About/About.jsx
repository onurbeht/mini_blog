import { Link } from 'react-router-dom'
import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.about}>
      <h1>Sobre o Mini blog</h1>
      <p>Este projeto consistem em um blog feito com React no Front-end e Firebase no back-end</p>
      <Link to='/posts/create' className='btn'>Criar post</Link>
    </div>
  )
}

export default About