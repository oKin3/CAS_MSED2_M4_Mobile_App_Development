import { Observable, ObservableArray } from '@nativescript/core'
import { Item } from './shared/item'
import items from './shared/items.json'

export class HomeViewModel extends Observable {
  private _items: ObservableArray<Item>;

  constructor() {
    super()
    this.load();
  }

  dateConverter = this.formatDate()
  
  load(): void {
    this._items = new ObservableArray([...items.fridgeItems]);
    this.notifyPropertyChange('fridgeItems', this._items);
    this.notifyPropertyChange('title', this.title);
    }

  remove(indexToDelete: number) {
    this._items.splice(indexToDelete, 1);
    this.notifyPropertyChange('title', this.title);
  }

  reset() {
    this.load();
  }

  add(newItemName: string, newItemDate: string, newItemImage: string) {
    if (newItemName) {
      this._items.push({ name: newItemName, date: newItemDate, image: newItemImage });
      this.notifyPropertyChange('title', this.title);
    }
  }

  edit(indexToDelete: number, itemNewName: string, itemNewDate: string, itemNewImage: string) {
    this._items.splice(indexToDelete, 1, {name: itemNewName, date: itemNewDate, image: itemNewImage});
    this.notifyPropertyChange('title', this.title);
  }

  editName(indexToEdit: number, itemNewName: string) {
    let itemToEdit = this._items.getItem(indexToEdit);
    let updatedItem = {
      name: itemNewName,
      image: itemToEdit.image,
      date: itemToEdit.date
    };

    this._items.setItem(indexToEdit, updatedItem);
    this.notifyPropertyChange('title', this.title);
    console.log(this._items.toJSON());
  }

  getName(indexToEdit: number, itemNewName: string) {
    let itemToEdit = this._items.getItem(indexToEdit);
    return itemToEdit.name;
  }

  editDate(indexToEdit: number, itemNewDate: string) {
    let itemToEdit = this._items.getItem(indexToEdit);
    let updatedItem = {
      name: itemToEdit.name,
      image: itemToEdit.image,
      date: itemNewDate
    };

    this._items.setItem(indexToEdit, updatedItem);
    this.notifyPropertyChange('title', this.title);
    console.log(this._items.toJSON());
  }

  getDate(indexToEdit: number) {
    let itemToEdit = this._items.getItem(indexToEdit);
    return itemToEdit.date;
  }

  get title(): string {
    return `A list of ${this._items.length} items`;
  }

  get entries(): ObservableArray<Item> {
    return this._items;
  }

  formatDate() {
    return {
      toView(value: number, format: string) {

        const date = new Date(value)
        const day = date.getDate().toString().padStart(2, "0")
        const month = (date.getMonth() + 1).toString().padStart(2, "0") // months are zero based in JS.
        const year = date.getFullYear().toString()

        return format.replace("dd", day)
          .replace("mm", month)
          .replace("yyyy", year)
      }
    }
  }

  sortItems() {
    console.log('Sorting');
    this._items.sort((a, b) => {
      let [dayA, monthA, yearA] = a.date.split('.');
      let dateA = new Date(+yearA, +monthA - 1, +dayA);
      let [dayB, monthB, yearB] = b.date.split('.');
      let dateB = new Date(+yearB, +monthB - 1, +dayB);
      if (dateA.getTime() > dateB.getTime()) return 1;
      if (dateA.getTime() < dateB.getTime()) return -1;
      return 0;
    });
    }
  }



