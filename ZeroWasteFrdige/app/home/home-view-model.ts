import { Observable, ObservableArray } from '@nativescript/core'
import { Item } from './shared/item'
import items from './shared/items.json'

export class HomeViewModel extends Observable {
  private _items: ObservableArray<Item>;

  constructor() {
    super()
    this.load();
  }
  
  load(): void {
    this._items = new ObservableArray([...items.todos]);
    this.notifyPropertyChange('todos', this._items);
    this.notifyPropertyChange('title', this.title);
    }

  remove(indexToDelete: number) {
    this._items.splice(indexToDelete, 1);
    this.notifyPropertyChange('title', this.title);
  }

  reset() {
    this.load();
  }

  add(newItem: string) {
    this._items.push({ name: newItem, date: '2023-05-05', image: 'test-image' });
  }

  get title(): string {
    return `A list of ${this._items.length} items`;
  }

  get todos(): ObservableArray<Item> {
    return this._items;
  }
}


