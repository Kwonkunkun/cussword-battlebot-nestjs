import { Injectable } from '@nestjs/common';
import { CussWordFilter } from 'cuss-word-filter-ko';

@Injectable()
export class CusswordService extends CussWordFilter {
  constructor() {
    super({ cussWords: ['색햐', '새끼', '색히'], mergeDefaultData: true });
  }
}
