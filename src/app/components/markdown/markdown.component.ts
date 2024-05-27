import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { EditableMarkdownComponent } from '../editable-markdown/editable-markdown.component';

@Component({
  selector: 'app-markdown',
  standalone: true,
  imports: [CommonModule, MarkdownModule, EditableMarkdownComponent],
  templateUrl: './markdown.component.html',
  styleUrl: './markdown.component.scss',
})
export class MarkdownComponent implements OnInit {
  markdownContent = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const companyId = params['id'];
      this.loadMarkdown(companyId);
    });
  }

  loadMarkdown(companyId: number) {
    this.http
      .get(`assets/markdown/${companyId}.md`, { responseType: 'text' })
      .subscribe((data) => (this.markdownContent = data));
  }
  onMarkdownChange(newContent: string) {
    this.markdownContent = newContent;
  }
}
