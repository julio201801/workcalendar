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
   lunes:Date | undefined;
   resultado: string | undefined;
   nextMonday: Date | undefined;
   nextWednesday: Date | undefined;
   nextWednesdayResult: string | undefined;
   ifBoton: boolean | undefined;
  constructor() {
    this.ifDay = false;
    this.updatePage();
  }
  updatePage(){
    this.ifBoton = false;
    const today = new Date();
    this.week = getWeekNumber(today);
    //this.week = 22;
    console.log(`Semana actual: ${this.week}`);
    // Determinar si la semana es par o impar
    this.ifDay = esPar(this.week);
    console.log(`Semana actual: ${this.ifDay}`);
    const hoy = new Date(); // Ej: sábado 16/08/2025
    this.lunes = this.getMonday(hoy);
    console.log(`lunes actual: ${ this.lunes}`);
    this.resultado = this.formatFechaConSeparadores(this.lunes);
    this.nextWednesday = this.getWednesdayOfThisWeek();
    this.nextWednesdayResult = this.formatFechaConSeparadores(this.nextWednesday);

 }
updateWeekNext(){
    this.ifBoton = true;
    const today = new Date();
    this.week = getWeekNumber(today);
    //this.week = 22;
    console.log(`Semana actual: ${this.week}`);
    // Determinar si la semana es par o impar
    this.ifDay = esPar(this.week+1);
    console.log(`Semana actual: ${this.ifDay}`);
    this.nextMonday = this.getNextMonday();
    this.resultado = this.formatFechaConSeparadores(this.nextMonday);
    this.nextWednesday = this.getNextWednesday();
    this.nextWednesday = this.getWednesdayOfThisWeek();
    this.nextWednesdayResult = this.formatFechaConSeparadores(this.nextWednesday);
    console.log(`Semana actual: ${this.nextWednesdayResult}`);
 }
 updateWeekActualy(){
    
    const today = new Date();
    this.week = getWeekNumber(today);
    //this.week = 22;
    console.log(`Semana actual: ${this.week}`);
    // Determinar si la semana es par o impar
    this.ifDay = esPar(this.week);
    console.log(`Semana actual: ${this.ifDay}`);
    this.updatePage();
 }
 getMonday(fecha: Date = new Date()): Date {
  const day = fecha.getDay(); // 0 (domingo) a 6 (sábado)
  const diff = fecha.getDate() - day + (day === 0 ? -6 : 1); // Ajuste si es domingo
  return new Date(fecha.setDate(diff));
}
formatFechaDDMMYYYY(fecha: Date): string {
  const dd = String(fecha.getDate()).padStart(2, '0');
  const mm = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
  const yyyy = fecha.getFullYear();
  return `${dd}${mm}${yyyy}`;
}
formatFechaConSeparadores(fecha: Date): string {
  const dd = String(fecha.getDate()).padStart(2, '0');
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const yyyy = fecha.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
getNextMonday(fecha: Date = new Date()): Date {
  const day = fecha.getDay(); // 0 (domingo) a 6 (sábado)
  const diff = fecha.getDate() - day + (day === 0 ? -6 : 1); // lunes de esta semana
  const mondayThisWeek = new Date(fecha.setDate(diff));
  
  // Sumar 7 días para el siguiente lunes
  const nextMonday = new Date(mondayThisWeek);
  nextMonday.setDate(mondayThisWeek.getDate() + 7);
  
  return nextMonday;
}
getNextWednesday(fecha: Date = new Date()): Date {
  const day = fecha.getDay(); // 0 (domingo) a 6 (sábado)
  const diffToMonday = fecha.getDate() - day + (day === 0 ? -6 : 1); // lunes de esta semana
  const mondayThisWeek = new Date(fecha.setDate(diffToMonday));

  // Sumar 9 días para llegar al miércoles de la próxima semana
  const nextWednesday = new Date(mondayThisWeek);
  nextWednesday.setDate(mondayThisWeek.getDate() + 9);

  return nextWednesday;
}
getWednesdayOfThisWeek(): Date {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
  const daysUntilWednesday = (3 - dayOfWeek + 7) % 7; // 3 = miércoles
  const wednesday = new Date(today);
  wednesday.setDate(today.getDate() + daysUntilWednesday);
  return wednesday;
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
