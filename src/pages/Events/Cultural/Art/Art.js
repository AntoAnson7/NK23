import { EventID } from '../../eventDeets'
import {RenderSubPage} from '../../../../components/RenderSubPage'

export function Art() {
  const Events=EventID.cultural_art

  return (
    <RenderSubPage subEvent={Events}/>
  )
}
