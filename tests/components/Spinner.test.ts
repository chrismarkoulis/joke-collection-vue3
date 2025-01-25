import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { Spinner } from "../../src/components";

describe("Spinner.vue", () => {
  it("renders the spinner correctly", () => {
    const wrapper = mount(Spinner);

    const spinner = wrapper.find("div > div");
    expect(spinner.exists()).toBe(true);
  });
});
