/* @flow         */
/* @flow-runtime */

import { Square } from '../Square/index.jsx'
import EventEmitter from 'wolfy87-eventemitter'

/**
 * 
 * @param {HTMLElement} element 
 * @param {string[]} colors 
 * @param {EventEmitter} ee
 */
export const Line = (element, colors, ee) => {
    const line = document.createElement("div")
    line.setAttribute("class", "line")
    colors.forEach((color) => Square(line, color, ee))
    element.appendChild(line)
}