import React from 'react'
import {TYPE_MOVIE} from '../config'
import {useFictionFilter} from '../utils/hooksFiction'
import {RowView} from './RowView'
import {RowSkeleton} from './skeletons/RowSkeleton'

const Row = ({
  title = '',
  wideImage = true,
  type = TYPE_MOVIE,
  param,
  filter = 'popular',
}) => {
  const data = useFictionFilter(type, filter, param)

  if (!data) {
    return <RowSkeleton title={title} wideImage={wideImage} />
  }

  return <RowView data={data} title={title} type={type} wideImage={wideImage} />
}

export {Row}
