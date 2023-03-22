import mqtt from './mqtt.ts'
import { Client } from 'https://deno.land/x/mqtt@0.1.2/deno/mod.ts'
import config from '../config.ts'
import Climate from '../climate/climate.ts'

const configData = await config

export default class AgentMqtt {
	private client: Client | undefined
	private climate: Climate

	constructor(climate: Climate) {
		this.climate = climate
		this.connect().then(() => {
			// Publish agent is fake
			this.publish(
				'agent/fake',
				JSON.stringify({
					agent: configData.MQTT_USERNAME,
					fake: true,
				}),
			)
			// Register plants domain
			this.publish(
				'garden/plants',
				JSON.stringify([{
					plant: 'Tomate',
					agent: configData.MQTT_USERNAME,
					max_temperature: 25,
					min_temperature: 10,
					max_rh: 50,
				}]),
			)
		})
	}

	private async connect() {
		this.client = await mqtt()
	}

	private generateFakeRH() {
		const rhMin = 20.0
		const rhMax = 80.0
		const rhHalf = (rhMin + rhMax) / 2.0
		const standardDeviation = (rhMax - rhHalf) / 3.0
		let rhCurrent = rhHalf +
			(Math.random() * 2 - 1) * standardDeviation
		if (rhCurrent < rhMin) {
			rhCurrent = rhMin
		} else if (rhCurrent > rhMax) {
			rhCurrent = rhMax
		}
		return rhCurrent.toFixed(0)
	}

	async sendFakeGardenMetrics() {
		try {
			const wheater = await this.climate.getRealtimeWeather()
			await this.publish(
				'garden/message',
				`agent:${configData.MQTT_USERNAME}.temperature:${
					wheater.current.temp_c.toFixed(1)
				}.rain:${
					wheater.current.precip_mm > 0.1
				}.rh:${this.generateFakeRH()}.day:${wheater.current.is_day}`,
			)
		} catch (err) {
			console.error(err)
		}
	}

	private async publish(topic: string, data: string) {
		await this.client?.publish(topic, data)
	}
}
