import EventApi from '$lib/boilerplate/libraries/xioni/event'

/*

  getMany() Parameter:
  ********************

  "eventModule"?               [Number|String]
  "eventConfig"?               [Object|undefined]
	"eventConfig.startsBefore?"  [Date]
	"eventConfig.startsAfter?"   [Date]
	"eventConfig.endsBefore?"    [Date]
	"eventConfig.endsAfter?"     [Date]

*/

const eventModule = 1289
const eventConfig = { endsAfter: new Date() }

export const load = async ({ fetch }) => {
	const getEvents = EventApi(fetch).getMany

	return {
		events: await getEvents(eventModule, eventConfig)
	}
}
