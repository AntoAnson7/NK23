import { EventID } from '../../eventDeets'
import {RenderSubPage} from '../../../../components/RenderSubPage'

export function Board() {
  const Events=EventID.cultural_board

  return (
    <RenderSubPage subEvent={Events}/>
  )
}
