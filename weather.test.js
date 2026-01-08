import { describe, it, expect, vi, beforeEach } from "vitest";
import { safeTrim, fetchWeather } from "./weather.js";

describe("safeTrim", () => {
  it("trims whitespace from user input", () => {
    expect(safeTrim("  Berlin ")).toBe("Berlin");
  });

  it("returns empty string for null/undefined", () => {
    expect(safeTrim(null)).toBe("");
    expect(safeTrim(undefined)).toBe("");
  });
});

describe("fetchWeather", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed temperature/humidity/wind from API response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        current: {
          temperature_2m: 10,
          relative_humidity_2m: 40,
          wind_speed_10m: 2
        }
      })
    });

    const w = await fetchWeather(1, 2);
    expect(w).toEqual({ temperature: 10, humidity: 40, wind: 2 });
  });

  it("throws an error when HTTP response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    await expect(fetchWeather(1, 2)).rejects.toThrow();
  });

  it("throws an error when API response structure is missing 'current'", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({})
    });

    await expect(fetchWeather(1, 2)).rejects.toThrow("Weather parse error");
  });
});
