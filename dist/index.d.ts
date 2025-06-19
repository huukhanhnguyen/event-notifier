declare class Notifier {
  constructor();

  addListener(event: string, listener: Listener): () => void;
  addOnceListener(event: string, listener: Listener): void;
  removeListener(event: string, listener: Listener): void;
  notify(event: string, ...args: any[]): void;
  removeAllListeners(event?: string): void;
}

type Listener = {
  (...args: any[]): void;
  onCleanup?: (release: () => void) => void;
};

export default Notifier;
