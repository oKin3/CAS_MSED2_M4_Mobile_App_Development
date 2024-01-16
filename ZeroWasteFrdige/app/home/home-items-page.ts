import { View, ItemEventData, SwipeGestureEventData, SwipeDirection, NavigatedData, Page, Dialogs } from '@nativescript/core'

import { HomeViewModel } from './home-view-model'
import { Item } from './shared/item'
import * as imagePickerPlugin from '@nativescript/imagepicker';

let page;
let model;
let selectedPicturePath;

export function onNavigatingTo(args: NavigatedData) {
  page = <Page>args.object
  model = new HomeViewModel();
  page.bindingContext = model
}

export function onItemTap(args: ItemEventData) {
  Dialogs.action({
    title: 'Choose your action',
    cancelButtonText: 'Cancel',
    actions: ['Edit', 'Delete'],
    cancelable: true,
  }).then((result) => {
    console.log(result)
    if (result === 'Edit') {
      Dialogs.prompt({
        title: 'Edit',
        message: 'Enter the new name',
        defaultText: 'new name',
        okButtonText: 'OK',
        neutralButtonText: 'Cancel',
      }).then((result) => {
        model.edit(args.index, result.text, result.text, result.text)
      })
    } else if(result == 'Delete') {
      model.remove(args.index)
    }
  })
}

export function reload(args: SwipeGestureEventData) {
  if (args.direction === SwipeDirection.down) {
  model.reset();
  }
}

export function add() {
  let newItemName = page.getViewById("newItemName");
  let newItemDate = page.getViewById("newItemDate");
  model.add(newItemName.text, newItemDate.text, selectedPicturePath);
  selectedPicturePath = ""
}

export function selectImage() {
  let imagePickerObj = imagePickerPlugin.create({
  mode: "single"});

  imagePickerObj
      .authorize()
      .then(() => {
          this.imageAssets = [];
          return imagePickerObj.present()
              .then(function(selection) {
                  selection.forEach(function(selected) {
                      console.log("Selection done: " + JSON.stringify(selection));
                      selectedPicturePath = selected.path;
                      // model.add("name", new Date().toISOString().split('T')[0], selected.path);
                      // this.imageSource = selected.asset;
                      // this.type = selected.type;
                      // this.filesize = selected.filesize;
                      // this.imageAssets = selection;
                  });
              });
      }).catch((err) => {
          console.log("Error -> " + err.message)
      })
}