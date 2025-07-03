# event-notifier

A minimal event system built on the [Subscriber-Controlled Pattern](https://github.com/huukhanhnguyen/subscriber-controlled-pattern),  
which empowers listeners to handle their own cleanup automatically.

## Install

```bash
npm install event-notifier
```

> Or use directly via CDN:
> 
```html
<script src="https://cdn.jsdelivr.net/npm/event-notifier@1.0.2/dist/index.global.js"></script>
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

### `removeListener(event: string, listener: function)`

Manually removes a specific listener.


### `notify(event: string, ...args: any[])`

Triggers all listeners for the given event.  
## Tutorial 
### How add listener call once time

```js
import Notifier from 'event-notifier';

const notifier = new Notifier();

function listener(data) {
  console.log('Received:', data);
}

const wrapper = (data) => {
  notifier.removeListener('userLogin', wrapper);
  listener(data);
};

notifier.addListener('userLogin', wrapper);

notifier.notify('userLogin', 'User logged in!');
notifier.notify('userLogin', 'Will not be called again');

```

## TypeScript
```ts
import type { Listener } from 'event-notifier';
```
> Here is the type definition for reference only

```ts
type Listener = ((...args: any[]) => void) & {
  onCleanup?: (release: () => void) => void;
};
```
License MIT © [Khánh Nguyễn](https://github.com/huukhanhnguyen)
