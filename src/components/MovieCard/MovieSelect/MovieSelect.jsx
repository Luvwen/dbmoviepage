import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const MovieSelect = () => {
  const [selected, setSelected] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false
  })

  const handleSelection = (evt) => {
    const attName = evt.target.getAttribute('name')
    setSelected({ [attName]: !selected[attName] })
  }

  return (
    <ul className='select-container'>
      <li className='select-menu '>
        <span
          name='first'
          className={
            selected.first ? 'first-element selected ' : 'first-element'
          }
          onClick={handleSelection}
        >
          Vista General <span>▼</span>
        </span>
        <div
          className={
            selected.first ? 'select-menu__links first' : 'select-menu__links'
          }
        >
          <ul>
            <li>
              <Link className='links'>Elemento 1</Link>
            </li>
            <li>
              <Link className='links'>Elemento 2</Link>
            </li>
            <li>
              <Link className='links'>Elemento 3</Link>
            </li>
            <li>
              <Link className='links'>Elemento 4</Link>
            </li>
          </ul>
        </div>
      </li>
      <li className='select-menu'>
        <span
          name='second'
          className={selected.second ? 'selected' : ''}
          onClick={handleSelection}
        >
          Multimedia <span>▼</span>
        </span>
        <div
          className={
            selected.second ? 'select-menu__links second' : 'select-menu__links'
          }
        >
          <ul>
            <li>
              <Link className='links'>Elemento 1</Link>
            </li>
            <li>
              <Link className='links'>Elemento 2</Link>
            </li>
            <li>
              <Link className='links'>Elemento 3</Link>
            </li>
            <li>
              <Link className='links'>Elemento 4</Link>
            </li>
          </ul>
        </div>
      </li>
      <li className='select-menu'>
        <span
          name='third'
          className={selected.third ? 'selected' : ''}
          onClick={handleSelection}
        >
          Fandom <span>▼</span>
        </span>
        <div
          className={
            selected.third ? 'select-menu__links third' : 'select-menu__links'
          }
        >
          <ul>
            <li>
              <Link className='links'>Elemento 1</Link>
            </li>
            <li>
              <Link className='links'>Elemento 2</Link>
            </li>
            <li>
              <Link className='links'>Elemento 3</Link>
            </li>
            <li>
              <Link className='links'>Elemento 4</Link>
            </li>
          </ul>
        </div>
      </li>
      <li className='select-menu'>
        <span
          name='fourth'
          className={selected.fourth ? 'selected' : ''}
          onClick={handleSelection}
        >
          Compartir <span>▼</span>
        </span>
        <div
          className={
            selected.fourth ? 'select-menu__links fourth' : 'select-menu__links'
          }
        >
          <ul>
            <li>
              <Link className='links'>Elemento 1</Link>
            </li>
            <li>
              <Link className='links'>Elemento 2</Link>
            </li>
            <li>
              <Link className='links'>Elemento 3</Link>
            </li>
            <li>
              <Link className='links'>Elemento 4</Link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  )
}
