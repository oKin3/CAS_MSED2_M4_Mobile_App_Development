import { Dialogs } from '@nativescript/core'
import { NavigatedData, Page } from '@nativescript/core'
import { PictureViewModel } from './picture-view-model'
import * as camera from '@nativescript/camera'
import { Image } from '@nativescript/core'
import { ImageSource, knownFolders, path } from '@nativescript/core';

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  page.bindingContext = new PictureViewModel()
}

export function handleTakePicture() {
    camera.takePicture({width: 300, height: 300, keepAspectRatio: false, saveToGallery: true}).then((imageAsset) => {
        console.log('image taken')
    }).catch((err) => {
        console.log("Error -> " + err.message)
    })
}

// ToDo: not sure how to call/use this: 
export function savePicture(imageAsset) {
    ImageSource.fromAsset(imageAsset)
            .then((imageSource: ImageSource) => {
            const folderPath: string = knownFolders.documents().path;
            const fileName: string = "test.jpg";
            const filePath: string = path.join(folderPath, fileName);
            const saved: boolean = imageSource.saveToFile(filePath, "jpg");

            if (saved) {
                console.log("Gallery: " + this._dataItem.picture_url);
                console.log("Saved: " + filePath);
                console.log("Image saved successfully!");
            }
    })};

import * as imagePickerPlugin from '@nativescript/imagepicker';

export function selectImage() {
    let imagePickerObj = imagePickerPlugin.create({
        mode: "single"});
    imagePickerObj
        .authorize()
        .then((authResult) => {
            if(authResult.authorized) {
                return imagePickerObj.present()
                    .then(function(selection) {
                        selection.forEach(function(selected) {
                            this.imageSource = selected.asset;
                            this.type = selected.type;
                            this.filesize = selected.filesize;
                            //etc
                        });
                    });
            } else {
                // process authorization not granted.
                console.log('autorization not granted')
                // need to ask for permissions
            }
        })    
        .catch(function (e) {
            // process error
            console.log('there has been an error')
        });
}

     

