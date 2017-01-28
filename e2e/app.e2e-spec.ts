import { StduentRecruitmentSystemPage } from './app.po';

describe('stduent-recruitment-system App', function() {
  let page: StduentRecruitmentSystemPage;

  beforeEach(() => {
    page = new StduentRecruitmentSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
