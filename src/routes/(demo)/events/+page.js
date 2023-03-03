import EventApi from '$lib/boilerplate/libraries/xioni/event'

/*

  getMany() Parameter:
  ********************

  "eventModule"?               [Number|String]
  "eventConfig"?               [Object|undefined]
	"eventConfig.startsBefore?"  [String|Date]
	"eventConfig.startsAfter?"   [String|Date]
	"eventConfig.endsBefore?"    [String|Date]
	"eventConfig.endsAfter?"     [String|Date]

*/

const eventModule = 1289
const eventConfig = { endsAfter: 'today' }

export const load = async ({ fetch }) => {
	const getEvents = EventApi(fetch).getMany

	return {
		events: await getEvents(eventModule, eventConfig)
	}
}
