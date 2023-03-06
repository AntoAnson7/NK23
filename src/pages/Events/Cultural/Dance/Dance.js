import { EventID } from '../../eventDeets'
import {RenderSubPage} from '../../../../components/RenderSubPage'

export function Dance() {
  const Events=EventID.cultural_dance

  return (
    <RenderSubPage subEvent={Events}/>
  )
}
