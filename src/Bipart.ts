export class Bipart<KT = any, VT = any> {
  private _keys: Map<KT, VT> = new Map();
  private _values: Map<VT, KT> = new Map();

  static fromObject<OT extends string, VT = any>(obj: Record<OT, VT>) {
    return Object.entries<VT>(obj).reduce((acc, [key, value]) => {
      acc.set(key as OT, value);
      return acc;
    }, new Bipart<OT, VT>());
  }

  static fromArrays<KT = any, VT = any>(
    keys: Array<KT>,
    values: Array<VT>
  ): Bipart<KT, VT> {
    if (!Array.isArray(keys) || !Array.isArray(values)) {
      throw new Error("The input must be array of _keys and array of _values");
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

  [Symbol.iterator](): IterableIterator<[KT, VT]> {
    const iterator = function* (this: Bipart<KT, VT>) {
      for (const [key, value] of this._keys) {
        yield [key, value] as [KT, VT];
      }
    };
    return iterator.call(this);
  }

  set(key: KT, value: VT) {
    this.delete(key);
    this.deleteValue(value);
    if (key === undefined || value === undefined) return;
    this._keys.set(key, value);
    this._values.set(value, key);
    return this;
  }

  get(key: KT): VT | undefined {
    return this._keys.get(key);
  }

  getKey(value: VT): KT | undefined {
    return this._values.get(value);
  }

  delete(key: KT): boolean {
    const value = this._keys.get(key) as VT;
    return !!(
      Number(this._values.delete(value)) | Number(this._keys.delete(key))
    );
  }

  deleteValue(value: VT): boolean {
    const key = this._values.get(value) as KT;
    return !!(
      Number(this._keys.delete(key)) | Number(this._values.delete(value))
    );
  }

  has(key: KT): boolean {
    return this._keys.has(key);
  }

  hasValue(value: VT): boolean {
    return this._values.has(value);
  }

  clear(): void {
    for (const key of this._keys.keys()) {
      this._keys.delete(key);
    }

    for (const value of this._values.keys()) {
      this._values.delete(value);
    }
  }

  keys(): IterableIterator<KT> {
    return this._keys.keys();
  }

  values(): IterableIterator<VT> {
    return this._keys.values();
  }

  get size(): number {
    return this._keys.size;
  }
}
