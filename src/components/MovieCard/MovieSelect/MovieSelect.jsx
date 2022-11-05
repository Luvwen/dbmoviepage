import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SelectField,
  Stack
} from '@chakra-ui/react'
import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

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
    // <ul className='select-container'>
    //   <li className='select-menu '>
    //     <span
    //       name='first'
    //       className={
    //         selected.first ? 'first-element selected ' : 'first-element'
    //       }
    //       onClick={handleSelection}
    //     >
    //       Vista General <span>▼</span>
    //     </span>
    //     <div
    //       className={
    //         selected.first ? 'select-menu__links first' : 'select-menu__links'
    //       }
    //     >
    //       <ul>
    //         <li>
    //           <Link className='links'>Elemento 1</Link>
    //         </li>
    //         <li>
    //           <Link className='links'>Elemento 2</Link>
    //         </li>
    //         <li>
    //           <Link className='links'>Elemento 3</Link>
    //         </li>
    //         <li>
    //           <Link className='links'>Elemento 4</Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </li>
    //   <li className='select-menu'>
    //     <span
    //       name='second'
    //       className={selected.second ? 'selected' : ''}
    //       onClick={handleSelection}
    //     >
    //       Multimedia <span>▼</span>
    //     </span>
    //     <div
    //       className={
    //         selected.second ? 'select-menu__links second' : 'select-menu__links'
    //       }
    //     >
    //       <ul>
    //         <li>
    //           <Link className='links'>Elemento 1</Link>
    //         </li>
    //         <li>
    //           <Link className='links'>Elemento 2</Link>
    //         </li>
    //         <li>
    //           <Link className='links'>Elemento 3</Link>
    //         </li>
    //         <li>
    //           <Link className='links'>Elemento 4</Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </li>
    //   <li className='select-menu'>
    //     <span
    //       name='third'
    //       className={selected.third ? 'selected' : ''}
    //       onClick={handleSelection}
    //     >
    //       Fandom <span>▼</span>
    //     </span>
    //     <div
    //       className={
    //         selected.third ? 'select-menu__links third' : 'select-menu__links'
    //       }
    //     >
    //       <ul>
    //         <li>
    //           <Link className='links'>Elemento 1</Link>
    //         </li>
    //         <li>
    //           <Link className='links'>Elemento 2</Link>
    //         </li>
    //         <li>
    //           <Link className='links'>Elemento 3</Link>
    //         </li>
    //         <li>
    //           <Link className='links'>Elemento 4</Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </li>
    //   <li className='select-menu'>
    //     <span
    //       name='fourth'
    //       className={selected.fourth ? 'selected' : ''}
    //       onClick={handleSelection}
    //     >
    //       Compartir <span>▼</span>
    //     </span>
    //     <div
    //       className={
    //         selected.fourth ? 'select-menu__links fourth' : 'select-menu__links'
    //       }
    //     >
    //       <ul>
    //         <li>
    //           <Link className='links'>Elemento 1</Link>
    //         </li>
    //         <li>
    //           <Link className='links'>Elemento 2</Link>
    //         </li>
    //         <li>
    //           <Link className='links'>Elemento 3</Link>
    //         </li>
    //         <li>
    //           <Link className='links'>Elemento 4</Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </li>
    // </ul>
    <Stack
      direction='row'
      justifyContent={['', 'center']}
      spacing={0}
      width='100vw'
      overflowX='scroll'
    >
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              borderRadius='0px'
              width='150px'
              minWidth='min-content'
              as={Button}
              rightIcon={<ChevronDownIcon />}
              _after={
                selected.first
                  ? {
                      content: `""`,
                      position: 'absolute',
                      width: '100%',
                      height: '4px',
                      top: '9',
                      bg: 'blue.500'
                    }
                  : {
                      content: `""`,
                      position: 'absolute',
                      width: '100%',
                      height: '4px',
                      top: '9',
                      bg: 'teal.200'
                    }
              }
              name='first'
              onClick={handleSelection}
            >
              {isOpen ? 'Vista General' : 'Vista General'}
            </MenuButton>
            <MenuList>
              <MenuItem>Vista General</MenuItem>
              <MenuItem>Vista General</MenuItem>
              <MenuItem>Vista General</MenuItem>
              <MenuItem>Vista General</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              borderRadius='0px'
              minWidth='min-content'
              width='150px'
              as={Button}
              rightIcon={<ChevronDownIcon />}
              _after={
                selected.second
                  ? {
                      content: `""`,
                      position: 'absolute',
                      width: '100%',
                      height: '4px',
                      top: '9',
                      bg: 'blue.500'
                    }
                  : ''
              }
              name='second'
              onClick={handleSelection}
            >
              {isOpen ? 'Multimedia' : 'Multimedia'}
            </MenuButton>
            <MenuList>
              <MenuItem>Multimedia</MenuItem>
              <MenuItem>Multimedia</MenuItem>
              <MenuItem>Multimedia</MenuItem>
              <MenuItem>Multimedia</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              borderRadius='0px'
              minWidth='min-content'
              width='150px'
              as={Button}
              rightIcon={<ChevronDownIcon />}
              _after={
                selected.third
                  ? {
                      content: `""`,
                      position: 'absolute',
                      width: '100%',
                      height: '4px',
                      top: '9',
                      bg: 'blue.500'
                    }
                  : ''
              }
              name='third'
              onClick={handleSelection}
            >
              {isOpen ? 'Fandom' : 'Fandom'}
            </MenuButton>
            <MenuList>
              <MenuItem>Fandom</MenuItem>
              <MenuItem>Fandom</MenuItem>
              <MenuItem>Fandom</MenuItem>
              <MenuItem>Fandom</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              borderRadius='0px'
              minWidth='min-content'
              width='150px'
              as={Button}
              rightIcon={<ChevronDownIcon />}
              _after={
                selected.fourth
                  ? {
                      content: `""`,
                      position: 'absolute',
                      width: '100%',
                      height: '4px',
                      top: '9',
                      bg: 'blue.500'
                    }
                  : ''
              }
              name='fourth'
              onClick={handleSelection}
            >
              {isOpen ? 'Compartir' : 'Compartir'}
            </MenuButton>
            <MenuList>
              <MenuItem>Compartir</MenuItem>
              <MenuItem>Compartir</MenuItem>
              <MenuItem>Compartir</MenuItem>
              <MenuItem>Compartir</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Stack>
  )
}
