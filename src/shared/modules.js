import { AlcoholLevel } from "./options"

export const getLevel = (id) => {
    console.log(AlcoholLevel.find(e => e.value === Number(id)));
    return(AlcoholLevel.find(e => e.value === Number(id))?.text)
}