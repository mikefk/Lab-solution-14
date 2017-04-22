import { Lab14solutionPage } from './app.po';

describe('lab14solution App', () => {
  let page: Lab14solutionPage;

  beforeEach(() => {
    page = new Lab14solutionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
