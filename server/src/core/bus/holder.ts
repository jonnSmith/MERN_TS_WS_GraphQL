class Holder {
  public Instance;
  public ObjectHolder: Record<string, any>;
  private MapHolder: Map<string, Promise<any>>;

  public constructor() {
    this.Instance = new Holder();
    this.ObjectHolder = {};
    this.MapHolder = new Map();
    return this.Instance;
  }
  public fill(key, value) {
    this.MapHolder.set(key, value);
  }
  public take(key) {
    return this.MapHolder.get(key);
  }
  public async drain() {
   await this.MapHolder.forEach((value, key) => {
      this.ObjectHolder[key] = value;
    });
    this.MapHolder.clear();
    return this.ObjectHolder;
  }
}

export {Holder};
