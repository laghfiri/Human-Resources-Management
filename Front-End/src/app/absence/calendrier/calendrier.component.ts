import {
  Component,
  ViewChild,
  TemplateRef, OnInit, ChangeDetectionStrategy
} from '@angular/core';
import {CongesService} from '../../../services/conges.service';
import {employee} from '../../model/model.employee';
import {Title} from '@angular/platform-browser';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent, DAYS_OF_WEEK
} from 'angular-calendar';
import {PresenceService} from '../../../services/presence.service';

const colors: any = {
  my: {
    primary: '#009cde',
    secondary: '#003087'
  },

};

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierAComponent implements OnInit {

  constructor(private modal: NgbModal,private PresenceService: PresenceService,private title:Title) { }
  currentUser: employee = new employee();

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getAbsence();
    this.title.setTitle("Calendrier Conges - Cosumar")

  }

  id: number = this.currentUser.matricule;
  page: number = 0;
  size: number = 5;
  pageConges: any;
  ArrayS: number;
  action:string;
  pages: Array<number>;
  nbrAbsence:number;
  getAbsence(){
    this.PresenceService.getAbsence(this.currentUser.matricule).subscribe(value => {
      //this.pageConges = value;
      //this.pages = new Array(value.totalPages);
      //this.ArrayS = value.totalPages;
      console.log(value);
      this.nbrAbsence=value.length;
      for(let absence of value){
        this.events.push({
          title: 'Identifiant absence numéro = '+absence['idA'],
          start: startOfDay(absence['dateAbsence']),
          end: endOfDay(absence['dateAbsence']),
          color: colors.my,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        });
      }
      this.refresh.next();

    });
  }
///Calendrier congé

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  locale: string = 'fr';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
  ];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


}
