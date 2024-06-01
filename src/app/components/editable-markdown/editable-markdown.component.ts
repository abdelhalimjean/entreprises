import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-editable-markdown',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule],
  templateUrl: './editable-markdown.component.html',
  styleUrl: './editable-markdown.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class EditableMarkdownComponent {
  @Input() markdownText: string = '';
  @Output() markdownChanged = new EventEmitter<string>();
  showEditor = false;

  onMarkdownChange() {
    this.markdownChanged.emit(this.markdownText);
  }
  toggleEditor() {
    this.showEditor = !this.showEditor;
  }
}
