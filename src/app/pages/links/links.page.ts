import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';
import { PageData } from 'src/app/interfaces/pageData';

@Component({
  selector: 'app-links',
  templateUrl: './links.page.html',
  styleUrls: ['./links.page.scss'],
})
export class LinksPage implements OnInit {

  pageData: PageData;
  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.pageService
      .getPageData("links")
      .subscribe(data => (this.pageData = data));
  }

}
