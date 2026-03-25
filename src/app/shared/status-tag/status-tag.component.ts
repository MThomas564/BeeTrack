import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-status-tag',
    templateUrl: './status-tag.component.html',
    styleUrls: ['./status-tag.component.css'],
    standalone: false
})
export class StatusTagComponent {
  @Input() name!: string;
  @Input() value!: boolean;
}