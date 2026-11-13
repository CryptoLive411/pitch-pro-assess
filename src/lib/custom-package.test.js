import { describe, expect, test } from "bun:test";
import { customQuote, normalizeCustomServices, toggleCustomService } from "./custom-package";

const core = ["video", "coach", "scholarship", "placement"];
const mid = ["admissions", "arrival", "transferSupport"];
const top = ["english", "translation", "eligibility", "visa"];
const services = [
  ...core.map((id) => ({ id, p: [true, true, true] })),
  ...mid.map((id) => ({ id, p: [true, true, false] })),
  ...top.map((id) => ({ id, p: [true, false, false] })),
];

describe("Custom package rules", () => {
  test("base is always 4495 regardless of edited Essential price", () => {
    for (const essential of [0, 3000, 4495, 6000]) {
      expect(customQuote(services, 5395, 4795, essential, {}, 1)).toBe(4495);
    }
  });

  test("all Essential services are restored even when saved as deselected", () => {
    const restored = normalizeCustomServices(services, Object.fromEntries(core.map((id) => [id, false])));
    for (const id of core) expect(restored[id]).toBe(true);
  });

  test("Essential services cannot be deselected", () => {
    for (const id of core) expect(toggleCustomService(services, {}, id)[id]).toBe(true);
  });

  test("optional services remain removable without dropping below 4495", () => {
    const added = toggleCustomService(services, {}, "admissions");
    expect(customQuote(services, 5395, 4795, 4495, added, 1)).toBe(4570);
    const removed = toggleCustomService(services, added, "admissions");
    expect(removed.admissions).toBe(false);
    expect(customQuote(services, 5395, 4795, 4495, removed, 1)).toBe(4495);
  });

  test("support and optional additions never subtract from the base", () => {
    const all = Object.fromEntries(services.map(({ id }) => [id, true]));
    for (const years of [1, 2, 4]) expect(customQuote(services, 1000, 2000, 6000, all, years)).toBe(4495);
    expect(customQuote(services, 5395, 4795, 4495, all, 4)).toBe(5395);
  });
});