import { View, ItemEventData, SwipeGestureEventData, SwipeDirection, NavigatedData, Page } from '@nativescript/core'

import { HomeViewModel } from './home-view-model'
import { Item } from './shared/item'

let page;
let model;

export function onNavigatingTo(args: NavigatedData) {
  page = <Page>args.object
  model = new HomeViewModel();
  page.bindingContext = model
}

export function onItemTap(args: ItemEventData) {
  const view = <View>args.view
  const page = <Page>view.page
  const tappedItem = <Item>view.bindingContext

  page.frame.navigate({
    moduleName: 'home/home-item-detail/home-item-detail-page',
    context: tappedItem,
    animated: true,
    transition: {
      name: 'slide',
      duration: 200,
      curve: 'ease',
    },
  })
}

export function remove(args: ItemEventData){ 
  console.log(args.index)
  model.remove(args.index)
}

export function reload(args: SwipeGestureEventData) {
  console.log('SWIPING')
  if (args.direction === SwipeDirection.down) {
  model.reset();
  }
}

export function add() {
  console.log('ADDING')
  let newItem = page.getViewById("newItem");
  model.add(newItem.name);
}
