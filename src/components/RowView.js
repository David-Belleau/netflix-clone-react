import React from 'react'
import {Link} from 'react-router-dom'
import {TYPE_MOVIE, imagePath400} from '../config'
import {RowSkeleton} from './skeletons/RowSkeleton'

const RowView = ({
  data = [],
  title = '',
  wideImage = true,
  type = TYPE_MOVIE,
}) => {
  if (!data) {
    return <RowSkeleton title={title} wideImage={wideImage} />
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__cards" role="listitem" aria-label={type}>
        {data.map(fiction => {
          return (
            <RowCard
              key={fiction.id}
              fiction={fiction}
              type={type}
              wideImage={wideImage}
            />
          )
        })}
      </div>
    </div>
  )
}

const RowCard = ({fiction, type, wideImage}) => {
  const buildImagePath = data => {
    const image = wideImage ? data?.backdrop_path : data?.poster_path
    return image ? `${imagePath400}${image}` : null
  }

  if (!fiction) {
    return <></>
  }

  return (
    <Link key={fiction.id} to={`/${type}/${fiction.id}`}>
      <div className="row__card row__card--height">
        <img src={buildImagePath(fiction)} alt={fiction?.name} />
      </div>
    </Link>
  )
}

export {RowView, RowCard}
