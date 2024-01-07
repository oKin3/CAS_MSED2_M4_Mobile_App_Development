import { Dialogs } from '@nativescript/core'
import { NavigatedData, Page } from '@nativescript/core'
import { PictureViewModel } from './picture-view-model'

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  page.bindingContext = new PictureViewModel()
}

export function handleTakePicture() {
    Dialogs.confirm({
        title: 'Do you want to take a picture?',
        message: 'Are you sure you want to do this?',
        okButtonText: 'Yes',
        cancelButtonText: 'No',
        neutralButtonText: 'Cancel',
      }).then((result) => {
        console.log(result)
      })
}


