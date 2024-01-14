import { NavigatedData, Page } from '@nativescript/core'
import { PictureViewModel } from './picture-view-model'
import * as camera from '@nativescript/camera'
import { ImageSource, knownFolders, path } from '@nativescript/core';
import { requestPermissions } from '@nativescript/camera'
import * as imagePickerPlugin from '@nativescript/imagepicker';
requestPermissions();

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  page.bindingContext = new PictureViewModel()
}

export function handleTakePicture() {
    camera.takePicture({width: 300, height: 300, keepAspectRatio: false, saveToGallery: true})
    .then((imageAsset) => {
        console.log('image taken')
        savePicture(imageAsset, 'your_picture_url');})
    .catch((err) => {
        console.log("Error -> " + err.message)
    })
}


export function savePicture(imageAsset, picture_url) {
    console.log("Try to save picture");
    ImageSource.fromAsset(imageAsset)
            .then((imageSource: ImageSource) => {
            const folderPath: string = knownFolders.documents().path;
            const fileName: string = "test.jpg";
            const filePath: string = path.join(folderPath, fileName);
            const saved: boolean = imageSource.saveToFile(filePath, "jpg");

            if (saved) {
                console.log("Gallery: " + picture_url);
                console.log("Saved: " + filePath);
                console.log("Image saved successfully!");
            } else {
                console.log("Image could not be saved!");
            }
    }).catch((err) => {
        console.log("Error -> " + err.message)
    })
};



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

     

