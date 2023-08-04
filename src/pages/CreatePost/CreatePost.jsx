import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthValue } from '../../context/AuthContext'

import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const {insertDocument, response} = useInsertDocument('posts')
  const {user} = useAuthValue()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    //validate URL Image

    //Criar array de tags

    //checar todos os valores 

    insertDocument({
      title,
      image, 
      body, 
      tags,
      uid: user.uid,
      createdBy: user.displayName
    })


    //redirect to home page
  }

  return (
    <div className={styles.create_post}>
      <h1>Criar post</h1>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo:</span>
          <input
            type='text'
            name='title'
            placeholder='Pense num bom titulo...'
            onChange={(e) => { setTitle(e.target.value) }}
            value={title} />
        </label>

        <label>
          <span>URL da Imagem:</span>
          <input
            type='text'
            name='image'
            placeholder='Insira uma imagem que representa o seu post'
            required
            onChange={(e) => { setImage(e.target.value) }}
            value={image} />
        </label>

        <label>
          <span>Conteudo:</span>
          <textarea 
            type='text'
            name='body'
            placeholder='Insira o conteudo do post'
            required
            maxLength={100}
            onChange={(e) => { setBody(e.target.value) }}
            value={body} />
        </label>

        <label>
          <span>Tags:</span>
          <input
            type='text'
            name='tags'
            placeholder='Insira as tags separadas por vírgula'
            required
            onChange={(e) => { setTags(e.target.value) }}
            value={tags} />
        </label>

        {!response.loading && <button className='btn'>Cadastrar</button>}
        {response.loading && <button className='btn' disabled>Aguarde...</button>}

        {response.error && <p className='error'>{response.error}</p>}
        
      </form>
    </div>
  )
}

export default CreatePost