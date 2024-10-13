import { Component } from '@angular/core';
import { StudentService } from '../../student-service/student.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';



@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrl: './student-attendance.component.css'
})
export class StudentAttendanceComponent {
  attendance: string[];
  events: any = [
    // { title: 'Present', date: '2024-09-12', color: '#000FF' },
    // { title: 'Absent', date: '2024-09-13', color: '#0000FF' },
    // { title: 'Present', date: '2024-09-14', color: '#0000FF' },
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    height:'80vh',
    expandRows:true,
    viewHeight:'20%',
    handleWindowResize:true,
    eventColor: '#378006',
    events: this.events // Bind events to the calendar
  };

  constructor(private studentService: StudentService) {}

  email: string = '';

  ngOnInit() {
    this.getEmail();
    this.getStudentAttendance();
    // this.stylings();
  
  }

  getStudentAttendance() {
    this.studentService.getStudentAttendanceByEmail().subscribe((res) => {
      console.log(res);
  
      res.forEach((attendance: any) => {
        const isoDate = attendance.date;
  
        // Convert the ISO date to a local date string in 'YYYY-MM-DD' format
        const localDate = new Date(isoDate).toLocaleDateString('en-CA'); // 'en-CA' outputs in 'YYYY-MM-DD' format
  
        // Push the event with the formatted local date
        this.events.push({ title: attendance.att, date: localDate });
      });
  
      // Update the calendarOptions to refresh the calendar with the new events
      this.calendarOptions = {
        ...this.calendarOptions,
        events: [...this.events], // Trigger change detection by updating the reference
      };
  
      // Debugging the events
      console.log(this.events);
    });
  }
  

  getEmail() {
    this.email = this.studentService.getEmail();
    console.log(this.email);
  }

  


  addButton(){
    // Step 1: Target the div using its class name
const divElements = document.getElementsByClassName('::ng-deep fc-daygrid-day-top');

// Step 2: Ensure that there is at least one element with this class name
if (divElements.length > 0) {
  const divElement = divElements[0] as HTMLElement; // Get the first div if there are multiple
  
  // Step 3: Create a button element
  const button = document.createElement('button');
  button.innerHTML = 'Click Me';
  button.className = 'myButtonClass'; // Optionally, set a class name for the button
  
  // Step 4: Append the button to the div
  divElement.appendChild(button);
}

  }

  
}
