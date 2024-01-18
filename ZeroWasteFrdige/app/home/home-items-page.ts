import { View, ItemEventData, SwipeGestureEventData, SwipeDirection, NavigatedData, Page, Dialogs, EventData, DatePicker } from '@nativescript/core'
import { HomeViewModel } from './home-view-model'
import * as imagePickerPlugin from '@nativescript/imagepicker';
import * as camera from '@nativescript/camera'
import { ImageSource, knownFolders, path } from '@nativescript/core';
camera.requestPermissions();

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
      edit(args.index)
    } else if(result == 'Delete') {
      model.remove(args.index)
    }
  })
}

export function edit(indexToEdit: number) {
  Dialogs.action({
    title: 'Choose your action',
    cancelButtonText: 'Cancel',
    actions: ['Edit Name', 'Edit Date'],
    cancelable: true,
  }).then((result) => {
    if (result === 'Edit Name') {
      let oldName = model.getName(indexToEdit)
      
      Dialogs.prompt({
        title: 'Edit',
        message: 'Enter the new name',
        defaultText: oldName,
        okButtonText: 'OK',
        neutralButtonText: 'Cancel',
      }).then((result) => {
          console.log(result)
          if (result.result === true)
          {
            model.editName(indexToEdit, result.text)
          }
        })
    }
    else if (result === 'Edit Date') {
      let oldDate = model.getDate(indexToEdit)
      
      Dialogs.prompt({
        title: 'Edit',
        message: 'Enter the new name',
        defaultText: oldDate,
        okButtonText: 'OK',
        neutralButtonText: 'Cancel',
      }).then((result) => {
          console.log(result)
          if (result.result === true)
          {
            model.editDate(indexToEdit, result.text)
          }
        })
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
  const date = newItemDate.date
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear().toString()
  let formatedDate = day + "." + month + "." + year

  model.add(newItemName.text, formatedDate, selectedPicturePath);
  selectedPicturePath = ""
  newItemName.text = ""
  page.getViewById("takePicture").backgroundColor = "#9DB2BF";
  page.getViewById("selectImage").backgroundColor = "#9DB2BF";
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
                      page.getViewById("takePicture").backgroundColor = "#9DB2BF";
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
        page.getViewById("selectImage").backgroundColor = "#9DB2BF";
        console.log("Saved: " + filePath);
        console.log("Image saved successfully!");
      } else {
          console.log("Image could not be saved!");
      }
    })
  })
}

export function sortItems() {
  model.sortItems()
  page.getViewById("allItems").refresh()
}