
export const decimal_max = (num, max) => {
    let buffer = ((num.toString().split(".")[1] || "").length > max) ?
    	num.toFixed(max) : num
    return buffer
}
