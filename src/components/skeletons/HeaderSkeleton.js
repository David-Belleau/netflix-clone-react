import Skeleton from '@mui/material/Skeleton'

const styles = {
  banner: {
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    height: '28rem',
  },
}

const HeaderSkeleton = () => {
  return (
    <header style={styles.banner}>
      <div className="banner__content">
        <h1 className="banner__title">
          <Skeleton animation="wave" width={210} sx={{bgcolor: 'grey.900'}} />
        </h1>
        <h2 className="banner__text">
          <Skeleton animation="wave" sx={{bgcolor: 'grey.900'}} />
          <Skeleton animation="wave" sx={{bgcolor: 'grey.900'}} />
          <Skeleton animation="wave" sx={{bgcolor: 'grey.900'}} />
        </h2>
        <div className="banner__buttons">
          <button className="banner__button banner__button--white">
            Lecture
          </button>
          <button className="banner__button banner__button--black">
            Plus d'infos
          </button>
        </div>
      </div>
      <div className="banner--linearGradient"></div>
    </header>
  )
}

export {HeaderSkeleton}
