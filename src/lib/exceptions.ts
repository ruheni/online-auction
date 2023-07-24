export class AuthRequiredError extends Error {
  constructor(
    message = JSON.stringify({
      status: 401,
      text: 'Auth is required to access this page',
    })
  ) {
    super(message);
    this.name = 'AuthRequiredError';
  }
}
