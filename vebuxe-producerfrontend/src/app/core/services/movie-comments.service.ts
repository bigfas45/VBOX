import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface MovieComment {
  userName: string;
  commentId: string;
  parentId: string;
  userType: string;
  postedDate: Date;
  comment: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieCommentsService {
  commentsUpdated = new Subject<MovieComment[]>();
  constructor() {}

  comments: MovieComment[] = [
    {
      userName: 'Steven Olawale Johnson ',
      commentId: 'c1',
      parentId: null,
      userType: 'customer',
      postedDate: new Date(2021, 11, 20),
      comment: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
      image: 'generic.png',
    },
    {
      userName: 'Akinkunmi John ',
      commentId: 'c2',
      parentId: null,
      userType: 'producer',
      postedDate: new Date(2021, 11, 20),
      comment: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..</p>`,
      image: 'generic.png',
    },
    {
      userName: 'Akinkunmi John ',
      userType: 'producer',
      commentId: 'c3',
      parentId: null,
      postedDate: new Date(2021, 11, 20),
      comment: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..</p>`,
      image: 'generic.png',
    },
    {
      userName: 'Akinkunmi John ',
      userType: 'producer',
      commentId: 'c1r1',
      parentId: 'c1',
      postedDate: new Date(2021, 11, 20),
      comment: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..</p>`,
      image: 'generic.png',
    },
    {
      userName: 'Akinkunmi John ',
      userType: 'producer',
      commentId: 'c2r1',
      parentId: 'c2',
      postedDate: new Date(2021, 11, 20),
      comment: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..</p>`,
      image: 'generic.png',
    },
    {
      userName: 'Akinkunmi John ',
      userType: 'producer',
      commentId: 'c3r1',
      parentId: 'c3',
      postedDate: new Date(2021, 11, 20),
      comment: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..</p>`,
      image: 'generic.png',
    },
    {
      userName: 'Akinkunmi John ',
      userType: 'producer',
      commentId: 'c1r2',
      parentId: 'c1',
      postedDate: new Date(2021, 11, 20),
      comment: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..</p>`,
      image: 'generic.png',
    },
  ];

  public getComments() {
    return this.comments.slice();
  }

  public updateComment(comment: MovieComment) {
    this.comments.push(comment);
    this.commentsUpdated.next(this.comments.slice());
  }
}
