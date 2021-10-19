const expect = require("chai").expect;
const { checkBooking, readFile } = require("../src/index");

describe("Test Scheduling", function () {
  describe("Test day one", function () {
    it("Return available for input1.txt", function () {
      const dataFile = readFile("./data/input1.txt");
      const dataExpect = readFile("./data/output1.txt");
      const result = checkBooking(dataFile, 1);
      expect(result).to.equal(dataExpect);
    });
  });
  describe("Test day two", function () {
    it("Return available for input2.txt", function () {
      const dataFile = readFile("./data/input2.txt");
      const dataExpect = readFile("./data/output2.txt");
      const result = checkBooking(dataFile, 2);
      expect(result).to.equal(dataExpect);
    });
    it("Return available for input4.txt", function () {
      const dataFile = readFile("./data/input4.txt");
      const dataExpect = readFile("./data/output4.txt");
      const result = checkBooking(dataFile, 2);
      expect(result).to.equal(dataExpect);
    });
    it("Return available for input3.txt", function () {
      const dataFile = readFile("./data/input3.txt");
      const dataExpect = readFile("./data/output3.txt");
      const result = checkBooking(dataFile, 2);
      expect(result).to.equal(dataExpect);
    });
  });
  describe("Test day three", function () {
    it("Return available for input5.txt", function () {
      const dataFile = readFile("./data/input5.txt");
      const dataExpect = readFile("./data/output5.txt");
      const result = checkBooking(dataFile, 3);
      expect(result).to.equal(dataExpect);
    });
  });
});
