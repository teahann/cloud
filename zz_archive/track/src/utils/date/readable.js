const days = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat']

// ISO string to human readable
export const date_readable = (datetime, rules = '') => {
	let date = new Date(datetime)

	let day_name = days[date.getUTCDay()]
	let month = ("0" + (date.getUTCMonth() + 1)).slice(-2)
	let day = ("0" + date.getUTCDate()).slice(-2)
	let year = date.getUTCFullYear()
	let hrs = date.getUTCHours()
	let mins = ("0" + date.getUTCMinutes()).slice(-2)
	let suffix = hrs >= 12 ? 'PM' : 'AM'
	hrs = hrs % 12

	if (rules === 'day_only') {
		return `${day_name}day ${hrs}:${mins}${suffix}`
	} else {
		return `${day_name} ${hrs}:${mins}${suffix} (${month}/${day})`
	}
}
