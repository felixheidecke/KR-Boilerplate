export default function randomString(): string {
	return Math.random().toString(32).slice(2, 10)
}
