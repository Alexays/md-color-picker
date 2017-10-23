/* @flow         */
/* @flow-runtime */

import { MDCRipple, MDCRippleFoundation, util } from '@material/ripple';
import colors from 'material-colors/dist/colors'
import EventEmitter from 'wolfy87-eventemitter'
import { Grid } from './Picker/Grid/index.js'
import icon from './icons/paint.svg'
import { Option } from 'space-lift'
import _omit from 'lodash.omit'
import _map from 'lodash.map'
import './Picker/index.scss'

type ColorPickerConfig = {
    elementName: string;
    createIcon: boolean;
    defaultColor: string;
}

type Optional<T> = {
    value: T;
    type: string;
    get: () => *;
    isDefined: () => *;
    forEach: (a: *) => *;
    map: (a: *) => *;
    flatMap: (a: *) => *;
    filter: (a: *) => *;
    fold: (a: *, b: *) => *;
    orElse: () => *;
    getOrElse: () => *;
    toArray: () => *;
    toString: () => *;
    toJSON: () => *;
}

type Props = {
    element: Optional<HTMLElement>;
    toggle: Function;
    defaultColor: string;
    ee: EventEmitter;
    container: HTMLElement;
    hideOnBlur: Function;
}


const extract = (object: Object): string[][] =>
    _map(object, (item) => _map(item))

export const MdColorPicker = (config: ColorPickerConfig): EventEmitter => {

    const { elementName, createIcon, defaultColor } = config
    const ee = new EventEmitter()

    const element: Optional<HTMLElement> = Option(document.getElementById(elementName));
    const omitedColors = ['black', 'white', 'lightText', 'lightIcons', 'darkText', 'darkIcons']
    const materialColors = extract(_omit(colors, omitedColors))

    const materialNoAccent = materialColors.map((elem) =>
        elem.filter((color, index) => index <= 9)
    )

    const container = document.createElement("div")
    container.setAttribute("class", "color-container")

    const toggle = (force) => {
        if (container.getAttribute("class") === "color-container" && force !== false)
            container.setAttribute("class", "color-container-open")
        else
            container.setAttribute("class", "color-container")
        return false
    }
    Grid(container, materialNoAccent, ee)

    const hideOnBlur = (element: HTMLElement) => {
        element.addEventListener("blur", (event) => {
            toggle(false)
        })
    }

    const props: Props = {
        container, defaultColor, ee,
        element, hideOnBlur, toggle
    }

    if (createIcon)
        createWithIcon(props)
    else
        create(props)

    ee.on("grid_closed", toggle)
    return ee
}

const createWithIcon = (props: Props): void => {
    const { defaultColor, element, toggle, ee, container, hideOnBlur } = props
    const image = document.createElement("div")
    image.innerHTML = icon
    image.setAttribute("class", "round-btn mdc-elevation--z1")
    const ripple = new MDCRipple(image)
    image.addEventListener("click", toggle)

    Option(image.firstElementChild).fold(
        () => console.error("Something went wrong creating the color-picker"),
        (child: SVGSVGElement) => {

            child.style.fill = defaultColor
            ee.on("color-changed", (color) => {
                child.style.fill = color;
                return false
            })

        }
    )

    /**
     * we have to insert the icon, we assume that the parent
     * is a div
     */
    element.fold(
        () => console.error("Given element does not exists"),
        (elem: HTMLDivElement) => {
            hideOnBlur(elem)
            elem.appendChild(image)
            elem.appendChild(container)
        }
    )
}
/*
    We don't have to create an icon, so we assume that the color piker will be 
    binded to an input
*/
const create = (props: Props): void => {
    const { defaultColor, element, toggle, ee, container, hideOnBlur } = props
    element.fold(
        () => console.error("An error occured locating base element"),
        (elem: HTMLInputElement) => {
            Option(elem.parentElement)
                .fold(
                () => console.error("An error occured when creating the color-picker"),
                (parent: HTMLElement) => {
                    parent.appendChild(container)
                    elem.addEventListener("click", toggle)
                    hideOnBlur(elem)
                }
                )
        })
}

export default MdColorPicker
if (window)
    window["MdColorPicker"] = MdColorPicker