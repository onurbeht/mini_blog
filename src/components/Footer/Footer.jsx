
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
        <h2>Escreva sobre o que você tem interesse!</h2>
        <p>Mini blog &copy; 2023</p>
        <p>Feito por: <a href='https://github.com/onurbeht' target='_blank'>Bruno Oliveira</a></p>
    </div>
  )
}

export default Footer