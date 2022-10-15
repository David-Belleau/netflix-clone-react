import React from 'react'
import { clientAuth } from '../utils/clientApi'

let pile = []

const logProfiler = data => {
  if (!pile.length) {
    return
  }
  
  clientAuth('monitoring', { data: pile })
  pile = []
}

setInterval(logProfiler, 10000)

const Profiler = ({ appData, phases = [], ...props }) => {
  const handleRender = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) => {
    if (!phases.length || phases.includes(phase)) {
      pile.push({
        appData,
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      })
    }
  }

  return <React.Profiler onRender={handleRender} {...props} />
}

export { Profiler }
