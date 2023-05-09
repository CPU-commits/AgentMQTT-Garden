import Climate from './climate/climate.ts'
import AgentMqtt from './mqtt/agent.ts'
import { Application } from 'https://deno.land/x/oak/mod.ts'

async function startWeb() {
	const app = new Application()
	app.use((ctx) => {
		ctx.response.body = {
			health: true,
		}
	})

	await app.listen({
		port: 8000,
	})
}

function main() {
	// Climate
	const climate = new Climate()
	// Init API
	startWeb()
	// Agent
	const fakeAgent = new AgentMqtt(climate)
	setInterval(() => {
		fakeAgent.sendFakeGardenMetrics()
	}, 5000)
}

main()
