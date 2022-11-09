const API_URL = process.env.REACT_APP_API_URL
const AUTH_URL = process.env.REACT_APP_AUTH_URL
const API_KEY = process.env.REACT_APP_API_KEY
const imagePath = process.env.REACT_APP_IMAGE_URL
const lang = 'fr-fr'
const imagePathOriginal = `${imagePath}/original`
const imagePath400 = `${imagePath}/w400`
const TYPE_TV = 'tv'
const TYPE_MOVIE = 'movie'
const localStorageTokenKey = 'netflix_auth_token'

export {
    API_URL,
    AUTH_URL,
    API_KEY,
    lang,
    imagePath,
    imagePathOriginal,
    imagePath400,
    TYPE_TV,
    TYPE_MOVIE,
    localStorageTokenKey
}