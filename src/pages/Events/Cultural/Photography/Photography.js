import { EventID } from '../../eventDeets'
import {RenderSubPage} from '../../../../components/RenderSubPage'

export function Photography() {
  const Events=EventID.cultural_photography

  return (
    <RenderSubPage subEvent={Events}/>
  )
}
