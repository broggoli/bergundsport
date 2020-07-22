import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';
import { PageData } from 'src/app/interfaces/pageData';

@Component({
  selector: 'app-agb',
  templateUrl: './agb.page.html',
  styleUrls: ['./agb.page.scss'],
})
export class AgbPage implements OnInit {

  pageData: PageData;
  constructor( private pageService: PageService) { }

  ngOnInit() {
    this.pageService
      .getPageData("agb")
      .subscribe(data => (this.pageData = data));
  }

}
