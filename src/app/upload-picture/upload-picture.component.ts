import { Component, OnInit } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'fr-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent {

  task: AngularFireUploadTask;

  results$: Observable<any>;

  isLoading = false;
  image: string;

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore) { }

  startUpload(fileAsBase64: string) {
    this.isLoading = true;
    const docId = this.afs.createId();
    const path = `${docId}.jpg`;
    const photoRef  = this.afs.collection('photos').doc(docId);
    this.results$ = photoRef.valueChanges().pipe(
      filter(data => !!data),
      tap(data => this.isLoading = false)
    );
    this.image = 'data:image/jpg;base64,' + fileAsBase64;
    this.task = this.storage.ref(path).putString(this.image, 'data_url');
  }

  fileEvent($event) {
    const fileSelected: File = $event.target.files[0];
    const reader = new FileReader();
    if ($event.target.files && $event.target.files.length > 0) {
      const file = $event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const res = reader.result.split(',')[1];
        this.startUpload(res);
      };
    }
  }
}
