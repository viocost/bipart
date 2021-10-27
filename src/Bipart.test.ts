import { Bipart } from "./Bipart";

describe(Bipart.name, () => {
  it("Should initialize empty map", () => {
    const map = new Bipart();
    const mapTyped = new Bipart<string, number>();
    expect(map).toBeDefined();
  });

  it("Should initialize map from object", () => {
    const map = new Bipart({
      a: 1,
      b: 2,
    });
    expect(map).toBeDefined();
    expect(map.get("a")).toBe(1);
    expect(map.getKey(1)).toBe("a");
  });

  it("Should initialize map from 2 arrays", () => {
    const map = Bipart.fromArrays([1, 2, 3], ["a", "b", "c"]);
    expect(map.get(1)).toBe("a");
    expect(map.get(2)).toBe("b");
  });

  it("Should initialize map from 2 empty arrays", () => {
    const map = Bipart.fromArrays([], []);
    expect(map.get(1)).toBeUndefined;
  });

  it("Should handle undefined set", () => {
    const map = new Bipart();
    map.set(4, undefined);
    expect(map.getKey(undefined)).toBeUndefined();

    map.set(4, "a");
    map.set(undefined, "a");
    expect(map.getKey("a")).toBeUndefined();
    expect(map.get(4)).toBeUndefined();
    expect(map.get(undefined)).toBeUndefined();
  });

  it("Should be able to traverse map", () => {
    const map = getTestMap();

    for (const [key, val] of map) {
      expect(map.get(key)).toBe(val);
      expect(map.getKey(val)).toBe(key);
    }
  });

  it("Should handle nulls", () => {
    const map = getTestMap();
    map.set(1, null);
    expect(map.get(1)).toBe(null);
    map.set(2, null);
    expect(map.get(1)).toBe(undefined);
    expect(map.getKey(null)).toBe(2);
    map.deleteValue(null);
    expect(map.getKey(null)).toBeUndefined();
  });

  it("Should handle nullish values", () => {
    const map = getTestMap();
    map.set(1, "");
    map.set(0, "hello");
    expect(map.get(1)).toBe("");
    expect(map.get(0)).toBe("hello");

    expect(map.getKey("")).toBe(1);
  });

  it("Should handle complex objects", () => {
    class A {}
    class B {}
    const map = new Bipart<A, B>();
    const a1 = new A();
    const b1 = new B();
    map.set(a1, b1);
    expect(map.get(a1)).toBe(b1);
    expect(map.getKey(b1)).toBe(a1);
  });

  it("Should be able to delete entries", () => {
    const map = getTestMap();
    map.delete("a");
    map.deleteValue(3);
    expect(map.get("a")).toBeUndefined();
    expect(map.get("b")).toBe(2);
    expect(map.get("c")).toBeUndefined();
  });

  it("Should return the size of the map", () => {
    const map = getTestMap();
    expect(map.size).toBe(3);
  });

  it("Should be able to say whether key or value exist in a map", () => {
    const map = getTestMap();
    expect(map.has("a")).toBeTruthy();
    expect(map.has("b")).toBeTruthy();
    expect(map.has("c")).toBeTruthy();
    expect(map.hasValue(1)).toBeTruthy();
    expect(map.hasValue(2)).toBeTruthy();
    expect(map.hasValue(3)).toBeTruthy();
    expect(map.hasValue(5)).toBeFalsy();
    expect(map.has("s")).toBeFalsy();
  });

  it("Should be able to clear map", () => {
    const map = getTestMap();
    expect(map.size).toBe(3);
    map.clear();
    expect(map.size).toBe(0);
  });
});

function getTestMap() {
  return new Bipart({
    a: 1,
    b: 2,
    c: 3,
  });
}
