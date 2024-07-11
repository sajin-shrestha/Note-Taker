// src/pages/NotFoundPage.jsx
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}))

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <Root>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
      >
        404
      </Typography>
      <Typography
        variant="h6"
        component="p"
        gutterBottom
      >
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
      >
        Go Home
      </Button>
    </Root>
  )
}

export default NotFoundPage
