Cypress.Commands.add('login', function ({ username, password }) {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password,
  }).then(({ body }) => {
    window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(body));
  });
  cy.visit('');
});

Cypress.Commands.add('createBlog', function (blog) {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: blog,
    headers: {
      Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('loggedInBlogAppUser')).token}`,
    },
  });
  cy.visit('');
});
