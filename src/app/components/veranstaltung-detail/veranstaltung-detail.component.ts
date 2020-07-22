import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProgrammService } from "src/app/services/programm/programm.service";
import { VeranstaltungData } from "src/app/interfaces/veranstaltungData";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: "app-veranstaltung-detail",
  templateUrl: "./veranstaltung-detail.component.html",
  styleUrls: ["./veranstaltung-detail.component.scss"]
})
export class VeranstaltungDetailComponent implements OnInit {
  id: number;
  veranstaltung: VeranstaltungData;
  matList: Observable<any>;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
    

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
          this.matList = this.programmService.getMatLists().pipe( 
              map(d => d.filter(
                  list => list.title === this.veranstaltung.matList
                )[0]
              )
          )
        }
      );
      this.galleryOptions = [
        {
            width: '600px',
            height: '400px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide
        },
        // max-width 800
        {
            breakpoint: 800,
            width: '100%',
            height: '600px',
            imagePercent: 80,
            thumbnailsPercent: 20,
            thumbnailsMargin: 20,
            thumbnailMargin: 20
        },
        // max-width 400
        {
            breakpoint: 400,
            preview: false
        }
    ];

    this.galleryImages = [
        {
            small: 'assets/1-small.jpg',
            medium: 'assets/1-medium.jpg',
            big: 'assets/1-big.jpg'
        },
        {
            small: 'assets/2-small.jpg',
            medium: 'assets/2-medium.jpg',
            big: 'assets/2-big.jpg'
        },
        {
            small: 'assets/3-small.jpg',
            medium: 'assets/3-medium.jpg',
            big: 'assets/3-big.jpg'
        }
    ];

  }
}
