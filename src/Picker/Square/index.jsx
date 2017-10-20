/* @flow         */
/* @flow-runtime */

import EventEmitter from 'wolfy87-eventemitter'

export const Square = (element: HTMLElement, color: string, ee: EventEmitter) => {
    const square = document.createElement("div")
    square.setAttribute("class","square grow")
    // mouse down event fires before the click event
    
    square.addEventListener("mousedown", (event: Event)=>{
        event.stopImmediatePropagation()
        event.stopPropagation()
        ee.trigger("color-changed",[color])
        ee.trigger("grid_closed",null)
    })

    square.style.backgroundColor = color
    element.appendChild(square)
}