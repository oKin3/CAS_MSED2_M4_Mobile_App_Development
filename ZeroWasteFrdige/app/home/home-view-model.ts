import { Observable } from '@nativescript/core'
import { Item } from './shared/item'
import items from './shared/items.json'

export class HomeViewModel extends Observable {
  private _items: Item[];

  constructor() {
    super()

    this._items = this.load();
  }
  load(): Item[] {
    console.log('LOADING ITEMS')
    return items.todos;
  }

  remove(indexToDelete: number) {
    console.log('REMOVING ITEM 2');
    this._items.splice(indexToDelete, 1);
  }

  get title(): string {
    console.log('I am in title')
    return `A list of ${this._items.length} todos`;
    }
  get todos(): Item[] {
    return this._items;
    }
}


