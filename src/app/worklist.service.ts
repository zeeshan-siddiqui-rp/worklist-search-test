import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorklistService {

  names = ['John Doe', 'Jane Smith', 'Robert Brown', 'Emily White'];
  cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  states = ['NY', 'CA', 'IL', 'TX', 'AZ'];
  modalities = ['CT', 'MRI', 'X-ray', 'Ultrasound', 'PET'];
  procedures = ['Chest CT', 'Brain MRI', 'Abdomen X-ray', 'Heart Ultrasound'];

  constructor() { }

  getPatients() {
    return of(this.generatePatients(5));
  }

  getStudies(count: number) {
    return of(this.generateStudies(count));
  }

  getSeries(count: number) {
    return of(this.generateSeries(count));
  }

  getInstances(count: number) {
    return of(this.generateInstances(count));
  }

  private randomId(): string {
    return Math.random().toString(10).substring(2, 5);
  }

  private randomDate(): string {
    const start = new Date(2015, 0, 1).getTime();
    const end = new Date().getTime();
    return new Date(start + Math.random() * (end - start)).toISOString();
  }

  private randomName(): string {
    return this.names[Math.floor(Math.random() * this.names.length)];
  }

  private randomCity(): string {
    return this.cities[Math.floor(Math.random() * this.cities.length)];
  }

  private randomState(): string {
    return this.states[Math.floor(Math.random() * this.states.length)];
  }

  private randomModality(): string {
    return this.modalities[Math.floor(Math.random() * this.modalities.length)];
  }

  private randomProcedure(): string {
    return this.procedures[Math.floor(Math.random() * this.procedures.length)];
  }

  generateInstances(count: number): any[] {
    return Array.from({ length: count }, () => ({
      id: this.randomId(),
      numberOfFrames: Math.floor(Math.random() * 500) + 1,
      date: this.randomDate(),
      instanceUID: this.randomId(),
      description: `Instance description ${this.randomId()}`,
    }));
  }

  generateSeries(count: number): any[] {
    return Array.from({ length: count }, () => ({
      id: this.randomId(),
      procedure: this.randomProcedure(),
      date: this.randomDate(),
      instanceUID: this.randomId(),
      description: `Series description ${this.randomId()}`,      
      instancesCount: Math.floor(Math.random() * 10) + 1
    }));
  }

  generateStudies(count: number): any[] {
    return Array.from({ length: count }, () => ({
      id: this.randomId(),
      modality: this.randomModality(),
      date: this.randomDate(),
      instanceUID: this.randomId(),
      description: `Study description ${this.randomId()}`,
      seriesCount: Math.floor(Math.random() * 8) + 1
    }));
  }

  generatePatients(count: number): any[] {
    return Array.from({ length: count }, () => ({
      id: this.randomId(),
      name: this.randomName(),
      age: Math.floor(Math.random() * 100) + 1,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      city: this.randomCity(),
      state: this.randomState(),
      studiesCount: Math.floor(Math.random() * 10)
    }));
  }
}
