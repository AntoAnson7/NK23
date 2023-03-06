import { EventID } from '../../eventDeets'
import {RenderSubPage} from '../../../../components/RenderSubPage'

export function Gaming() {
  const Events=EventID.cultural_gaming

  return (
    <RenderSubPage subEvent={Events}/>
  )
}
