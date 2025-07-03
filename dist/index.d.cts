type Listener = ((..._args: unknown[]) => void) & {
    onCleanup?: (_release: () => void) => void;
};
declare class Notifier {
    private _listeners;
    addListener(event: string, listener: Listener): () => void;
    removeListener(event: string, listener: Listener): void;
    notify(event: string, ...args: unknown[]): void;
}

export { type Listener, Notifier as default };
