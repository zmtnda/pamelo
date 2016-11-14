import { PameloPage } from './app.po';

describe('pamelo App', function() {
  let page: PameloPage;

  beforeEach(() => {
    page = new PameloPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
