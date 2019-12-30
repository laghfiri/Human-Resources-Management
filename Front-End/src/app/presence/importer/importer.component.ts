import { Component, OnInit } from '@angular/core';
import {presence} from '../../model/model.presence';
import {PresenceService} from '../../../services/presence.service';
import {Observable} from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin';
import {async} from 'rxjs/internal/scheduler/async';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import {CongesService} from '../../../services/conges.service';
@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.css']
})
export class ImporterComponent implements OnInit {

  constructor(private presenceS:PresenceService,private cng:CongesService) {}

  ngOnInit() {

  }
  data:any;
  target: DataTransfer;
  presences=[];
  dataLoaded:boolean=true;
  selectedFiles: File;
  show:boolean=false;
  selectFile(evt) {
    this.target = <DataTransfer>(evt.target);

    if (this.target.files.length !== 1) throw new Error('Cannot use multiple files');
    this.selectedFiles=this.target.files[0];
    console.log(this.selectedFiles);
  }
  onFileChange() {
    this.dataLoaded=false;
    /* préparer file reader */

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* lecteur */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* traitement du premier page*/
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
//console.log(ws);
      /* enregistré les donnés */
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      for(let i=1;i<this.data.length;i++){
        //convert de chaque ligne a une objet presence
        let pre:presence=new presence();
        pre.datePresence=moment(this.data[i][0]).format('YYYY-MM-DD');
        pre.personne_id=this.data[i][1];
        pre.heureDdeu=this.data[i][2];
        pre.heureDpre=this.data[i][3];
        pre.heureFdeu=this.data[i][4];
        pre.heureFpre=this.data[i][5];
        /* inseret l'objet presence dans une tableau pour l'affichage */
        this.presences.push(pre);
        /* envoi de l'objet presence au RestAPI en utilisant le service */
        this.presenceS.MultiAdd(pre).then(value => {
          console.log(value);
          this.dataLoaded=true;
          this.show=true;
        })
        console.log(pre.datePresence);
      }
      console.log(this.data[1][0]);
    };
    reader.readAsBinaryString(this.target.files[0]);
    console.log(this.presences);
  }







  /* progress:any;
   selectedFiles: FileList;
   dataLoaded:boolean=true;
   selectFile(event) {
     this.selectedFiles = event.srcElement.files;
   }
    presences=[];
   importCSV_onChange() {
     this.dataLoaded=false;
     if(this.selectedFiles.length > 0) {
       var file = this.selectedFiles[0] as File;
       var json = [];
       var pre:presence= new presence();
       const prom=[];
       var reader = new FileReader();
       reader.onload = (e) => {
         let fileData = reader.result.split('\r\n');
         let headers = fileData[0].split(',');
         //console.log();
         for(var i = 1; i < fileData.length; i++) {
           if(fileData[i].length > 0) {
             var lineData = fileData[i].split(',');
             var lineJson = {};
             for(var j = 0; j < lineData.length; j++) {
               lineJson[headers[j]] = lineData[j];
               //console.log(lineData[j]);
               var valeur=lineData[j].split(';');
               //console.log(valeur[0]);
               pre.datePresence=valeur[0];
               pre.personne_id=valeur[1];
               pre.heureDdeu=valeur[2];
               pre.heureDpre=valeur[3];
               pre.heureFdeu=valeur[4];
               pre.heureFpre=valeur[5];
               this.presences.push(pre);
               //prom.push(this.presenceS.MultiAdd(pre));

                this.presenceS.MultiAdd(pre).then(value => {
                 console.log(value);
                 this.dataLoaded=true;
               })
             }

             //console.log(pre);
             json.push(lineJson);

           }
           this.progress=Math.round(100 * (i/ (fileData.length-1)));
           console.log(this.progress);
         }
 */
        /*forkJoin(prom).subscribe(responses => {
          console.log(responses);
          this.dataLoaded=true;
          ;});
*/
        //console.log(JSON.stringify(presences));

        //document.getElementById("uploadedJosn").innerText = JSON.stringify(json);
     /* }

      reader.readAsText(file);
      console.log(JSON.stringify(this.presences));
    }
    console.log(file);

  }*/

}
