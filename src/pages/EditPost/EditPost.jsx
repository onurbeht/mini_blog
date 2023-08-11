import styles from './EditPost.module.css';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';

import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const EditPost = () => {

  const { id } = useParams()

  const { document: post } = useFetchDocument("posts", id)

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { updateDocument, response } = useUpdateDocument('posts');
  const { user } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setImage(post.image)
      setBody(post.body)

      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }

  }, [post])

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
    if (!title || !image || !body || !tags) {
      setFormError('Por favor, preencha todos os campos!')
      return
    }

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    if (formError) {
      return
    } else {
      updateDocument(id, data)
    }

    //redirect to home page
    navigate('/dashboard')
  }

  return (
    <div className={styles.edit_post}>
      {post &&
        <>
          <h1>Editando post: {post.title}</h1>
          <p>Altere os dados do post como desejar</p>

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
            <p className={styles.preview_title}>preview da imagem atual:</p>
            <img src={post.image} alt={post.title} className={styles.preview_image}/>
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

            {!response.loading && <button className='btn'>Editar</button>}
            {response.loading && <button className='btn' disabled>Aguarde...</button>}

            {response.error || formError ? (<p className='error'>{response.error || formError}</p>) : ''}

          </form>
        </>
      }
    </div>
  );
};

export default EditPost