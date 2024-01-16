import { View, ItemEventData, SwipeGestureEventData, SwipeDirection, NavigatedData, Page, Dialogs } from '@nativescript/core'

import { HomeViewModel } from './home-view-model'
import { Item } from './shared/item'
import * as imagePickerPlugin from '@nativescript/imagepicker';
import * as camera from '@nativescript/camera'
import { ImageSource, knownFolders, path } from '@nativescript/core';

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
  newItemName.text = ""
  newItemDate.text = ""
  page.getViewById("takePicture").backgroundColor = "grey";
  page.getViewById("selectImage").backgroundColor = "grey";
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
                      page.getViewById("selectImage").backgroundColor = "#075B88";
                  });
              });
      }).catch((err) => {
          console.log("Error -> " + err.message)
    })
}

export function takePicture() {
  camera.takePicture({width: 300, height: 300, keepAspectRatio: false, saveToGallery: true})
  .then((imageAsset) => {
    console.log('image taken')
    ImageSource.fromAsset(imageAsset)
      .then((imageSource: ImageSource) => {
      const folderPath: string = knownFolders.documents().path;
      const fileName: string = "picture_" + new Date().getTime() + ".jpg";
      const filePath: string = path.join(folderPath, fileName);
      const saved: boolean = imageSource.saveToFile(filePath, "jpg");
      if (saved) {
        selectedPicturePath = filePath
        page.getViewById("takePicture").backgroundColor = "#075B88";
        console.log("Saved: " + filePath);
        console.log("Image saved successfully!");
      } else {
          console.log("Image could not be saved!");
      }
    })
  })
}