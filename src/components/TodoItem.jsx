import React, { useRef, useState, useEffect } from 'react'

const TodoItem = ({ item, toggleCompleted, menuOptions }) => {
  const {
    deleteTodo,
    setColor,
    colors
  } = menuOptions;

  const [menuOpen, setMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null); // color, deleteConfirm
  const [newColor, setNewColor] = useState('');

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddColor = () => {
    if (newColor.trim() && !colors.includes(newColor)) {
      setColors([...colors, newColor.trim()]);
      setColor(item.id, newColor.trim());
      setNewColor('');
      setMenuOpen(false);
      setSubmenu(null);
    }
  };

  return (
    <div className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => toggleCompleted(item.id)}
        />
        <span>{item.text}</span>
        <span className={`todo-color-tag color-${item.color}`}></span>
      </div>

      <div className={`menu-wrapper ${menuOpen ? 'open' : ''}`} ref={menuRef}>
        <button className="kebab-button" onClick={() => setMenuOpen(prev => !prev)}>
          &#8942;
        </button>

        {menuOpen && (
          <ul className="dropdown-menu">
            <li className="close-button">
              <button onClick={() => {
                setMenuOpen(false);
                setSubmenu(null);
              }}>×</button>
            </li>

            {submenu === null && (
              <>
                <li className='dropdownItem' onClick={() => setSubmenu('deleteConfirm')}>Delete</li>
                <li className='dropdownItem' onClick={() => setSubmenu('color')}>Set Color</li>
              </>
            )}

            {submenu === 'deleteConfirm' && (
              <div className="confirm-delete">
                <p>Are you sure?</p>
                <div className="confirm-buttons">
                  <button
                    className="confirm-btn delete"
                    onClick={(e) => {
                      deleteTodo(e, item.id);
                      setMenuOpen(false);
                      setSubmenu(null);
                    }}
                  >
                    Yes, delete
                  </button>
                  <button
                    className="confirm-btn cancel"
                    onClick={() => setSubmenu(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {submenu === 'color' && (
              <>
                {colors.map((color, idx) => (
                  <li className='colorItems' key={idx} onClick={() => {
                    setColor(item.id, color);
                    setMenuOpen(false);
                    setSubmenu(null);
                  }}>
                    <span className={`color-dot color-${color}`}></span>
                    {color}
                  </li>
                ))}
                <li className='back colorItems' onClick={() => setSubmenu(null)}>Back</li>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoItem;