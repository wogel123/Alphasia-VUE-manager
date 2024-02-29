import moment from "moment"

export const dateFormat = function (value, format) {
	return moment(String(value)).format(format)
}
// 'D MMM YYYY [à] hh:mm'