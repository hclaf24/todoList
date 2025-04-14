import React from 'react';
import { nanoid } from 'nanoid';
import { CiCirclePlus } from "react-icons/ci";

const NewTodo = (props) => {
  const [input, setInput] = React.useState('');

  const handleSubmit =(e)=>{
    e.preventDefault();
    setInput('');

    props.onSubmit(
      {
        id: nanoid(),
        text: input,
        completed: false
      }
    )
  }

  const handleChange =(e)=>{
    setInput(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        title='Add todo'
        type='submit'
        aria-label='add todo'
        className='add'
      >
        <CiCirclePlus />
      </button>
      <input
        type="text" placeholder="Create a new todo..."
        name='text'
        value={input}
        onChange={handleChange}
        autoFocus
      />
    </form>
  )
}

export default NewTodo;