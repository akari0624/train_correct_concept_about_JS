import { strToArray } from "../index"

test("can split correct accessor path by `.`", () => {
  const rArr = strToArray("a.b.c")
  expect(rArr.length).toBe(3)
  expect(rArr[0]).toEqual("a")
  expect(rArr[1]).toEqual("b")
  expect(rArr[2]).toEqual("c")
});
