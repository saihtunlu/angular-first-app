import { Component, OnInit, SimpleChanges } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/AppState'
import * as AuthActions from '../../core/store/auth/auth.action'
import * as attendanceActions from '../../core/store/attendance/attendance.action'
import * as faceApi from 'face-api.js';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-detector',
  templateUrl: './detector.component.html',
  styleUrls: ['./detector.component.css']
})
export class DetectorComponent implements OnInit {

  video: any;
  canvas: any;
  isChecking: boolean;
  isInitializing: boolean;
  tracks: MediaStreamTrack[] | undefined;
  isLoading: boolean;
  attendancesSubscription: Subscription;
  numOfCheck: number;
  constructor(private _store: Store<AppState>, private _fb: FormBuilder, public dialogRef: MatDialogRef<DetectorComponent>,) {
    this.isLoading = false
    this.isInitializing = false
    this.isChecking = false
    this.numOfCheck = 1
    this.attendancesSubscription = _store.select('attendance').subscribe((data: any) => {
      this.isLoading = data.isLoading;
      if (data.isAdded) {
        this.numOfCheck = this.numOfCheck + 1;
        if (this.numOfCheck == 3) {
          this.onNoClick()
        }
      }
    });
  }
  ngOnInit(): void {
    this.setupVideoChat()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async setupVideoChat() {
    this.isInitializing = true
    await faceApi.nets.tinyFaceDetector.loadFromUri('./assets/models'),
      this.video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    this.video.srcObject = stream
    this.video.addEventListener('play', async () => {
      this.isInitializing = false
      this.isChecking = true
      const videoBox = document.getElementById('videoBox');
      this.canvas = document.getElementById('canvas');
      const VideoCanvas: any = faceApi.createCanvasFromMedia(this.video);
      if (videoBox) {
        videoBox.append(VideoCanvas);
      }
      // ### Init configs
      const displayValues = {
        width: this.video.width,
        height: this.video.height
      };

      // ### Resize media elements
      faceApi.matchDimensions(VideoCanvas, displayValues)

      while (this.isChecking) {
        const detections =
          await faceApi.detectAllFaces(
            this.video,
            new faceApi.TinyFaceDetectorOptions()
          )

        const resizedDetections = faceApi.resizeResults(
          detections,
          displayValues
        );
        // ### Clear before picture
        VideoCanvas.getContext('2d').clearRect(0, 0, VideoCanvas.width, VideoCanvas.height)
        // ### Drawing  in to VideoCanvas
        faceApi.draw.drawDetections(VideoCanvas, resizedDetections);

        if (detections.length > 0 && detections[0].score > 0.95) {
          this.isChecking = false;
          this.getPic(detections[0].imageHeight, detections[0].imageWidth)
        }
      }
    })
    this.tracks = stream.getTracks();
  }
  logout(): void {
    this._store.dispatch(new AuthActions.AuthLogOut());
  }
  ngOnDestroy() {
    if (this.tracks) {
      this.tracks[0].stop()
    }
  }
  async getPic(height: any, width: any) {
    const canvas: any = document.createElement("CANVAS");
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.getContext('2d').drawImage(this.video, 0, 0, width, height);
    let data = canvas.toDataURL('image/png');
    let file = this.dataURLtoFile(data, "webcam");
    let formData = new FormData();
    formData.append("image", file);
    this._store.dispatch(new attendanceActions.AddNew(formData));
    this.video.pause()
    if (this.tracks) {
      this.tracks[0].stop()
    }
  }
  dataURLtoFile(dataURL: any, filename: any) {
    var arr = dataURL.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n),
      extension = mime.split("/")[1];
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename + "." + extension, { type: mime });
  }

}
