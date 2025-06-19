# event-notifier

A minimal event system built on the [Self Release Pattern](https://github.com/huukhanhnguyen/self-release-pattern),  
which empowers listeners to handle their own cleanup automatically.

## Install

```bash
npm install event-notifier
```

> Or use directly via CDN:
> 
```html
<script src="https://cdn.jsdelivr.net/npm/event-notifier@1/dist/index.umd.js"></script>
<script>
  const notifier = new EventNotifier(); // Global name in UMD
</script>
```

## Usage

```js
import Notifier from 'event-notifier';

function listener(data) {
  console.log('Received:', data);
}

// Optional auto-cleanup: unregister after 5 seconds
listener.onCleanup = (release) => {
  setTimeout(release, 5000);
};

const notifier = new Notifier();
notifier.addListener('userLogin', listener);

notifier.notify('userLogin', 'User logged in!');
```

## API

### `addListener(event: string, listener: function): () => void`

Adds a listener to an event.  
If `listener.onCleanup` exists, it's called with a release function.

### `addOnceListener(event: string, listener: function)`

Adds a listener that runs once, then unregisters automatically.

### `removeListener(event: string, listener: function)`

Manually removes a specific listener.

### `removeAllListeners(event?: string)`

Clears all listeners. Pass an event name to clear only that event.

### `notify(event: string, ...args: any[])`

Triggers all listeners for the given event.  

License MIT © [Khánh Nguyễn](https://github.com/huukhanhnguyen)
