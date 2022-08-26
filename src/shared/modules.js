import { AlcoholLevel } from "./options";

/**
 * 나의 술레벨 숫자를 이름으로 바꿔준다.
 * @param {number|string} value 술레벨 숫자
 * @return {string} 술레벨 이름
 */
export const getLevel = (value) => {
    return(AlcoholLevel.find(e => e.value === Number(value))?.text)
}

/**
 * 나의 술레벨 이름을 숫자로 바꿔준다.
 * @param {string} text 술레벨 이름
 * @returns {number} 술레벨 숫자
 */
export const getLevelValue = (text) => {
    return(AlcoholLevel.find(e => e.text === text)?.text)
}