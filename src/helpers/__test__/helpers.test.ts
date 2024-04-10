import { pressureConversion } from "../helpers";

describe("helpers", () => {
  describe("pressureConversion helper", () => {
    it("pressureConversion", () => {
      const result = pressureConversion(200);

      expect(result).toEqual(150);
    });
  });
});
