import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBlog(): string {
    return 'Blog successfully created again!';
  }

  findAll() {
    return [
      { id: 1, title: 'First Post', content: 'Hello everyone.' },
      { id: 2, title: 'Second Post', content: 'This is another post.' },
      { id: 3, title: 'Third Post', content: 'This is the third post.' },
      { id: 4, title: 'Last Post', content: 'This is the last post.' },
    ];
  }
}
