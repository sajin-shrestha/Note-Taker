import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import logo from '../assets/logo.png'
import ToggleColorMode from '../utils/ToggleColorMode'

import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'

import SearchIcon from '@mui/icons-material/Search'

const logoStyle = {
  width: '150px',
  height: '50px',
  cursor: 'pointer',
  borderRadius: '20px',
  background: 'none',
}

const AnimatedDiv = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  color: theme.palette.mode === 'light' ? 'black' : theme.palette.text.primary,
  fontWeight:
    theme.palette.mode === 'light'
      ? 'bold'
      : theme.typography.fontWeightRegular,
  fontFamily: 'cursive',
  fontStyle: 'italic',
  transition: 'transform 0.2s ease-out, opacity 0.2s ease-out', // Transition for hover effect
  '&:hover': {
    transform: 'scale(1.1)',
    opacity: 0.8,
  },
  animation: 'fadeInOut 3s infinite', // Animation for appearing and disappearing effect
  '@keyframes fadeInOut': {
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
}))

const settings = ['Profile', 'Logout']

function AppAppBar({ mode, toggleColorMode, avatarImg }) {
  const [open, setOpen] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const navigate = useNavigate()

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleMenuItemClick = (path) => {
    navigate(path)
    setOpen(false)
  }

  const handleUserMenuItemClick = (setting) => {
    handleCloseUserMenu()
    if (setting === 'Profile') {
      navigate('/profile')
    } else if (setting === 'Logout') {
      navigate('/sign-in')
    }
  }

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
                flexGrow: 1,
              }}
            >
              <img
                src={logo}
                style={logoStyle}
                alt="logo of travel-planner"
                onClick={() => handleMenuItemClick('/')}
              />
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  color="inherit"
                  aria-label="search"
                  sx={{ p: 0 }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <AnimatedDiv>
                  {'Capture your thoughts, organize your life.'}
                </AnimatedDiv>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode
                mode={mode}
                toggleColorMode={toggleColorMode}
              />
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      alt="Travel Admin"
                      src={avatarImg}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleUserMenuItemClick(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  avatarImg: PropTypes.string,
}

export default AppAppBar
