import { Client } from 'https://deno.land/x/mqtt@0.1.2/deno/mod.ts'
import config from '../config.ts'

const configData = await config

export default async function mqtt(): Promise<Client> {
	const client = new Client({
		url: `mqtt://${configData.MQTT_HOST}:1883`,
		username: configData.MQTT_USERNAME,
		password: configData.MQTT_PASSWORD,
	})
	// Add events
	client.on('connected', () => {
		console.log(`Success conection - Agent ${configData.MQTT_USERNAME}`)
	})
	await client.connect()

	return client
}
