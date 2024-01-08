import { Observable } from '@nativescript/core'
import { Item } from './shared/item'

export class HomeViewModel extends Observable {
  items: Array<Item>

  constructor() {
    super()

    this.items = new Array<Item>(
      {
        name: 'Item 1',
        image: 'Image for Item 1',
        date: new Date()
      },
      {
        name: 'Item 2',
        image: 'Image for Item 2',
        date: new Date()
      }
    )
  }
}
