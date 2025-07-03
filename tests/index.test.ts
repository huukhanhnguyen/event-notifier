import { describe, it, expect, vi } from "vitest";
import Notifier from "../src/index.js";
import type { Listener } from "../src/index.js";

describe("Notifier", () => {
  it("should register and call a listener", () => {
    const notifier = new Notifier();
    const spy = vi.fn();

    notifier.addListener("test", spy);
    notifier.notify("test", 123, "abc");

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(123, "abc");
  });

  it("should remove listener using cleanup function", () => {
    const notifier = new Notifier();
    const spy = vi.fn();

    const cleanup = notifier.addListener("click", spy);
    cleanup(); // manually removes the listener
    notifier.notify("click");

    expect(spy).not.toHaveBeenCalled();
  });

  it("should trigger onCleanup when listener is registered", () => {
    const notifier = new Notifier();
    const onCleanup = vi.fn();

    const fn: Listener = () => {};
    fn.onCleanup = onCleanup;

    const cleanup = notifier.addListener("destroy", fn);
    expect(onCleanup).toHaveBeenCalled();
    cleanup(); // remove to verify no side effect
  });
});
