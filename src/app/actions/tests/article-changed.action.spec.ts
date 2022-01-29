import { putArticleIntoStore } from '../article-changed.action';

describe('article-changed.action', () => {
  it('should return action with patch data', () => {
    const expected = {
      type: '[EditArticle Page] Article Changed',
      articlePatchData: 'foo'
    };

    const result: any = putArticleIntoStore({ articlePatchData: 'foo' });

    expect(result).toEqual(expected);
  });
});
