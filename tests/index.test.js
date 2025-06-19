import Notifier from '../src/index.js'

describe('Notifier', () => {
  it('should add and notify a listener', () => {
    const notifier = new Notifier()
    const mockFn = vi.fn()

    notifier.addListener('testEvent', mockFn)
    notifier.notify('testEvent', 'hello', 42)

    expect(mockFn).toHaveBeenCalledOnce()
    expect(mockFn).toHaveBeenCalledWith('hello', 42)
  })

  it('should not notify if listener is removed', () => {
    const notifier = new Notifier()
    const mockFn = vi.fn()

    notifier.addListener('removeEvent', mockFn)
    notifier.removeListener('removeEvent', mockFn)
    notifier.notify('removeEvent', 'bye')

    expect(mockFn).not.toHaveBeenCalled()
  })

  it('should throw if invalid args are passed', () => {
    const notifier = new Notifier()

    expect(() => notifier.addListener(123, () => { })).toThrow()
    expect(() => notifier.addListener('event', 'not-a-function')).toThrow()
  })

  it('should handle multiple listeners for one event', () => {
    const notifier = new Notifier()
    const fn1 = vi.fn()
    const fn2 = vi.fn()

    notifier.addListener('multi', fn1)
    notifier.addListener('multi', fn2)
    notifier.notify('multi', 'payload')

    expect(fn1).toHaveBeenCalledWith('payload')
    expect(fn2).toHaveBeenCalledWith('payload')
  })

  it('should support listener with onCleanup', () => {
    const notifier = new Notifier()
    const fn = vi.fn()
    fn.onCleanup = vi.fn()

    notifier.addListener('event', fn)
    expect(fn.onCleanup).toHaveBeenCalledOnce()

    // simulate unsubscribe call
    const unsubscribeFn = fn.onCleanup.mock.calls[0][0]
    unsubscribeFn()

    notifier.notify('event')
    expect(fn).not.toHaveBeenCalled()
  })

  it('should clean up empty event sets', () => {
    const notifier = new Notifier()
    const fn = () => { }

    notifier.addListener('cleanEvent', fn)
    notifier.removeListener('cleanEvent', fn)

    expect(notifier.listeners.cleanEvent).toBeUndefined()
  })
  
  it('should only call addOnceListener once', () => {
    const notifier = new Notifier()
    const fn = vi.fn()

    notifier.addOnceListener('onceEvent', fn)
    notifier.notify('onceEvent', '1st')
    notifier.notify('onceEvent', '2nd')

    expect(fn).toHaveBeenCalledOnce()
    expect(fn).toHaveBeenCalledWith('1st')
  })
})
