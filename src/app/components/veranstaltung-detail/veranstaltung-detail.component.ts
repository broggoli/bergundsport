import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProgrammService } from "src/app/services/programm/programm.service";
import { VeranstaltungData } from "src/app/interfaces/veranstaltungData";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from '@kolkov/ngx-gallery';

@Component({
  selector: "app-veranstaltung-detail",
  templateUrl: "./veranstaltung-detail.component.html",
  styleUrls: ["./veranstaltung-detail.component.scss"]
})
export class VeranstaltungDetailComponent implements OnInit {
  id: number;
  veranstaltung: VeranstaltungData;
  //matList: Observable<any>;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  showFullMatList: boolean = false;
    

  constructor(
    private route: ActivatedRoute,
    private programmService: ProgrammService,
  ) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.programmService
      .getProgramm()
      .subscribe(
        programm => {
          this.veranstaltung = programm.filter( veranstaltung => veranstaltung.id === this.id )[0];
          console.log(this.veranstaltung)
          this.galleryImages = []
          if(this.veranstaltung?.image_urls)
            this.galleryImages = this.veranstaltung?.image_urls.map(((s, i) => { 
              
              return { 
                small: s,
                medium: s,
                big: s,
                description: "imgage"+i} 
            }));
        }
      );
      this.galleryOptions = [
        {
            width: '100%',
            height: '500px',
            thumbnailsColumns: 5,
            imageAnimation: NgxGalleryAnimation.Fade,
            imageArrows: true,
            imageSwipe: true,
            imageSize: NgxGalleryImageSize.Contain,
            thumbnailsMargin: 5,
            thumbnailsArrows: true,
            //thumbnailsRows: 2,
            //thumbnailsPercent: 20,
            thumbnailsAutoHide: true,

            preview: false,
            thumbnailSize: NgxGalleryImageSize.Cover,

            arrowPrevIcon: 'fa fa-arrow-circle-left',
            arrowNextIcon: 'fa fa-arrow-circle-right',

            previewFullscreen: false,
            previewCloseOnEsc: true,
            previewCloseOnClick: true,
            imageDescription: false,
            thumbnailsSwipe: true,
            lazyLoading: true
            
            //imagePercent: 85,
        },
        // max-width 400
        {
            breakpoint: 400,
            width: '100%',
            height: '300px',
            preview: false
        }
    ];

  }
  toggleMatList() {
    this.showFullMatList = !this.showFullMatList
  }
}
