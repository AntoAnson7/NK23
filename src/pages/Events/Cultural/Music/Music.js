import { EventID } from '../../eventDeets'
import {RenderSubPage} from '../../../../components/RenderSubPage'

export function Music() {
  const Events=EventID.cultural_music

  return (
    <RenderSubPage subEvent={Events}/>
  )
}
