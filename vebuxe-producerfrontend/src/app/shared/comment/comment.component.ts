import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MovieComment, MovieCommentsService } from 'src/app/core/services/movie-comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @ViewChild("replyInput", { static: false }) replyInput : ElementRef;

  constructor(private movieCommentsService: MovieCommentsService) { }

  childComments: MovieComment[];

  rootcomments: MovieComment[];

  rootCommmentsSub: Subscription;

  replyMessage: string = '';

  activeComment =  null;

  show: false;

  @Input() comments: MovieComment[];

  replyForm: FormGroup;

  ngOnInit(): void {
    console.log(this.activeComment === this.comments[1])
    this.rootcomments = this.movieCommentsService.getComments();
    this.rootCommmentsSub = this.movieCommentsService.commentsUpdated.subscribe(movieComments => {
      this.comments = movieComments;
    })
    this.replyForm = new FormGroup({
      'reply': new FormControl(null, [Validators.required])
    })
  }

  sortChildrenComments(parentComment) {
    return this.rootcomments.filter(comment =>
      comment.parentId === parentComment.commentId
      )
  }

  replyComment(comment) {
    this.activeComment = comment.commentId;
    console.log(this.activeComment)
    this.rootcomments.forEach(comment => {
      if (comment === comment) {
        this.replyInput.nativeElement.focus();
      }
    })

  }

  sendReply(event) {
    if(event.keyCode === 13) {
      console.log(this.replyMessage);
      this.replyForm.reset();
      this.activeComment = null;
    } else if (event.keyCode === 27) {
      console.log("canceled");
      this.replyForm.reset();
      this.activeComment = null;
    }
  }



}
