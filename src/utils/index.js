const setProp = (varName, val) => document.documentElement.style.setProperty(varName, val)

export function toggleCrosswordSize(factor) {
  setProp('--scale', factor)
}

export const hash = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)



