import { Dialogs, TouchAction } from '@nativescript/core'
import { NavigatedData, Page } from '@nativescript/core'
import { PictureViewModel } from './picture-view-model'
import { takePicture } from '@nativescript/camera'
import { ImageSource } from '@nativescript/core/image-source'
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
            var milliseconds = (new Date).getTime
            takePicture({width:300, height:300, keepAspectRatio:true}).then((function(img) {
                let source = new ImageSource()
                source.saveToFileAsync(appRootFolder.path + milliseconds , "png")
                }))
            }
        })
    }
      

