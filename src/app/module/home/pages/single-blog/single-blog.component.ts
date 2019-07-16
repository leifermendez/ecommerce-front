import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestService} from '../../../../shared/services/rest.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
  public id: any = null;
  public loading = false;
  public data: any = null;

  constructor(private route: ActivatedRoute,
              private rest: RestService) {

  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.id = routeParams['id'];
      if (this.id) {
        this.loadData();
      }
    });
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/blog/${this.id}`)
      .then((response: any) => {
        if (response['status'] === 'success') {
          this.loading = false;
          if (response['data']) {
            this.data = response['data'];
          }
        }
      });
  };

}
