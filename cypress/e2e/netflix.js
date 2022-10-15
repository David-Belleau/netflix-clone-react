import faker from 'faker'

describe('netflix e2e', () => {
  it('classic user path', () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    }

    cy.visit('/')

    cy.findByRole('button', {name: /Nouveau sur netflix ?/i}).click()

    cy.findByRole('dialog').within(() => {
      cy.findByRole('textbox', {name: /E-mail/i}).type(user.username)
      cy.findByLabelText(/Mot de passe/i).type(user.password)
      cy.findByRole('button', {name: /INSCRIVEZ-VOUS/i}).click()
    })

    cy.findByRole('link', {name: /Séries/i}).click()
    cy.findByRole('heading', {name: /Séries Netflix/i}).should('exist')
    cy.findByRole('heading', {name: /Les mieux notées/i}).should('exist')
    cy.findByRole('heading', {name: /Séries populaires/i}).should('exist')
    cy.findByRole('heading', {name: /Documentaires/i}).should('exist')
    cy.findByRole('heading', {name: /Séries criminelles/i}).should('exist')

    cy.findByRole('link', {name: /Ma liste/i}).click()
    cy.findByRole('heading', {name: /Films favoris/i}).should('exist')
    cy.findByRole('heading', {name: /Séries favorites/i}).should('exist')

    cy.get('p').contains("Vous n'avez pas encore ajouté de films.")
    cy.get('p').contains("Vous n'avez pas encore ajouté de séries.")

    cy.findByRole('button', {name: /Ajouter à ma liste/i}).click()
    cy.findByRole('listitem', {name: /movie/i}).within(() => {
      cy.findAllByRole('link').should('have.length', 1)
    })

    cy.findByRole('button', {name: /Supprimer de ma liste/i}).click()
    cy.findByRole('listitem', {name: /movie/i}).within(() => {
      cy.findAllByRole('link').should('have.length', 0)
    })

    cy.findByRole('textbox', {name: /search/i}).type('jumanji{enter}')
    cy.findByRole('listitem', {name: /movie/i}).within(() => {
      cy.findAllByRole('link').should('have.length', 5)
    })
    cy.findByRole('listitem', {name: /tv/i}).within(() => {
      cy.findAllByRole('link').should('have.length', 1)
    })

    cy.findByRole('button', {name: /logout/i}).click()

    cy.findByRole('dialog').within(() => {
      cy.findByRole('textbox', {name: /E-mail/i}).type(user.username)
      cy.findByLabelText(/Mot de passe/i).type(user.password)
      cy.findByRole('button', {name: /CONNEXION/i}).click()
    })

    cy.findByRole('link', {name: /Séries/i}).click()
    cy.findByRole('heading', {name: /Séries Netflix/i}).should('exist')
    cy.findByRole('heading', {name: /Les mieux notées/i}).should('exist')
  })
})
