import { useAuthentication } from '../../hooks/useAuthentication'

import { useState, useEffect } from 'react'

import styles from './Register.module.css'

const Register = () => {

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const {createUser, error: authError, loading} = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const user = {
      displayName,
      email,
      password
    }

    if(password !== confirmPassword) {
      setError('As senhas precisam ser iguais!')
      return
    }

    const res = await createUser(user)


  }

  useEffect(() => {
    if(authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>

      <h1>Cadastre-se para postar</h1>

      <p>Crie seu usuário e compartilhe seus momentos</p>

      <form className={styles.register_form} onSubmit={handleSubmit}>
        <label>
          <span>Nome</span>
          <input type='text' name='name'  required placeholder='Nome do usuário' value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
        </label>
        <label>
          <span>Email</span>
          <input type='email' name='email' required placeholder='Email do usuário' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          <span>Senha</span>
          <input type='password' name='pass' required placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <label>
          <span>Confirmação de senha</span>
          <input type='password' name='confirmPass' required placeholder='Confirme a sua senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        </label>

        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}

        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Register