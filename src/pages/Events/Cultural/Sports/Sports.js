import { EventID } from '../../eventDeets'
import {RenderSubPage} from '../../../../components/RenderSubPage'

export function Sports() {
  const Events=EventID.cultural_sports

  return (
    <RenderSubPage subEvent={Events}/>
  )
}
