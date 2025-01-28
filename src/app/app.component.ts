import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatatableComponent } from './datatable/datatable.component';
import { WorklistService } from './worklist.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [DatatableComponent, CommonModule, FormsModule],
  providers: [WorklistService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Worklist';

  patients$: Observable<any[]> = inject(WorklistService).getPatients() || of([]);

  studies$: Observable<any[]> = of([]);

  series$: Observable<any[]> = of([]);

  instances$: Observable<any[]> = of([]);

  nameSearch: string = '';
  modalitySearch: string = '';
  procedureSearch: string = '';
  numOfFramesSearch: string = '';

  constructor(public worklistService: WorklistService) { }

  selectedPatient: any;
  selectedStudy: any;
  selectedSeries: any;
  selectedInstance: any;

  onPatientSelected(patient: any) {
    console.log('Selected patient: ', patient);
    this.selectedStudy = null;
    if (this.selectedPatient != patient) {
      this.selectedPatient = patient;
      this.updateStudies(patient);
    }
  }

  onStudiesSelected(study: any) {
    console.log('Selected study: ', study);
    this.selectedSeries = null;
    if (this.selectedStudy != study) {
      this.selectedStudy = study;
      this.updateSeries(study);
    }
  }

  onSeriesSelected(series: any) {
    console.log('Selected series: ', series);
    this.selectedInstance = null;
    if (this.selectedSeries != series) {
      this.selectedSeries = series;
      this.updateInstances(series);
    }
  }

  onInstanceSelected(instance: any) {
    console.log('Selected instance: ', instance);
    if (this.selectedInstance != instance) {
      this.selectedInstance = instance;
    }
  }

  updateStudies(patient: any) {
    this.studies$ = this.worklistService.getStudies(patient['studiesCount']) || of([]);
    this.series$ = of([]);
  }

  updateSeries(study: any) {
    this.series$ = this.worklistService.getSeries(study['seriesCount']) || of([]);
    this.instances$ = of([]);
  }

  updateInstances(series: any) {
    this.instances$ = this.worklistService.getInstances(series['instancesCount']) || of([]);
  }

}
