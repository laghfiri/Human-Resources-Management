import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UploadFileService} from '../../services/upload-file.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-apload',
  templateUrl: './list-apload.component.html',
  styleUrls: ['./list-apload.component.css']
})
export class ListAploadComponent implements OnInit {

  showFile = false;
  fileUploads: Observable<string[]>;
  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {

  }

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploadService.getFiles();
    }
  }


}
