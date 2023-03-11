import { EventID } from '../../eventDeets'
import {RenderSubPage} from '../../../../components/RenderSubPage'

export function Workshops() {
  const Events=EventID.technical_workshop

  return (
    <RenderSubPage subEvent={Events}/>
  )
}
