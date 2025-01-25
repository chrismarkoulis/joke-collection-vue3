import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { RatingStars } from "../../src/components";

describe("RatingStars.vue", () => {
  it("renders the correct number of stars based on modelValue", async () => {
    const wrapper = mount(RatingStars, {
      props: { modelValue: 3 },
    });

    const stars = wrapper.findAll("span");
    expect(stars.length).toBe(5);

    expect(stars[0].classes()).toContain("text-yellow-500");
    expect(stars[1].classes()).toContain("text-yellow-500");
    expect(stars[2].classes()).toContain("text-yellow-500");
    expect(stars[3].classes()).toContain("text-gray-400");
    expect(stars[4].classes()).toContain("text-gray-400");
  });

  it("emits an update when a star is clicked", async () => {
    const wrapper = mount(RatingStars, {
      props: { modelValue: 2 },
    });

    const stars = wrapper.findAll("span");

    //-- click on the 4th star
    await stars[3].trigger("click");

    //-- modelValue updated correctly
    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"]?.[0]).toEqual([4]);
  });
});
