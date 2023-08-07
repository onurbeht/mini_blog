import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';

import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { insertDocument, response } = useInsertDocument('posts');
  const { user } = useAuthValue();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    //validate URL Image
    try {
      new URL(image)
    } catch (error) {
      setFormError('A imagem precisa ser uma URL')
      return
    }

    //Criar array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    //checar todos os valores
    if(!title || !image || !body || !tags) {
      setFormError('Por favor, preencha todos os campos!')
      return
    }

    if (formError) {
      return
    } else {
      insertDocument({
        title,
        image,
        body,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName
      })  
    }

    //redirect to home page
    navigate('/')
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
            required
            maxLength={100}
            onChange={(e) => { setTitle(e.target.value) }}
            value={title} />
        </label>

        <label>
          <span>URL da Imagem:</span>
          <input
            type='url'
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
            maxLength={100}
            onChange={(e) => { setTags(e.target.value) }}
            value={tags} />
        </label>

        {!response.loading && <button className='btn'>Criar post!</button>}
        {response.loading && <button className='btn' disabled>Aguarde...</button>}

        {response.error || formError ? (<p className='error'>{response.error || formError}</p>) : ''}
    
      </form>
    </div>
  );
};

export default CreatePost