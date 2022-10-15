import {render as renderReactTestingLib} from '@testing-library/react'
import {HistoryFictionProvider} from '../context/HistoryFictionContext'
import {QueryClient, QueryClientProvider} from 'react-query'
import {AppProviders} from 'context'

const wrapperHistoryContext = ({children}) => {
  return <HistoryFictionProvider>{children}</HistoryFictionProvider>
}
const queryClient = new QueryClient()

const wrapperReactQuery = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>
  )
}

const render = (ui, {...options} = {}) => {
  return renderReactTestingLib(ui, {wrapper: AppProviders, ...options})
}

export * from '@testing-library/react'
export * from './data'
export {render, wrapperHistoryContext, wrapperReactQuery}
