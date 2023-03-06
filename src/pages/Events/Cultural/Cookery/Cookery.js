import { EventID } from '../../eventDeets'
import {RenderSubPage} from '../../../../components/RenderSubPage'

export function Cookery() {
  const Events=EventID.cultural_cookery

  return (
    <RenderSubPage subEvent={Events}/>
  )
}
