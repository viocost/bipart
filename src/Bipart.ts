export class Bipart<KT, VT> {
  private keys: Map<KT, VT> = new Map();
  private values: Map<VT, KT> = new Map();

  [Symbol.iterator] = function* () {
    for (const [key, value] of this.keys) {
      yield [key, value];
    }
  };

  static fromArrays<KT = any, VT = any>(
    keys: Array<KT>,
    values: Array<VT>
  ): Bipart<KT, VT> {
    if (!Array.isArray(keys) || !Array.isArray(values)) {
      throw new Error("The input must be array of keys and array of values");
    }
    if (keys.length != values.length) {
      throw new Error(
        "Invalid input: expected input arrays to be of the same length"
      );
    }

    return keys.reduce((acc, key, index) => {
      acc.set(key, values[index]);
      return acc;
    }, new Bipart<KT, VT>());
  }

  constructor(obj?: {}) {
    if (obj) {
      for (const key in obj) {
        this.set(key as unknown as KT, obj[key]);
      }
    }
  }

  set(key: KT, value: VT) {
    this.delete(key);
    this.deleteValue(value);
    if (key === undefined || value === undefined) return;
    this.keys.set(key, value);
    this.values.set(value, key);
    return this;
  }

  get(key: KT): VT | undefined {
    return this.keys.get(key);
  }

  getKey(value: VT): KT | undefined {
    return this.values.get(value);
  }

  delete(key: KT): boolean {
    const value = this.keys.get(key) as VT;
    return !!(
      Number(this.values.delete(value)) | Number(this.keys.delete(key))
    );
  }

  deleteValue(value: VT): boolean {
    const key = this.values.get(value) as KT;
    return !!(
      Number(this.keys.delete(key)) | Number(this.values.delete(value))
    );
  }

  has(key: KT): boolean {
    return this.keys.has(key);
  }

  hasValue(value: VT): boolean {
    return this.values.has(value);
  }

  clear(): void {
    for (const key of this.keys.keys()) {
      this.keys.delete(key);
    }

    for (const value of this.values.keys()) {
      this.values.delete(value);
    }
  }

  get size(): number {
    return this.keys.size;
  }
}
