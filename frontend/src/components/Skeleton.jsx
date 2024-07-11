import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

const variants = ['h1', 'h3', 'body1', 'caption']

function TypographyDemo(props) {
  const { loading = false } = props

  return (
    <div>
      {variants.map((variant) => (
        <Typography
          component="div"
          key={variant}
          variant={variant}
        >
          {loading ? <Skeleton /> : <Skeleton />}
        </Typography>
      ))}
    </div>
  )
}

TypographyDemo.propTypes = {
  loading: PropTypes.bool,
}

export default function SkeletonAnimation() {
  return (
    <Box className="mx-40 my-28">
      <Grid
        container
        spacing={8}
      >
        <Grid
          item
          xs
        >
          <TypographyDemo loading />
        </Grid>
        <Grid
          item
          xs
        >
          <TypographyDemo />
        </Grid>
      </Grid>
    </Box>
  )
}
