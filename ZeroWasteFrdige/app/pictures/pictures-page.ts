import { Dialogs, ImageAsset, TouchAction } from '@nativescript/core'
import { NavigatedData, Page } from '@nativescript/core'
import { PictureViewModel } from './picture-view-model'
import * as camera from '@nativescript/camera'
import { Image } from '@nativescript/core'
import { knownFolders } from '@nativescript/core'

const appRootFolder = knownFolders.currentApp()

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  page.bindingContext = new PictureViewModel()
  console.log(appRootFolder.path)
}

export function handleTakePicture() {
    Dialogs.confirm({
        title: 'Do you want to take a picture?',
        message: 'Are you sure you want to do this?',
        okButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if(result) {
            console.log('user is sure')
            camera.takePicture().then((imageAsset) => {
                console.log("Result is an image asset instance")
                var image = new Image()
                image.src = imageAsset
            }).catch((err) => {
                console.log("Error -> " + err.message)
            })
            }
        })
    }
      

