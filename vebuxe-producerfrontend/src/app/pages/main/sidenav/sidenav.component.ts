import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {
  @ViewChild('listOptions', {static: false}) navList;

  navOptions: string[] = ['dashboard', 'settings', 'reviewers', 'Log Out'];

  selectedOption = 'dashboard';

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('')
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const urlSplit = event.url.split('/');

        const urlLength =  urlSplit.length;
        console.log('here')
       console.log("the url is" + urlLength)

      }

    })

  }

  ngAfterViewInit(): void {
    // console.log(this.navList.value)
    // this.navList.value = 'Settings'
    // console.log(this.navList)


  }

  optionSelect(option) {

    this.selectedOption  = option;
    if (this.selectedOption === 'Log Out') {
      this.router.navigate(['auth'])
      return
    }
    this.router.navigate(['main/'+this.selectedOption])
  }



}
