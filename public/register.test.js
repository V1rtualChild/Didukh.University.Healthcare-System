const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Registration Page', () => {
  let dom;
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../views/register.hbs'), 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  it('should have a registration form with required fields', () => {
    const form = document.querySelector('form');
    expect(form).toBeTruthy();

    const nameInput = form.querySelector('input[name="name"]');
    expect(nameInput).toBeTruthy();
    expect(nameInput.required).toBe(true);

    const emailInput = form.querySelector('input[name="email"]');
    expect(emailInput).toBeTruthy();
    expect(emailInput.required).toBe(true);
    expect(emailInput.type).toBe('email');

    const passwordInput = form.querySelector('input[name="password"]');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.required).toBe(true);
    expect(passwordInput.type).toBe('password');

    const confirmPasswordInput = form.querySelector('input[name="passwordConfirm"]');
    expect(confirmPasswordInput).toBeTruthy();
    expect(confirmPasswordInput.required).toBe(true);
    expect(confirmPasswordInput.type).toBe('password');
  });

  it('should have a submit button', () => {
    const submitButton = document.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
  });

  it('should have a link to login page', () => {
    const loginLink = document.querySelector('.sing-in a[href="/login"]');
    expect(loginLink).toBeTruthy();
  });
});