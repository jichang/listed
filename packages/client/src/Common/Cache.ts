import { Option } from "@proveit/shared";

export class Cache<K, V> {
  items: { key: K; val: V }[] = [];

  constructor(private limit: number) {}

  insert(key: K, val: V) {
    this.items.push({
      key,
      val
    });

    if (this.items.length > this.limit) {
      this.items = this.items.slice(this.items.length - this.limit);
    }
  }

  find(key: K): Option<V> {
    let index = this.items.findIndex(item => item.key === key);
    if (index !== -1) {
      return this.items[index].val;
    } else {
      return null;
    }
  }

  remove(key: K): Option<V> {
    let index = this.items.findIndex(item => item.key === key);
    if (index !== -1) {
      let item = this.items[index];
      this.items.splice(index, 1);

      return item.val;
    } else {
      return null;
    }
  }
}
