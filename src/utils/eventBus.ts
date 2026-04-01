type Handler = (...args: any[]) => void

class EventBus {
  private events: Map<string, Set<Handler>> = new Map()

  on(event: string, handler: Handler) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    this.events.get(event)!.add(handler)
  }

  off(event: string, handler: Handler) {
    this.events.get(event)?.delete(handler)
  }

  emit(event: string, ...args: any[]) {
    this.events.get(event)?.forEach((handler) => handler(...args))
  }
}

const emitter = new EventBus()
export default emitter
