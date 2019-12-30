import {AfterViewInit, Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {employee} from '../../model/model.employee';
import {CongesService} from '../../../services/conges.service';
import {NgProgress} from '@ngx-progressbar/core';
import {conge} from '../../model/model.conge';
import * as jsPDF from 'jspdf'
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {messagerie} from '../../model/model.messagerie';
import {MessagerieService} from '../../../services/messagerie.service';
import * as moment from 'moment';
import {DialogOverviewExampleDialog} from '../../employee/employee.component';

@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.css']
})
export class TraitementComponent implements OnInit {
  currentUser: employee = new employee();
  //id: number = this.currentUser.matricule;
  page: number = 0;
  size: number = 5;
  pageConges: any;
  ArrayS: number;
  action:string;
  pages: Array<number>;
  justification:string;

  messagerie: messagerie=new messagerie() ;
  constructor(private congesService: CongesService,public dialog: MatDialog, public snackBar: MatSnackBar,public SerMsg: MessagerieService){}

  ngOnInit() {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    this.congesService.GetConges().subscribe(value => {
      this.pageConges = value;
      this.pages = new Array(value.totalPages);
      this.ArrayS = value.totalPages;
      console.log(this.pageConges);

    });

  }
  open(url:string){
    window.open(url);
  }
  PassToDirector(cong:conge){
    cong.status=1;
    this.congesService.modiConge(cong.idC,cong).subscribe(value => {
      console.log(cong);
      this.openSnackBar("Transférer au directeur","");

    }, error1 => console.log(error1));
  }
  description(){

  }
  openDialog(c:conge): void {
    let dialogRef = this.dialog.open(DialogDescription, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refuser(c)
      }

    });
  }
  refuser(c:conge){
    c.status=3;
    //console.log(c);
    console.log(this.justification);

    this.congesService.modiConge(c.idC,c).subscribe(value => {
      console.log(c);
      console.log(moment(Date.now()).format('YYYY-MM-DD'));

      this.messagerie.dateE=moment(Date.now()).format('YYYY-MM-DD');
     this.messagerie.heureE=moment(Date.now()).format('HH:mm');
     this.messagerie.subject="Appreciation du demande congé ";
     this.messagerie.idE=1;
     this.messagerie.idR=c.personne_id;
     this.messagerie.body="Madame/Monsieur  <br> Nous Avons bien recu votre demande dans laquel vous nous indiquez que vous souhaitez prendre un conge de duré "+c.dure+" Jour(s) du "+c.dateDebut + "au "+c.dateFin+".</br></br>"+"Nous avons le regret de vous informer que nous refusons cette demande en raison de : "+this.justification +" le directeur";
      this.SerMsg.saveMessage(this.messagerie).subscribe(value1 => {
        console.log(value1);
      }, error1 => console.log(error1));
      this.openSnackBar("Conges refusé !","Traitement");
    }, error1 => console.log(error1));
  }
  accepter(c:conge,e:employee){

    console.log(e);
    c.status=2;
    console.log(c);
    this.congesService.modiConge(c.idC,c).subscribe(value => {
      console.log(c);
      this.messagerie.dateE=moment(Date.now()).format('YYYY-MM-DD');
      this.messagerie.heureE=moment(Date.now()).format('HH:mm');
      this.messagerie.subject="Appreciation du demande congé ";
      this.messagerie.idE=1;
      this.messagerie.idR=c.personne_id;
      this.messagerie.body="Madame/Monsieur  Nous Avons bien recu votre demande dans laquel vous nous indiquez que vous souhaitez prendre un conge de duré "+c.dure+" Jour(s) du "+c.dateDebut + " au "+c.dateFin+". Nous avons le plaisir de vous informer de notre accord; Vous pouvez donc s'absenter de l'entreprise durant la période du "+c.dateDebut+" au "+c.dateFin+
        " Le directeur";
      this.SerMsg.saveMessage(this.messagerie).subscribe(value1 => {
        console.log(value1);
      }, error1 => console.log(error1));
      this.openSnackBar("Conges Accepté!","Traitement");

      setTimeout(()=>this.imprimer(c,e),5000);
    }, error1 => console.log(error1));

  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  imprimer(c:conge,e:employee){
    var doc = new jsPDF();
    var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAABfCAYAAAAdxK5XAAAgAElEQVR4nO19B3wWVdb+JIRejLqoa1nLp+5a1vpfy67uqmtFEdRVlI4UkaqALFKUXhQp0ntJgPRAGh1CICEJCQECCb2H/tK75fzPc+/cee/MO28KhOL3Ob/f8SVvmbnluec8zzl3RiP47alb2TxOq/bONE+ld0M8Zd8L9QT+Z6Yn4KNZnoCPwz0BdSM9AfWjPIGNYjxlmsR6ApvO8Rgt4j1GywSP8XmSx2g912O0m+8xvljgMTos8hidlniMzks9RpdlHqPrco/RfYXH+CbNY/Rc6TF6Z3iMvqs8Rv9sjzFwtcf4bo3H+H6txxiS6zGGbfAYP+Z7jJEbPcaoTR5jzBaPMW6bx5iw3WNM2uExJu/yGNP2eIzpez1GaIHHmLnfY4Qd8BgRhzxG5GGPEXXEY8Qc9RixxzzG7N+Ioa1oM9qOPoQfkn2asV/2EX2dulv2feIOORbjtsqxwRhhrH7Mk2OHMcRYYkwxtv2zeKwzPUYvHvNvV8o5wFx0TZFzgznqtFjOGeYOc4i5xJxibpvHi7kWc85zH9AgSmIBmGBslGGMACvADLDjhilgzeD/nGQjp/GPiH9MfBLikxGflPjkxBchvhjxRYkvTtwI4sYQN4q4ccSNJG4scaOJG0/cCeLOEHeKuHPEnSTuLHGniQFHDDjiwSAeFOLBIR4k4sEiY9h64sEjHkTiwSQeVOLBJR5k4sEmY/JO4sEnngTiySCeFDJmHSCeJOLJIp404skjnkTiyfxtGNoa7ZFtjzgs+4I+oW/oI/qKPqPvGAOMBcZk9BY5RiN4rIbzmA3lsfshV44lxhRjizHuw2PdK0OOPeYAc4E5wdxgjjBXHRbKucMcYi4xp58liDku8+kcOec898CAwMLHYQIbZT6YSeUYK5UZM8COG6aANcNEnivg8GOcBCeTgAuTF6nvBRwaYTSPk41SgGurALdQA1yyBrhU2ele6TwImWT0MwE3KEcOEgYLg4bBG2ECDoM6lgd3/DYv4Kbs4knYQ0aICbiZANxBOVmYNExezHUApOIaFogFuEOyL+jTjH2yj9P2yD5PMgGHscCYjN5sAi7fF3AY0wGr5RhjrDHmGPseqV7A/TfZF3Bt55mAS5Rz2yyO53q2mPOARtECAwF1IzTAzbAAd8PbfgHn8Qs4/MgLuBleD/dJhLxYw2gq0zhWNCKgmQJcogm4eV7AdQTglshOfc2d67ZcdtYJuAHZGuDWaYDjQRy5SQ6qBbjtctAx+JiEkL1yUmYy6MIOysmClxOAK20vd5zPeZHPeb70vZsA3BHZdvQBfUGfQvfJPtoAt90E3BY5NiOdgFunAS7bC7ieGuAwF1+bgPtqiZyrL3nO2puAa+UFXIACHM855j6gXpTEgga48rUBuOmXAbia08VJggC4D5WHi5AX8we4Vibg2s+XjUcnvlKAW6YBLk123gk4hIDBPFhDeNCGbeCwmi/DqgAcwuo2GUomwcuZgBNhdZ/0cmFXMqye5HNdoBZLh9H7i0L43L9IAJZ2OI00w2mYI5yir+jzJC2cjlGA2yjHCmMGSoIxxFhagFslKYwAXJoGuGUugOO5awPAJZmAi3cBXKQXcB/OpKD3JeCq1LwMwOHH5WuFipPhpAF1wuRFcDG+aKAFOA6rLcDjEmUj2/gBXBcTcIrHofMWj8vWeNw6k8dpgCuUx7mFVYDuSOl5udhTfJ4L1D2lB1G+Qb/klaF6iyfwe7/y5ydKybt5ZJvdwin6OKUQ/iYAl+cFnI2/ZcsxFoDT+BvmoosJuE4A3CI5Z+00wGFOeW4DeY4x14GNY+yAY0wEmoCrwFipypjxA7bCAQfDj3GSsnyyQCfgGkSLi5dpMlsKByfg0OgvF8hOoDOWcNABp4RDpq9wcOVxRYTVUC2slqaXiz1DgWxDUlsLsNGGQKI8Q1ib5MGmp7sM0PnzbkWG02LwNyUYFOBsgmG5JhiWSJGnBEObuSbgEiTgms6Rc91YEwwa4ICRirVCLhNwLBxwEgE4KNU6hSjVFiVVqkXwuMGKx21w8LgtcrD1sOqqVk0vF3U5XA6/OUfl+d/T0z/xgm1DGWkAHb/XI6Ubn/8n/v6p0uFuaLurOtXD6TbfcKoAN9gPfyuuYNAVakupUCXgTIVaXynUcMHfgA1kMwTg/CvUogFnS4184EiN+FWqJREOisdlSI7hw+OcYXWzN6yO325Xq0V5uRKD7qgQBjfM2U+Jq97wBZtlAeIzeD+A04g9fWmhtNjezVSnhYVTN/7Wx42/OQRDB00w+FWoMZpCDbelRCoVnhIpGnA3vOOmVFVYLUI4OHlcJ388bqUfHucMq/laWN2ihVWHeAhx8XIlDq0SbLfFb6OV2c+YYHMCTbdA8Z3JK+tTkBAWxQSdM5RaytT0biF+vFuh6tQl/1YS/oY5a6sJhhbxgqOXgkItBuCUcLCUqptwMHmcm3Dwy+PMsNrDTAAjGekvrA4xw6qbl9PFAwi17uX0RHBECb0c87X7E9fSxjUPFgNsdtDNyawhvKJQtMUWCofNRK8ZSmc6lKnu3SZs86rTUf7UaTHDaZH8TRMMTdwFg6VQaxWpUIsGXPGFQ1E8TksA/9dMAOv5OH9hVVerPl5uq6+XU1xOeDkVWvU0STH5HKvRF+bPNcEWUEzASU53dn1lujMhT4C2eKH0sLeqoEKprkxVZcHm3XSxoKoLftRpUeEUVKcw/tbCwd8aaPxNEwwVihYMxQScEg4cVgOdJa7i8Lj2Go/zmx5xKXO5Vh3cvJxZedAVqyUg9snwJPgc0g1HNE/nkRPvD3ixF+n7Fe1K7OGaLx1uCgg/QPNJgehgM9Mg/rzbeH/eLU9GAj3Zq4fTXkWF08WOcOqHvzX0FQzgb2VN/laEYCge4KoVxuN8Kg6ml/vcGVYX+g+rhalVN/FgS5E4FauZl7OB7gCVmbWXKkbwZ+E80eHsecIv8ERfZPAxyY9mvhXrktKIPUUV5hyhjOy/FQ90/J3Q9DqyCuGWDI49Lq8VdZaBdp7bwN8L49dZ/F4Yg27Wft8kL2jCJD3vpitTR+1UhNO1XrHQ3yWcfuMnnAr+tsA1/1Yc/iZLWtMF579swBWZAHbNx5lhtY1bXbUQteoUD25ezpkI9hdap5nJ4NCDVG3WdopIq01Zqx+nOek16IeU1tRw4Rh6NnEh3RXH545mMET9wmA5Z8+nsXC4O2EDFay7vXDQ8Wdp2c9S+dlHHIKBeVzMeXnu6FP0xzn59GTCMnp73izquKQ3/bi8Oc1Of4u6Lu5KgTMO2VVpUaFU524+pSx/YsElnHbUwmlbf+F0thlO3flbheLxt+IBzsvjis7H+YTVVlpY1b2cW1gtrpdz1ldtAsJMBtv4HMxDj0an0NHcG4k2ydyZBJBBp3KrUmrWc9RhaX96LDGNgmIRcn/xcjAOj0/NXU6Hcqu7gE6G0Zycx6h6PAMj9qwJ1LPiHOViD9PjianUfukgWrrqRTqO65sAFbbZoJ1r/kR3RzJAQg47eJufUOqmTP2mQnSx4Ej2+lWnWjhtHmftEAlw5t/qmPk3lfB9p0j+VnzAqXycz86RwsKqU626JYF1L+ev1KUX9N3KXVaNVVOtis/poJt+gh6PSaZD6/6gASfQSt6KctWGIMphL9h8yQi6M47PHf0zA+6sAN3jSSulat1o2H6zaNXLdHPcTunJYNEX6L74XGq39Htan/MIn1MDWJ4mQvjvzTn/Q3dGcN+mHzPbuNcXbCqUqjSIT97Nmeh1ejcXsdBFT/b6V6c+4bS+M5wWO/9WMsD5FvKLG1b9JIH9iQeblzMV68Ac97ycv9DqA7o9Zq0VoeokPRM7nzzwNK4hMsACx9Hcm2jQ8i8ZPDyZUSwCon6larMLaCC/B4+Wkf3/qPXSHygg5pQZMs/RE+whJ6Q1ojOsVH0A5gjBW3PupfsiuY/Tj5tgc/Fses5tzBZ7KHXLu/nzbpZYSPF6N7/JXpfqgipnuaVDii7YlxxwxQmrAVZYnS2UjTesFpGTK5TLZckVa8vLFRJa/YJutw10z8XOpcMMqEJ5menFTq6vSgOWd6A/zubzRxAT/p8YZKwwo9krRf7K9jM9FJ9F01Z+Qj+xh/QCzc95N0rPdl8E92/aca9A8As2hyq1Qqm/qoIpFHTuZvNuy+zezSkWRLJX247kFk4/coTTotMhJQec37Bq267kTAInyE44c3LF9XICdKullxu0xje0qsK+P9BN2mHndEq9Tj1BT8cspP3rbi1agQI8DJL9625joTGWAiIZJBEsLiIu0A3RBfTtsq/p7IaKxcvZ8XnWZT9Md4Vzf6YdKz7YVL1UqVJnKHXuCnFVpsvdvZsIp6Z304v1PsleF3Vau0ThtGSAK1qtauKhqT/x4Oblkl24nKo+rKJKg3iw+vME9ePB7s8TMIAnYxBPxmC2Ifz3MJ6QHzcX7el8QHecHo5czqHtHsnLipHUBaiSMl6je2Jz6e8J82ljzgNFezTFFfkaqZnP0B9mMWCmHpUeV4BtVzE8m0qB8OtQtsH83ndsA9n6s/Vl68Of98s2waZ7txX+uRvmwmfvm10sWMX6evZkbwnVackBJ8IqKxGZBJ7hSAIXIR7cKg/Ky3VOdpS7tOpDzxx6Zew4WpDyHMUtfYmGJDSgDlFfUe2Q4fT3yaH0yIQ5dPuYZCo3Ah6PJ234Pp4YBtMoBtaYnRrotDzdFA14PPF3hK2hzFVPmqBzK877qtKTudXop/XligE0ADVAnDsmrQZVCkWe8IjXq6EtKvVhAxu/juL3R/B3hnN/hrJ6HbqDgoavo+qjltP9Y5LoifGR9OLEqVRz6nBqHf5f6h7Viu4Zwou8Z7ZjV6+Wd7O82yLfyoKLd/MrFtTukOIley8dcFYSuDDx4M/LtdYL+g7FquflbKEVK3UN1Rg/ko6tq0a03ZBpDVMpYtJP8Pv5q+6nqOQ3qUt8R3p15lR6aOo8Cp7AIWY0T9boQzyBPGHjzSSqzdvtFgCoErqdIlNrehVocbzdhuJ7xcFLWvG1uB1TD5jX1LyayLPtkm0czZ+PPECBYzbTHROX01PTZlOtWWOoZ0Jbikl+jdZnPkhH1wTTudyK9Kvii1tRTqtAjab1oaDezN96ZthDqS3v5qZMXbybs5TlFAtasb4E4bTkgINVKUw8FJUiUTfYOMtdevWh2wrf0PrtBrpvSAJlpT0sclfSEwVK76FSFJsMK8d2cX152pdzG8WmvE4tZvejp2fE0c2TGYBj95Mx7jBPMHvCSSZvwuRP4Ymecpi6LuhKFzaUK0E5q/AQeoSFSb340Xwd5n1TCzSgsU3gv8dhMRykKhPX0yMhC+i9yLE0amFDWpP5MJ1cV9XifdYiU+FbGY8FxuSBoTzO3+Q5QqmbUNDzbpoydXo3ZypE24ok976VWCxcOuDs4sEsdfnzcj6JYD95OV1AqB3BTtXacx1VHpBOsxa8JSfAryfSgLhRecNAOrimOkWmvE0fxYyiB0L4WhN50sez2py4X4JgCnvDScfppeho2rT6f4rv7fyIjOSM5+n+WWninHJr+G55rXF8zQm76b6Q5VQzahJNWlKHdq6+S4bojd5FI0HlR4Tkye/N5LGo1D9djI2lSq2cm1so9ePdWurcbbbm3ZyVhVnCu5WrXeTtgKUHOCUeKpjioSgvZ1Os1m2ELtUH19Cq8TkMaG8WD73XU+fIL+lCXtnikX2VX9MAeJ5D0Ir0v1GLuIH0YChPyEQG23jmVpPY60w8TNWmbabRSxvTuQ0VShZm+buH1t1MX83rQQGT4UUP8vkK5Lkn7qE/hyZT87hBlJL+LJ3NrSSBZXmuYu5K4e//lB9EX0e247HYYI5Jhp23WaF0mW8o1asKapOlo4xl926+qRBEOCkWSgS2SwOczcvVNr3ch8X0clb1wRQQFugWu+fmdD6nQNcHpHgzvT5hLBXk3CI9wiV6IQW+hWkvUu2YCVR92hoJDmFH6YmweTQv7RUOs+XtnkeEdHs4R9lsUvIndHtItvitMZ5D9/hDdMf0VfTx7JGUnP4cXeBQ7/W6xREpDuPr7MupTm9NHMVjsEmOhQ42fTeI4G0uodRHKDhuA/TL3bzerYSpkMsHXIm9nKg+uOwILiw319WRKlH5OZUU7rWR7hmWRBlpfzVBV8LJc4KPgXNgbXXqu6Ct8ETGeOZ1Y4+L1ydmzaeJDKb87AfoFCtUBZYja2+mnFWPit/cEZIpQzR+wyHz6VmJNHpJQxY7wRrISrC3zkkTmK+lpz5G93Kf0XerdKVXExRv03eD+A2les3UcZOMP+52ed7t0gFXuJcLt/JyevVBbEF3pkn00GrxuaUO0DlFhAY6Dq8VB2ZS2MI3pZi4FM5l434SGOfY64Use5+emsHtHMehccwxfj1I5SZtobump9Fz4TEMqDj2iFkUgJTL2CPiO2UmbKd/R8ykxWkv0K95gZfOA1342vT5NanCAPQ5V97lVhTYnLxN5dycJSxnzRR31VubLL3K9BITvaUHOK+X0xSr7e58cwt6I1l98Btafficlipx5ud8QMcD32ctv+bStzGt6Of8MqWgML1eD/eehqfUpMdYQRpjmPCPZfCN2yNfkcYYh3wf87Rxu+j1iBBKz3jKy8tKslO4EL4GrtopsiP3k1VonzWFgM0pEpy8Tdt+5BQKes3UVlWwK1O1q/cSvdvlAU55Ode8nFtoVYV9PPjGn2p1FREO5erkdJiAvqt5ArbQu5N/pENrb7o0XucKPJm0Rapk5KKGdOdkvuaoAzIxO4aV7agCeiZ0Di1MfUHb8nSJod2Fr+3NuZVemzCO+4ZqQra3RuoEW3cH2NxSIK45tyKEAmiSVqS/RGVaeoCDAfFqC7rP1iVTQNhDq0O1qrKXk8/5A10XhA1+7a49gUnUXbN4IjbRn4fH0eqVD2n5utIAngxrh5izNY75joyRO+nm8Tk0fGFj4QWLV6Uo7rUkX1ux4kn609D5Jl/TC/Junm25O9j0aoLO26ycm/b4BjehoG0hv8S8W+kDTj70xty65AytWslLr0AENPfH54oAXedl9NiPqylp81Gak3+UqvXjCfhGB53kdVUGrqSoRa+a+bpSCG3KzHC5PO0Z2pZ195U5P59z0rzaVE48Xsvka1Z9tAjOZoHNcVOMLQWi9ro56qX+QqmqmRZ9C+DVAZwMrdPtyeAiQqu37OWsQuigW2SvRHRaSncPTKejZ38idXwUsUl6PEyEjdcx1+mznvrNbubNc5UWKMwqQumeU3rJ8xy624d15n6Ar+XY+ZpK6uolK4BNz7X57AJxigT5YBpX3mYLpd4SVikIhdIHnE1A6A8wVLk5fc+cnipxiojCPF27RfRV0jbSj24LmUd9leIVEwJ4GfK2OOSoOBw1mN6PTuZWIdoiS0GXZJuusHHbdmX/kV4aN9HMr2XJPrh5NT3P5ubZMG4InS0SpTVlgDUxI4opEgRvs8pXvs8KUduP9FB6GUKh9AEnvZy/0OrC5/QqhFNEuIKOvV3bBTQhY58NcI2imEx/lewQE5qKxRMfe+bRX0eEU+fIdtQlCtZeWNeYttQ9to1l385uRT2Ftaaec1pRn7iWlvWPb0EDEppb9n3ip5YNTmxCQ5MasTUUr8OSGtCIufVoRJK0UUmf0Ji5daQl1aHxc/9DE+Z+IC3pA5oy710akVCH7vhhrmirTRgIr1ZMsH25SACtaufF9OLwTOqRsIVCMwto8so91HJmLt3YnseUgWYDm7N85Qil2IpWjLvprw3gFOhUaPXumdP4HDiCrQrBIsJNubqBrvV8ahWzyQa458fkSMCBOKtSmK5ilbfrtZbfY/Ldc6MQFkZv7B/bwiELtpWMftuk9d/uNey7G7CDjIEuNsg062/+7kDTBvB5Bm6TrwP43P23mMbX7Ae1ydfvu1HuX+udz+3Jk0DrZZaoCvNqIoQ68mzC+y+gMjxODUNzadvhs+R2JOYepEBkCpo4a6UO3maq0suol149wMHtelXrDHtC2J+I0JPChYGO+cgdvZbTiXOSw5376Re6/7sMwe2sqoQtdeIAni4ssA0bpBw7ZAeYN+uoG3aUYRetzdbK3bVu9t1a3+8PMrd9DzRvSh5gmrpftG+Wd3euE2iiAO8Cti4OvoY8W5v5dHfPFFq4yeMKNHUcPnmBbmzNY8sh1AKbXk3QE7ylp0qvLOAk6LxlL7hlK1WiqhCaiAh0S5e4gU6lTD6fS21iNooBPHPxZ7q7P09OxyXe+ivSAz7AW+kti1mh1gSeG/h0ADpBWBxTvxMAM8+Hc+Ma/bK817WFTg1oPl7NLML7AdujA9No97HzNnDl7DlBzaatoWkcTi3AnbpA1Vry+AJoukj4JNyqlUredkk7ea8d4FRoFXxOPZPETUQo0DV2gE6FV6eQMHNJVbssoUOnL4pBfGIIT9oXi3wrE5goFWZdPZ7m9Xrr4DMBqINQB2JR1t8BLmGrXEDm4Gg+QPPD1VQIhThoyx6/xzIG2zkLVD/98iv1S9pCZTF29WNZLMyhj8dl0cDEzVRr2Erp1dzAJnjbDMnbLm1j5bUFnBd0If5FhD/QNdU8nZ6nQ+LSvFF3/sYjYoDfnJAjxIQtX9dlWeHA08WFE3x9TO+nTAdiXx1EDuureS4FLGW9MxwgS/d63W+codMRPt1UKATUFwspiBdg4obDFthOnv+Z3h3N7Wg4Wy5ajCHGsm4UGXUiyEBd1Aa2CA1spVpNuDaAg1XV8nPI6YinL+n1VpUu4YGAqxeDg1VoS5noO0zYmiVQn3kyPdItcasIszJ1ouXsXIGnhVon+GyeTwu9vTL8g9ECVKb8rLfD1Hl6ungy3Zup0OnkaW5eTdVFuc9Qouo4z3y2xigGeoNYCTSkPlRBXk/s6mD72A42kW8TvO2Kge3KA84SEVq91Qd0LMkNHoSbPo+jF/ouo8e7LxbE1sD9rVZFQuN1zeKp5rhsMdDx6w9LIKrdJipn5wY8wfH8gK9Hmi8Au6WKKkYgQNM11Ztu0YHZU/tbAcsClwYynKtzijQLZBpHU0ADH/1ysbT25rNYdKB9Ye74aJ5IQ5fssAAXlrWPjE+ipUfDJglWokZjBh8DTSxkBhrG2ODxNuqEk8Hjb/A8GJgPOAMGWgWep8rM2arWmELV3mKrYbcbavwGACdBJ0UEVI8b6Ay2IB6M5PxDFg/pO2ej5BsIsc3j7CG2eQLd0yOZLv78KxWcOE+VOy2SuyC+1HJ2bsBT4Pva4fVUyNUB+PVyen78OkrZeYLW7D9DLeO3mQBUXNBh36TZvdc3ZkXAPNctAzLo28W76DPcTP1fDfy6GOiwhB76PoNm5RykpPwjVGvyWkkXADT0Ta8c8KKbkOoVBHPWHqD7Oy+km9vPpaqfJ1ClFnFUgT1cuU9jqSzTlXKNoqksR5KgehEUxLwtiL1bWR7/8uzdKrBIgGerBkXKofTGd6bSjaazUIZ5rPzmZCrz8gSq9Mbk6xtwAnTv+AedwZ2+teUcOn3eW7LC8eEoDkufRMraq5424deK7ebRnqPn6Ff+3v29UmRYba/tOHEDnij7LLE/TEeFXB2AnZfRQ8OyWQX/YmtP90W7pIeyvKLDuq/wNQbWTb1X0vqDZ6zztIljGvDlEjs/Y4/2p76pdIiVpH60isr39g03K7cxy1RN4+mNEZm27yJN5Dl9gXYdOUubD5yi/H0nacNe2AlprFzX7T5O63ZJy911jHJ3HqO1248KW7fNY7OcLUcsW8O2csNB6h+aQ/fXDaMKr026vgHnAzqN0xnMH279bDadvfCzbQAxaFV4lYrKhF4KMwlxFg8ajpeGZQheZylZN+C1lyWyu/ul0e19UqWytYCngY+tTOdkStp0lJwHSPltA/laXXTv6DAAt7PmwRhYL01YazsPasHVe6V668TcjgBu36ycAz7XPHrmIt3Mqtx69FkrrSbaNI66xuSL71zNY1vBCfpLg3Cq9PolebqrBzgLdO9qoEM14gOpYKcv2+HTuSd7LJZeTqu/Cm/XMJbCVxWI73wTv5n5yhy58vUUigIeh9s7e6ZQ8tajdJpBfYwnfGjKbqqgno0GD6PCLoe1h4es8jvYPRbulN7pazMcfr3Mm7oAWBlkf/lhleW5KvB7z45cTWv3nRLeWB29FuwQOTRx/XYL6IEBafTLr7+6XrNjzEbmZXHefWzgs2ZN1GgQQ3d1nE8dZuXS7Ox9tGIze6ItHrYjlM6v0o4Iy2DLhPF3VrFl87+z+XX15iM+3mztVo/NctkDXtA8/pLVBVTx9UmXwuuuLuBcw6sJOhDYV75dTEvZdavj/WFMuj8MkwlisdPEfFgOq9mOERvEd9K2HWWe59jqpKdR+L0IF+8xc/UBMdlW2IW1XUgttfLZtKwDNCJtr/V32q4TsrLROdnLC5VxWPzL4Ew6xxNTZ8YGbs88Gsm/zSk4RUEMvicGrqR5G2U1IHP3CZHaUIqz8cz11jXmM3+LWesdg+VbjnpzkyalUCo0EGPBoJNpDym+hH2sxEEYj5+kLYgklkDgRV/5nelUFfMBQfC2na85Dbzt416LrUXx08+/0DMtYy8ltF59wOmgq2SCrqwCXY1pdNOnMXTMTOy2mrKaB2qWtdNE5euMelH08ncrxHfOsNe6uQN7i/oxItEpVBo8grlLIpC5z8GTXm70s+ZIXh6dLYEpFC5bmwU0I1uCE197ehh7qyaJlM5Aw7HNc46/u1jUdfFdy1qD0C+ksSul1123/xQ98l06XfhZeoWPpucyAGJp4OKd8nP2eIHqfzH0WRJNyyywrvl4f+Z+n8RQ9m55zS2HzojwadSLkX2sZ6aPADAYwPYhg+s/DK73GVi12WqFkvFuCBkMKoNFm/HWVDLeYHt9ChmvTibjlYkUwAIg8KXxFPgybEKhFsDfM/4xlpat3W+N3YAZOeL3vwnACdBBgteUeTokHFFSMfj15ibRFuDqj0wn410nJPsAABnFSURBVL2Z3ptyzHKYUT+a7u44j4WG5H1JuQdpWupumpq2hyabNoVt4ordFMKTedFE2UR+74m+K6jguCwFzc49JHmR4nz874npBdag7mCAfb9oB233yIL4WfZewzgc9+P3+iyUhvD4/ZJdlLrjuPU7Ftq07Yi3iH7s7EVqE5FHawpOir9Ttx/z3rnGqntauteLruPvtA5dRxsYlDhOcR87Rm6gz6atoRawqTn0GVuzyavp04nZ1GRCFjUZn0UNx2RSg9EZ1JCtAY9b3eFpVHdYKtUbyjZkBdX9LoXqD0qhhgOXUcP+yVS/7xLL6vZeTB+zfYJX9mQffrvQsv+wvd99Ab3RKYmS0ndb7Vyas094uBJuW7qEO+/ZBZcm8JBoRCmlAoMNK/EfX8+nX03X/Xx3BgED0VaZEAniSLqnw1w6c94uNIo6hi1hDlY7gnokbBZ/b2BPVEbdyYTXlklUY9zqEp3zUo52UXlS6JiK84PxV/6apX2A+6l83RUDHNB823shpZUE9ILYrL0ar02mkQmyOH+c1dctTWMEtxNZcWuLE4eRj8Lpb98sJj882++x78R5erzXMhq7XK7UrYfPUIUv5ntv5mELYhAMWrjd8oolOY5wm+tPWUu7jsr65ty8w/TpjFzbdxAqK7Sd6+WczMvKscE7/5aOrI2HBbcrIRZKBrhyr06k5t+n0LOfz76cXIyrVeLV8gcG194jMmc1Zu5mwekC9MK/WZ0was2gr2auE9/L4xA0YE4+9WHrF7eRBiZsokGJm6UlbRGF68R1B72EV0Pp5oOnKajNXPtGAQGCRHq4TwrVmZhDgxfvoJ9/kb9BSJ2OTY0sBqZyGES4xt94nZZRQG+MQi1zDv2lVwolrD9Ef/yahUiD2dQqbAOt5xA5Inkn3dppofm/bE/0CgEob+Zpz/VLoU7h62nGyj1kXpIJ+q+UzJO7eMMhYcl5h2hZvvnKtpw/W85/w1I3HqKVmw7TSn4vnS2T/51lWjabTY1uPWLLu61nJbphJ9sOafm7jtFG0/J2HqOjp+w7UjqOWkllmQuWcJ5LBjiA7LWOiRSdskPIYrjU0gKc8a/xNCRCegNg4sm28QJwULFiy7qVKJ5FZRl0uxmYe4+epdtaxgkAGh+ESfIMA5FWyu29WVR7RAbNZwCccoTgEUt3SqHRUm0U0Iy5lVEvlh7ts9zypOBaojgOQQJrFu/9t/obwOXv1J28hlqHrZcpG34/qHWSvFYz814OoTbjxd9QnKiqgJsa74XRI10XWdeMzS7gvs0SXl2qzjApEPDeB1J9Gib/NViEBTInDsKDI5kjVwJlYQ8kQt9bsjwl1KjplURVwbSbOMrcXNNrf+CIo+xG/uyRRpH0Y/R6mp+5h5p+t4wqXY20CC5Q9c0ptHnPCeo2IZOMf44rFbBBCb3eKZEuXJSAmDp/MwW+PlnUYJWgEPe94rlkLPOj0vfQ/mPn6PGv5klRAX5Xz8vxlLiAqoWie+27VJq77gA923sZxeXsp9QtHuoRm08VMfFNzSpGCy31oDYNMFjGpuwSbYJAuaf7EgmqlokuluB9ZWC9PjyDFuYflqrZBJZMXMeJXKIorqvt3maRXShwBtb3SZJjoij/aJcFEmRMJ0QtFOVA9vaqHhrAoCvDoAvicSonUh4hZspjGvOrqT41UZu95d+qaoa/ATCUthDlyv574qXSqpKLhnJ8sVrdFogB+ajnIuGZLofTBb0ygR5tHEkFh2UoPXryPD1QL5wqMOCgYoWgMNMngfx6d4tYajU+k6p/Gi1WtcXvlLCwgGfuQuG/7+s0j7YdOk0Vsd/uk0i5OQCpBfPmbOFhAAgLFAyQRrPp3q6L6Zy5CMYz8JBwtgFTAdVpDLj7uy2hLRyyq7ZJEhsRAtX9BE0VwEyQIb/YWO7CRdvuaJdIJ81dzeEcWpHqsLaAg1aIm5PlLg+xYdLc6YExwtaiqldm46TX6Vze7y8tLYLczbBIGf4aD0ymAAZdSYu6WDUA65PNomnbvpNWmINMBwit76mcHQ8mlGyQULPTGGwh3k0AdewcT4kLC3wfR1AKc5pOs3I5HIV7b+Rpomy219M0NXdb8HcS1sqcHPJ4f2jP/K6x3A7vZiIR20yCKhD3e/L5M7Yfo5Z4IhOHdgtgJsgCTZCJbUMNzR0dHCpDVkiPCtF0V+t4ETYl0LzbiSygvSeBhrHBGF3BfWylZZf4uC4GC1zr2Lg8MTghHALvqTNTJALhAau8qTiD5A3KfeP98vw7fA+uuhlzgcPHvTtWv5u11tVdY8VW0yoUCLPlEGbfl/dNiM2d6t4JBTzN6yF5/N7QNDrIKrVikxiRVhET3SjGCr3S08RK78f8r/ecjVa7Pp20mr1PlBeU/qyJ13MBZA3GZdFuz1kKMnOHEmAmyBqYD41RW4eYh7ae6k2PdAzJIaNmiFxQH8qbW8r8R/YZQCtv3i+qgHYlvdo1Bxysqgm69j+mCYJ76uxFmjp3E73aIYHu+CBUkFB8B9ta8AoiivdfaBtHA2esEfU5/egXmiNESdVChIhIFjM/UfVYCTx174QGvI/s4EOZpzxPal7BCYpdVeAl3phopFnqRUkPA2LOYa337HyrXVCMAI/lFV1NglZ5rUBzH1rlT2MF4CYm75CiBuUmdU21P41FkFGbwTY52xIKc9fsk/lH9m7Koymgwcuj7xiDqr8doF0+4AQA2HOBSD7+aRTFsHJVxxH2JJDVyNVk5B0UshzSer/nDDmP1NwDDNJE4dkKA5vtuu/IKoUFvFqh1mYAiAuoWhFuNfBhUp/qMl9cc8G6g/S3rxdQFXOfWBkGWwV+ff6bxbQ075DVtkUbDlHFRtFej1iYNdBNckiA+l99ksW5QlN30T1tEqgcwPaxVJwBbA+2TaDwNG8GP5sX4o0NIoTiDDJvapEcTQNazd8c0EoHcMrgmWB/+yxW7Jnauf8k+TuQ09rNBH58fD79m70hwqcIo5cCeFEe0zheLaVqQ23hVoEP9cVa36VYbdl39CzlF5yk3N3HaeuBU7Z2hizfSZXBrT4K9/LB4lrdSGsrN0h/kzFy7xpya5v4equ2eiht0xHK2XFU1ILVMZ892y0NI0UNFEArX9vO0X6DHu3KAE5Mfg0JvMCXJtAttabTU81jRKqjbp/F9OmgZULRvt4pSYDyDuYiQmIz0EqjVKZzPCg1eAKEnnJmSsUKudggwN/5a/sEmsmAUgpUHRd++oWW5x+mt/ony1AHDwkeWBJT/NE0kcLgdvyj+0JK0bynfgCEnzI1Kc8LBcV2FTaV6vwNcbSrBzjdEBqRGAagoDgBLrzib4AS4uFKdcoKt6bXE+CrFerN5yFRil0U/PldLWLp2S7z6OVvF9HzXRfQ/W3i5XYe7LTQRUhJ7aNZXvtQPmMN10OS9qG28fRGr8WioF6zz1J6+otECmaVjZ0c5c0FI7wZwub1rzqvD8C5mVSpk0X6BGCs/IYUEyXJ4cEbimTkm96EpL9QrLyeAp/wfLiZh/+NTHxgTXPrTg3TAEL+PMC8pVE3ACbwQxWa7aa/r/+mjEn2FeEXIR4pHW6T8Sa2C00RFvDWVCpvemeRQ/vf482uPuAAJqRB4N1QPrmTQ+lfmBA/xiLjf+qGiY0AACA8oL8yGd4Hx4Phb/wGahevN7EXUOcvXHBwmMJ1Xp1EwbVD6Db2KLd9HEbBCLHYK8YARhhTqjcAHo7fE/vHAI535WNlFXBA5oM+8P67DEKhCaJA8+ZvnEekL/AZAM3XNszqideLmeHS4ckwVhUFPRkv+lYcfotxCjD3txW1iPFdnBdWVjdznIvKFlyXgMOedzT8xbZxNGXuJpEGOabdJPILM+i9h0/T8nX76cuRafTH90N9QIfO4w6i93ssoKhl22nL3hMib+dhFQwljP318zL3iHxedeaN/kouCOV/bRJJIfO3iCTz6XM/0ZnzP9EOFgqJGXuoRrcFVNH8f8KWYaC9zuF1HLd5YGQujUncSO9yCAyEJzJBqRu8ZfVPwmlw9AYaGptHf2buGlRDPtQHFsTnw/n7zlxDX43LpCqY8LcL92Lledxe/iKevh6fQW2Hp4p6ZmEgAkW5+6OZIo/57eQs/v40v9wYQPrTRzPkXrdvFtJ73ReIV3DsD/i1xn/n0jPMs2/lhXkZJayrBzgABPk53N0Tn7ZL7HZQB0A3iAe+0+h0AcIT2g0gtbrNt7wYOgmvh0FZu837kJa09Qd4EjKFCPl2SpZItagD4GsycJn0CNogAWzvdp0vSmY4kJqZxCBCsvrEabkA9rBq/gNSDvw74+WJ1G7EShup7zopS+ySrWKGZ93KMxDvZa+tjpc6JFIQAwaeC4Y6cdgS73Pt3vwqSbTJ3/ipnOXmPXJD50keI0SGwngvPCGAqY76/ezVGhuYeW5e+SLB1j/k/85qGxsusnjaxkKm4+iVoq2l9Gy4KwM4eLUnmkXTdq1cdY6lf6MByWLQUM4Srp/tT7wqp82XhWqoV3FjxtsSbL2nZVs3nuAGDuxGRecDzDCD8+B8XcZl2AYPmwoUcMETAXx4Qxy4IQSeFJsOjH+NowfqhQmwIYeottrg2q2HrrCds/OYdL/bqdU1TpqL56X28WJS5cKRXDNro1edwqPDg/nzHAAoynvqOMPe+JHGkUw93LeD4fzwRju0VBRu6av4uvteNbQNbdSPnrx4q7MXfahhBI2Zk2f7rM3wFdZ4XneAA5nH6ly/w15FaNR/qZhkJy8QW5xqyBLX7QipNSS3+OyH5bbfAwDGi+N8wgSuh/PCY+nHW53nCgDhXAC6OsbMzhN789Xvg3ggX2gzR+zvU7VgTHi7H9NKBDgAF5UWHP9sF2cBDiIJJT+9fIc85NscttwmEQsI1ADUQT+wvbvcq+6TriKBfiC98/fWc6x2FAW4L0akifHFue79eJbVFxzYK6d2l1x3gMMEwzPpx+LVBdzJSX4brEAmFCgP+O0sCA4c9d4PsHP/KcFhMHluv8cAwqNe0HJq2P6MPVwAI0K4OrDpEBMqRApfT5FzbL3Bv/0BriNTALxfHMCBs6K/akE92SzG1jYc6cID+Xo5gPrzIfbFhgMLsIzL9VWNOjPfN78XsXSba1jFeL3sCKkdRq0U/YNDgBjbqSXBAX54v1ISEaX4yNW3pohJ3rT7uK0zWH3+JstttX450s6ffghfJ3aj+PsNJg1gzNxoH3SscOPvY6j7RPt9plixtZkoAyiS79kH0g1wakJKCjg3voQD92xgXHRA4Dx3MVdzK/99H7bW1cPCS77ypTz/ouwCATJ1gLPCW1V27OIpDHAYR/DFQ5pHTuPFUclPeL6mgEOjHm4UYXPHcO1P8QrHai7q9zeIwZgkPKJ+QDn5I8C6Z0C41A8ICwAO5TO3AzVeVEHAddC+Gy8DcA9qgPsHh2i1/R7tbsh0Age4my6g4G0xwUqZo0LTa6qMDthVe1xT9IJjOkKwSjnNSZW3HmInNsCuH31DVvu02w1wbYalkvHCWEE33ukyz3ofrYXgcgvN1xxw4BjgGvpx4swFerB+uM8qczP1hB4Qe/2Ahyiqw/CA/UJy7IM9fbUQFrj2tHmbXUGHY1H2XkH61aLABAFg+gGOUxjg/sx9PG0CDp5VAQ4LAd4JB1IPKdp9nTjAXeHVcW0QdoirfUfOCE6pp5DSeXFUdtywgms83TxGfL6JFS0+B3/W+R+EG3KVerpJeN0v7YD7ZnIW3fvhTBHO93vOCtWKlFW9PktKUzCULuDQsNrd5ts6cvz0BbqfV39xAYdXJ+B0Eu7PMLHDo+x3R/VlAELRVjGrEgDgGccDc9SBG0jAXeBx3ADXvhDAQWwgmX3a3KWrAw7tXpgl7zl9sF44vfGVfUECHGLBcDsnJ8k7/rsxBcB7BzxeHpu36xjd/K4dOADqqFj59IHWw6SoMl4c66OwG7CH1SME2vRvB+AwT+e0TQRIOd1Se3ppg610AVf+tYn0T3bpv2p3ReEBNY81iRKkvKjfY/Vipafl2h/L8NIX8UUCDt51Xob9NruG2kBXNasVaAtEhOek/Q4kHAP5/TKvyLvROzoA13msf5UKKvFok0g6z8IAChReB/1QBBweCxMKblSBKYPTy7UbniqS0jiQogGwsEDxjA917D18RlRXVC4OIEfkwDWhgFG5ubfOLJH8RVjVHwwE76gLFDfA4eYYXUljW5kqPV63gMNgYFAPHrU/tv2NTok88cVbKfAig8PsTxtq0G9poaIDXulPH9pTD79oE4/vKO8pdrOY0n9opN0jrjIHGcBqMTjF9tl3s9YIL+R2fZzz/7WItTahPlBXenQsMgAJbUGODLkynBtcSz+gCFesk4sM3BGlKeQbkTRXBzwz7vtQTyzCeZAAVwe869nz0s6cs3txJHHBK9WidQMcvCA4r37gFgJ/fb4uACc8DQ9U2OKttoYjyw73X3hpZrIABQDyRNNoOq+t0MSVuwstseDc73e356Gil+2wPYYAKQ/997gO+N3MRd625mw+IlY0vCLKO/oB7xnkJ7zg+jW/lkQbHuq290LFeTCxoAM4QBNuMD0t0jCJ2iMT1IHKgvLGAJ0Kl+rANcqa2/fv+E+oWGDwnChNob0g9zCE7TZa1QFHZPJ2y9sjGmDDq34g7VKWwQXPpg4A9d/mxtjrFnCVTMV2SHuyNlY+aqHgGE4XrSYYtb0/molfFJH1RC7CFEiu4ZIaAXAwAau0gcJEgIADcPA0ADAAqG55EwBkQ3s+G+zNeU2dt0m0BX3APZjntcdTgU+hKuIsSeG7uI4Kk3MZmFDaADfOVbePrBhgV7MKazgHttk77+vHvZ5lTFA4PRiOTiIXKB88o5LZCbwY0Q9VdIep9IZe9jt26jzdZ6ZI3AAnEuvPjfZJ4WzcfVzUZf3lQK854JSXg1rVVRbKPlhFcnevfCKPKMy/M42asitHWAHZrij2yk0W90MszvamR3YdPEXPsXKDGpVP/JFP9AGxjdaeKwegI4uuViXagqqDmDCzWgDgIiEMr7fcBApquuBhKgTjd86Qm5yzT3Ak7/4+2f6RMfJRWyDdz2lPJED7hkTIpwPMWbHTWyc2vYyeM8Od7mq7Fb4jKyRLbdefxgsC/cfYbDArOTW7zHP1QIKHjrbzUOzEDjTvK3UDXKC5Z3FcfL7tsyksZvDZdff/2tINXuqp5tHiCTv6sbXgBMWl7qKJCfnsDXaLEIQDpPgW5jjKA8FzQM4j6as4CTwdfgsCj5ABL3jw2FnrsygOG8gD6hOAgR9qTjqOZWv2iVwXUhWqOI6dJwhLuveqapLzsCV2egBAY3cKNh4krNxFuw/KjDwWV51ei0S/BahqSDGRbj7rbuq8zbZKAcItnq+mDvBUXUmiDypMqwPVBOOf461MwC5epBgjN2KvUib6s1eQ5lBVFieP/HzICis9A357ROPDOOqWXnrkym1PwqBi4LGakJRFrkh/iiJAsnH3MaEacW+q023jb3QSN+h8xd4JiVOQcgwiDAoNz8hAuuP5VrOt+yr0cyCEwOOBgKudIepA6B0WlSvCp9szMnC3GX4PMC5YtdeWiFUHwDp69gYhDspqgFE1VIS1AlapEB3O0hTaCuCmrj9g3SGvjx1oBNqMjQcIieCY8DIormMssRgRLdzGHufD2GPBQyUjH4fFiUUR8MJYcW6ACgsefYBgUIBHO/E3+OERcysYauNCJV++ahWAO30lACc7PkV4DnQC9VDkopCa+Csbkq3CCzEvqVjIg3Gw6uCp4DHu+nCGSAcg0Xo3Tyj4Gz6r4Gf3xY1ve2/wQfkJXuXvDE4A/I4PZlirurD2YyLwHbQdIRMA/hcbdrdAHYvPHe0HMMB9EIKh3LExwdm+auaTJ+F1nHVmfBfv45oALvgX/o2UCbguPrvx7amFCrFqZloG18cr2gIeesNbcoMAzou6NTya/kSsG0ywYrzwHfwOnPhW8Z3SAVw2269XCnTKxD2qZrqgkrnFvCQ7EFTNFL+D4d/FHQD8trJJ8GFKbJTk2ur38D6wCibf9Pubt2V7q7zpP5+ltsy7X3OK1U/VZwWkqsV8LltVc1u/elUcUY0lxqDym77zoPqr2u+sclyGXQTgKrI9ztaBLYPt3JUG3+/2f85+ZtvC1geAc9r9bO+zzWTbfx009nf7bdoxtrlszdj+Giwdm+EGON1uZHuarT3bErbj10FHfrfr086wrWL7hu0fbLcHu2CqKMA5DSf5O1s3tlS2k9dBR3+3a2MQm1lsfdleYrsnuBgYKingnHYn23PBkv/NZzsSfBUEyO92TQzps8VsXdheYLubLSC4hJi5XMA5rTrbk2x12Sax5QdLV3utB+t3K5lhzvLMOaxnzuktxZj/qw44p5ULlq72ebZWbLPYtgb/DsLryRAaN7KFsrUIlhHrbraypTD/Vx1wblaB7V6zY5+yjWdbHSwFyc/XwQT8b7ULbIfZ0th+DJZR6G9sfwqWjuGqzP+1AJw/u43tUbaXg6Uqnh4sgegxB+taT9hvxc4Gy3TWCrbRbE2DpWr8M9vN13qerzXIimPVzcFCWP6YrR9bNFtOsBQpGOD/S0Llp2CZHdgTLEE1MViKthrBMoWF6HHDdTBvv1nA+TMoJKzY+9ieYPsnW/1gmQeaHCzzhhAtAOUptotXCAClZaATWDygFruDZdVnDtuwYOnx3wmWi+5htjvYqlwHc/B/CnDFMRDfm9juYvsL21PBMry8ydaQrWOw9Jhj2SKDZWoHXmMN2ya2ncEyPHlKYAfZ9gbLUs46tvRgCf7YYLkQBgfLPCYIei22f7E9EyzpBBbPrcG/UTAVx/4/MH6D6+8dBMUAAAAASUVORK5CYII=';

    doc.addImage(imgData, 'PNG', 150, 5, 50, 20);
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 255);
    doc.setFont("times");
    doc.text('SUCRIRES RAFFINERIES DU TADLA - COSUMAR', 5, 15);
    doc.setFontSize(15);
    doc.setFontType("bold");
    doc.text('Service Informatique', 35, 20);
    doc.setTextColor(0,0,0);
    doc.setFontSize(15);
    doc.text(105, 100, 'Objet : Motif de traitement du demande de congés', null, null, 'center');
    //doc.save('a4.pdf');
    //doc.output('dataurlnewwindow');     //opens the data uri in new window
    doc.setFontType("normal");
    doc.setFontSize(14);
    if(e.sexe=="homme"){
      doc.text(10,135,"Monsieur "+e.nom);
    }else  doc.text(10,135,"Madame "+e.nom);

    doc.setFont("times");
    doc.text(10,145,"Nous avons pris connaissance de votre demande  à bénéficier d'un congé.Nous avons le plaisir de ");
    doc.text(10,150,"vous annoncer, par la présente, que nous avons accepté votre demande de congé d'une durée de ");
    doc.text(10,155,c.dure+" Jours à compter du "+e.dateDeb+"jusqu'à "+e.dateFin+". Votre retour au sein de l'entreprise est donc ");
    doc.text(10,160,"fixé au "+e.dateFin+". ");
    doc.text(15,185,"Nous vous prions d'agréer, Madame/Monsieur, l'expression de notre considération distinguée.")

    doc.text(170,200,'Directeur')
    doc.text(80,230,'Signature Directeur');
    doc.text(150,230,'Signature Employe');
    var date=new Date();
    doc.text(20,280,'le ' + date);
    window.open(doc.output('bloburl'));
    doc.save('DemandeConge'+c.idC+'.pdf');


  }
}
@Component({
  template: '<h1 mat-dialog-title>Justification </h1>\n' +
  '<div mat-dialog-content>\n' +
  '  \n' +
  '  Saisir un msg décri votre décision :<br>' +
  '  <textarea [(ngModel)]="justification" style="width: 441px;height: 111px;"></textarea> ' +
  '</div>\n' +
  '<div mat-dialog-actions>\n' +
  '  <button mat-button mat-dialog-close=\'\'>Annuler</button>\n' +
  '  <button mat-button [mat-dialog-close]=\'true\' cdkFocusInitial>Ok</button>\n' +
  '</div>'
})
export class DialogDescription {

  constructor(
    public dialogRef: MatDialogRef<DialogDescription>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }



}
