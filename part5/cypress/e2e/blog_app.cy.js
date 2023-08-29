describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

    const user = {
      name: 'Phuong Vu',
      username: 'anhphuong',
      password: '1234',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);

    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.get('#logInUsername');
    cy.get('#logInPassword');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#logInUsername').type('anhphuong');
      cy.get('#logInPassword').type('1234');
      cy.contains('Log in').click();

      cy.contains('anhphuong logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#logInUsername').type('anhphuong');
      cy.get('#logInPassword').type('wrong');
      cy.contains('Log in').click();

      cy.contains('Invalid username or password').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'anhphuong',
        password: '1234',
      });
    });

    it('A blog can be created', function () {
      const blog = {
        title: 'test title',
        author: 'test author',
        url: 'http://test-url.com',
      };
      cy.contains('Create new blog').click();

      cy.get('input[name="title"]').type(blog.title);
      cy.get('input[name="author"]').type(blog.author);
      cy.get('input[name="url"]').type(blog.url);
      cy.get('.createBtn').click();

      cy.contains(blog.title);
    });

    describe('When a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test title',
          author: 'test author',
          url: 'http://test-url.com',
        });
      });

      it('can like a blog', function () {
        cy.contains('test title').parent().parent().as('blogParentDiv');
        cy.get('@blogParentDiv').get('.likeBtn').as('theLikeBtn');
        cy.get('@blogParentDiv').contains('View').click();
        cy.get('@theLikeBtn').click();

        cy.get('@theLikeBtn').should('contain', 'Liked');
      });
    });

    describe('When several blog exit', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 7,
        });

        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
        });

        cy.createBlog({
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
          likes: 10,
        });
      });

      it('blogs in descending order', function () {
        //View details of all blogs
        cy.get('button.view').each(($button) => {
          $button.click();
        });

        //Check if blogs are in descending order
        cy.get('.blogLike').eq(0).should('contain', 10);
        cy.get('.blogLike').eq(1).should('contain', 7);
        cy.get('.blogLike').eq(2).should('contain', 5);
      });

      describe('When several blogs by several users exit', function () {
        beforeEach(function () {
          //Create 1 more user
          const user = {
            name: 'Linda Hopolainen',
            username: 'lindahopolainen',
            password: 'linda',
          };

          cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
          cy.visit('');

          //Log out anhphuong user
          cy.get('#logOutBtn').click();

          //Log in with new user
          cy.login({
            username: 'lindahopolainen',
            password: 'linda',
          });

          //New blog created by new user
          cy.createBlog({
            title: 'Canonical string increasing',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          });

          cy.contains('Canonical string increasing').parent().as('blogDivParentByUser2');
        });

        it('only creator can delete', function () {
          //Delete blog created by correct user
          cy.get('@blogDivParentByUser2').contains('Remove').click();
          cy.contains('You have successfully deleted the blog');
          cy.contains('Canonical string increasing').should('not.exist');
        });

        it('only creator can Remove btn', function () {
          cy.contains('React patterns').parent().as('blogDivParentByUser1');

          //Cannot see Remove btn in blog created by another
          cy.get('@blogDivParentByUser1').contains('Remove').should('not.exist');

          //Can see Remove btn in own blog
          cy.get('@blogDivParentByUser2').contains('Remove');
        });
      });
    });
  });
});
