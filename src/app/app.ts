import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('workcalendar');
   ifDay: boolean | undefined;
   week: number | undefined;
   
   

  constructor() {


    this.ifDay = false;
    this.updatePage();
  }
  updatePage(){
    const today = new Date();
    this.week = getWeekNumber(today);
    //this.week = 22;
    console.log(`Semana actual: ${this.week}`);
    // Determinar si la semana es par o impar
    this.ifDay = esPar(this.week);
    console.log(`Semana actual: ${this.ifDay}`);
 }
updateWeekNext(){
    
    const today = new Date();
    this.week = getWeekNumber(today);
    //this.week = 22;
    console.log(`Semana actual: ${this.week}`);
    // Determinar si la semana es par o impar
    this.ifDay = esPar(this.week+1);
    console.log(`Semana actual: ${this.ifDay}`);
 }
 updateWeekActualy(){
    
    const today = new Date();
    this.week = getWeekNumber(today);
    //this.week = 22;
    console.log(`Semana actual: ${this.week}`);
    // Determinar si la semana es par o impar
    this.ifDay = esPar(this.week);
    console.log(`Semana actual: ${this.ifDay}`);
 }
}
function getWeekNumber(date: Date): number {
  const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = tempDate.getUTCDay() || 7; // Ajustar domingo (0) a 7
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - day); // Mover al jueves de la semana
  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((tempDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return weekNo;
}
function esPar(numero: number): boolean {
  return numero % 2 === 0;
}
