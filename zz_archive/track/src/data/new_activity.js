// All Activities follow this schema
export const new_activity = (type, data) => {
	return {
		'type': type,
		'time': new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString(),
		'data': data
	}
}
