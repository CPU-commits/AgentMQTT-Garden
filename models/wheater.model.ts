export type Wheater = {
	current: {
		temp_c: number
		temp_f: number
		is_day: 0 | 1
		humidity: number
		precip_mm: number
	}
}
