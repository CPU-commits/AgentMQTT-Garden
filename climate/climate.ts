import config from '../config.ts'
import { Wheater } from '../models/wheater.model.ts'

const configData = await config

export default class Climate {
	async getRealtimeWeather(): Promise<Wheater> {
		const res = await fetch(
			`https://weatherapi-com.p.rapidapi.com/current.json?q=${configData.LATITUDE_LONGITUDE}`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': configData.RAPIDAPI_KEY,
					'X-RapidAPI-Host': configData.RAPIDAPI_HOST,
				},
			},
		)
		return await res.json()
	}
}
