
// this function combine multiple classes arrays in one and convert the resulted array into a string
// args : args is used to get all function arguments: [type: array]
export const addClass = (...args:any) => {
    const a = args?.flat()
    return a?.join(' ')
}

// this function create a class modifier based on the component default class 
// a : default class of the component: [type: string]
// b : an array with custom classes which will be modify the default class: [type: array]
export const classModifier = (a:string, b:Array<string>) => {
    // if(!b) return a
    const c = b?.map(e => `${a}--${e}`)
    b && c?.unshift(a)
    return c
}

// this function add an active class on the component when a condition is meet
// a : current classes array: [type: array]
// b : a class modifier used to show if the component is active: [type: string]
// c : the conditional used to add the activ modifier: [type: boolean]

export const addActive = (a:string[], b:string, c:any) => {
    a = a?.filter(e => e !== `${a[0]}--${b}`)
    c && a?.push(`${a[0]}--${b}`)
    return a;
}

const headTag = document.getElementsByTagName('head')[0];
const styleTag = document.createElement("style");

export const setStyle = (a:any) => {
    styleTag.innerHTML = `
        :root {
            --theme-color-primary: ${a?.primary};
            --theme-color-secondary: ${a?.secondary};
            --theme-color-background: ${a?.background};
            --theme-color-text: ${a?.text};
        }
    `
    headTag.appendChild(styleTag)
}

