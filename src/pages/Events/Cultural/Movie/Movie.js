import { EventID } from '../../eventDeets'
import {RenderSubPage} from '../../../../components/RenderSubPage'

export function Movie() {
  const Events=EventID.cultural_movie

  return (
    <RenderSubPage subEvent={Events}/>
  )
}
