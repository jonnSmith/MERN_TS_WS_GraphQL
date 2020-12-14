class Holder {
  public Instance;
  public ObjectHolder: Record<string, any> = {};
  private MapHolder: Map<string, Promise<any> | object | string | null | undefined> | undefined;

  public constructor() {
    this.Instance = new Holder();
    this.Instance.ObjectHolder = {};
    this.Instance.MapHolder = new Map();
    return this.Instance;
  }
  public fill(key, value) {
    this.Instance.MapHolder.set(key, value);
  }
  public take(key) {
    return this.Instance.MapHolder.get(key);
  }
  public async drain() {
   await this.Instance.MapHolder.forEach((value, key) => {
      this.Instance.ObjectHolder[key] = value;
    });
    this.Instance.MapHolder.clear();
    return this.Instance.ObjectHolder;
  }
}

export {Holder};
