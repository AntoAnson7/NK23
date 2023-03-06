import { EventID } from '../../eventDeets'
import {RenderSubPage} from '../../../../components/RenderSubPage'

export function Quiz() {
  const Events=EventID.cultural_quiz

  return (
    <RenderSubPage subEvent={Events}/>
  )
}
