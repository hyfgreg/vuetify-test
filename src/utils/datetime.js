import { timeParse, timeFormat } from 'd3-time-format'
const FORMAT = '%Y-%m-%dT%H:%M:%S'
const DISPLAY_FORMAT = '%Y-%m-%d %H:%M:%S'
const DATE_FORMAT = '%Y-%m-%d'

export const strftime = timeFormat(FORMAT) // 如果格式不符合会返回1970-01-01T08:00:00, 可以是date也可以是整数
export const strptime = timeParse(FORMAT) // 如果格式不符合会返回null

export const strfdate = timeFormat(DATE_FORMAT)
export const strpdate = timeParse(DATE_FORMAT)

export const strftimeDisplay = timeFormat(DISPLAY_FORMAT)

export const datetime = {
  strftime,
  strptime,
  strfdate,
  strpdate,
  strftimeDisplay
}
