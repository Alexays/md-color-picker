/* @flow         */
/* @flow-runtime */

"use strict"
import { Line } from '../Line/index.js'
import EventEmitter from 'wolfy87-eventemitter'


export const Grid = (element: HTMLElement, colors: string[][], ee: EventEmitter) => {

    const gridWrapper = document.createElement("div")
    gridWrapper.setAttribute("class", "grid-wrapper")
    const grid = document.createElement("div")
    grid.setAttribute("class", "grid mdc-dialog__surface")
    colors.forEach((line) => Line(grid, line, ee))
    gridWrapper.appendChild(grid)
    element.appendChild(gridWrapper)

}