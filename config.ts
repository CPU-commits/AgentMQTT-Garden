import { load } from 'https://deno.land/std@0.179.0/dotenv/mod.ts'
import { z } from 'https://deno.land/x/zod@v3.21.4/mod.ts'

async function registerConfig(
	configSchema: z.Schema<{
		MQTT_HOST: string
		MQTT_USERNAME: string
		MQTT_PASSWORD: string
		LATITUDE_LONGITUDE: string
		RAPIDAPI_KEY: string
		RAPIDAPI_HOST: string
	}>,
): Promise<z.infer<typeof configSchema>> {
	const denoEnv = Deno.env.get('DENO_ENV')
	console.log(`Deno env: ${denoEnv ?? 'dev'}`)
	if (denoEnv && denoEnv === 'prod') {
		const configData = await load()
		return configSchema.parse(configData)
	}
	return configSchema.parse(Deno.env.toObject())
}

export default registerConfig(
	z.object({
		MQTT_HOST: z.string(),
		MQTT_USERNAME: z.string(),
		MQTT_PASSWORD: z.string(),
		LATITUDE_LONGITUDE: z.string(),
		RAPIDAPI_KEY: z.string(),
		RAPIDAPI_HOST: z.string(),
	}),
)
