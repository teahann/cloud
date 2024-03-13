
export const today_datetime = () => {
  return new Date().toISOString().slice(0, 16)
}

export const datetime_to_sql = (d) => {
  return `${d.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/,'$1-$2-$3 $4:$5:00')} +00:00`;
}

export const sql_to_datetime = (d) => {
  const [date, time] = d.split('T');
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
