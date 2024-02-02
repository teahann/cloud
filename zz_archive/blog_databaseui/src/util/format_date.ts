export const format_date = (datetime) => {
	return new Date(datetime).toLocaleDateString('en-GB');
}