import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseComponent } from '../../components/showcase/showcase.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ShowcaseComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  favorites!: boolean;
  searchValue!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      console.log(params.get('q'));
      this.searchValue = params.get('q') || '';
    });
  }
}
