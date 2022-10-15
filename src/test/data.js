const sampleMovie = {
  adult: false,
  backdrop_path: "/trtFAmf4IcndxSh5tIfLwxPyW67.jpg",
  belongs_to_collection: null,
  budget: 0,
  genres: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 53,
      name: 'Thriller',
    },
  ],
  homepage: '',
  id: 628878,
  imdb_id: "tt4029412",
  original_language: 'en',
  original_title: 'Panama',
  overview:
    "Un ex-marine est embauché par un entrepreneur de la défense pour se rendre au Panama afin de conclure un accord sur les armes. Dans le processus, il devient impliqué dans l'invasion américaine du Panama et apprend une leçon importante sur la véritable nature du pouvoir politique.",
  popularity: 1455.045,
  poster_path: "/4ubzhDZAZGjoBIsrDr8UCBaNXUd.jpg",
  production_companies: [
    {
      id: 75355,
      logo_path: "/avj80RsunqwDbOS6oLp4plRE5UQ.png",
      name: "Yale Productions",
      origin_country: "US",
    },
    {
      id: 65649,
      logo_path: "/2xZVvFYyVtIHSo4vG5R0IIak0EL.png",
      name: "SSS Entertainment",
      origin_country: "US",
    },
    {
      id: 96310,
      logo_path: "/gLZ8Pncu3OHwepiGkSvL735hqNC.png",
      name: "LB Entertainment",
      origin_country: "US",
    },
    {
      id: 130899,
      logo_path: null,
      name: "SSS Film Capital",
      origin_country: "US",
    },
    {
      id: 47129,
      logo_path: null,
      name: "Do More Productions",
      origin_country: ""
    },
    {
      id: 170350,
      logo_path: null,
      name: "Grandave Capital",
      origin_country: "",
    },
    {
      id: 170351,
      logo_path: null,
      name: "Idiot Savant Pictures",
      origin_country: "",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "PR",
      name: "Puerto Rico",
    },
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  release_date: '2022-03-17',
  revenue: 0,
  runtime: 94,
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
  ],
  status: 'Released',
  tagline: "La révolution s'échauffe.",
  title: 'Panama',
  video: false,
  vote_average: 5.9,
  vote_count: 47,
}

const bookmark = {
  uid: '21ad0bd836b90d08f4cf640b4c298e7c',
  movies: [718930, 616037, 628878, 718789, 756999, 438148],
  series: [92782, 92830, 66732, 71790, 1416, 2734],
}

const resultsMovies = { results: [{ ...sampleMovie }] }
export { sampleMovie, resultsMovies, bookmark }
