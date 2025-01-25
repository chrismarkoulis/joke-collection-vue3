import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { Button } from "../../src/components";

describe("Button.vue", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(Button);
    expect(wrapper.classes()).toContain("bg-blue-500");
    expect(wrapper.classes()).toContain("text-white");
    expect(wrapper.classes()).toContain("px-4");
  });

  it("applies correct size classes", () => {
    const sizes = { small: "text-sm", medium: "text-base", large: "text-lg" };

    Object.entries(sizes).forEach(([size, className]) => {
      const wrapper = mount(Button, { props: { size } });
      expect(wrapper.classes()).toContain(className);
    });
  });

  it("emits click event when clicked", async () => {
    const wrapper = mount(Button);
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("disables button when disabled prop is true", () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.classes()).toContain("disabled:opacity-50");
  });
});
