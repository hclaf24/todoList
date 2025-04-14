import React from 'react'

const TodoItem = ({item, toggleCompleted, deleteTodo}) => {
  return (
    <>
      <div>
        <input type='checkbox' checked={item.completed} onChange={(e) => {toggleCompleted(item.id)}} />
        <span>{item.text}</span>
      </div>
      <button onClick={(e) => {deleteTodo(e, item.id)}} className='delete' />
    </>
  )
}

export default TodoItem;