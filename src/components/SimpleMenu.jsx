import React, { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '250px',
  },
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '1.5rem',
}))

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <MenuIcon
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}
        fontSize='large'
      >
        <MoreVertIcon />
      </MenuIcon>
      <StyledMenu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Link to={'/profile'} className='link'>
          <StyledMenuItem onClick={handleClose}>Profile</StyledMenuItem>
        </Link>
        <Link to={'/write'} className='link'>
          <StyledMenuItem onClick={handleClose}>Write</StyledMenuItem>
        </Link>
        <Link to={'/membership'} className='link'>
          <StyledMenuItem onClick={handleClose}>Membership</StyledMenuItem>
        </Link>
        <StyledMenuItem onClick={handleClose}>Logout</StyledMenuItem>
      </StyledMenu>
    </div>
  )
}
