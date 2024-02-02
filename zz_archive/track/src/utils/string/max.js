
export const str_max = (string, max) => {
	if (!string) return ''
	return string.length > max ? `${string.slice(0, max)}…` : string
}
