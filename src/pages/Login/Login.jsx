import { useAuthentication } from '../../hooks/useAuthentication'

import { useState, useEffect } from 'react'

import { NavLink } from 'react-router-dom'

import styles from './Login.module.css'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {login, error: authError, loading} = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const user = {
      email,
      password
    }

    const res = await login(user)
  }

  useEffect(() => {
    if(authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.login}>
      
      <h1>Entrar</h1>

      <p>Faça login para poder utilizar o sistema</p>

      <form className={styles.register_form} onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input type='email' name='email' required placeholder='Email do usuário' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          <span>Senha</span>
          <input type='password' name='pass' required placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>

        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}

        {error && <p className='error'>{error}</p>}
      </form>

      <p>Ainda não tem uma conta?</p>
      <NavLink to='/register' className={styles.register}>Criar conta</NavLink>
    </div>
  )
}

export default Login