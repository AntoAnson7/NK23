import { EventID } from '../../eventDeets'
import {RenderSubPage} from '../../../../components/RenderSubPage'

export function General() {
  const Events=EventID.cultural_general

  return (
    <RenderSubPage subEvent={Events}/>
  )
}
