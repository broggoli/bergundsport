import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';
import { PageData } from 'src/app/interfaces/pageData';

@Component({
  selector: 'app-bergfuerer-tarife',
  templateUrl: './bergfuerer-tarife.page.html',
  styleUrls: ['./bergfuerer-tarife.page.scss'],
})
export class BergfuererTarifePage implements OnInit {

  pageData: PageData;
  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.pageService
      .getPageData("bergfuehrertarife")
      .subscribe(data => (this.pageData = data));
  }

}
