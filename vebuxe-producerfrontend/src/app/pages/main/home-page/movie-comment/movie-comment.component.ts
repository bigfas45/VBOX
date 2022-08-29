import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MovieComment } from 'src/app/core/services/movie-comments.service';
import { MovieCommentsService } from 'src/app/core/services/movie-comments.service';

@Component({
  selector: 'app-movie-comment',
  templateUrl: './movie-comment.component.html',
  styleUrls: ['./movie-comment.component.scss']
})
export class MovieCommentComponent implements OnInit {
  @ViewChild('textarea ', { static: true }) textarea: ElementRef;
  movieCommmentSub: Subscription;

  constructor(private movieCommentsService: MovieCommentsService) { }

  comments: MovieComment[];

  parentComments: MovieComment[];

  ngOnInit(): void {
    this.comments = this.movieCommentsService.getComments();
    this.movieCommmentSub = this.movieCommentsService.commentsUpdated.subscribe(movieComments => {
      this.comments = movieComments;
    })

    this.sortParentComments();
  }

  sendMessage(form: NgForm, event) {
    const newComment: MovieComment = {
      userName: 'Steven Olawale Johnson',
      commentId: 'd' + (Math.random()*1000).toString(),
      parentId: null,
      userType: 'customer',
      postedDate: new Date(),
      comment: form.value.textinput,
      image: 'generic.png'
    }

    this.movieCommentsService.updateComment(newComment)
    form.reset();
    event.currentTarget.reset();
  }

  sortParentComments()​{
    this.parentComments = this.comments.filter(comment =>
      comment.parentId === null
      )
  }



}
