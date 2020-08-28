import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service.js';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  
  @Input() header_image_url: String = '../../../assets/header_image_mid.png';
  pages: any;
  selectedPath = "/";
  constructor(private pageService: PageService) { 
    this.pages = pageService.getPages();
  }

  ngAfterViewInit() {
    this.pageService.currURL().subscribe( url => {if( url ) this.selectedPath =  url} )
  }
  
  checkURL(selectedPath, url) {
    console.log(selectedPath, url)
    return selectedPath.includes(url) || ( selectedPath === "/" &&  url.includes("/home")) ;
  }
}
