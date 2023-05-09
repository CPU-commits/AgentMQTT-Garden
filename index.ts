import Climate from './climate/climate.ts'
import AgentMqtt from './mqtt/agent.ts'

function main() {
	// Climate
	const climate = new Climate()
	// Agent
	const fakeAgent = new AgentMqtt(climate)
	setInterval(() => {
		fakeAgent.sendFakeGardenMetrics()
	}, 5000)
}

main()
