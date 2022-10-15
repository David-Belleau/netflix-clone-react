import userEvent from '@testing-library/user-event'
import {render, screen, waitForElementToBeRemoved} from 'test/test-utils'
import {LoginRegister} from 'components/LoginRegister'

test('Login or register popup', async () => {
  render(<LoginRegister open={true}></LoginRegister>)
  await waitForElementToBeRemoved(() => screen.getByRole('alert'))
  expect(screen.getByRole('heading', {name: 'Connexion'})).toBeInTheDocument()
  userEvent.click(screen.getByRole('button', {name: /Nouveau sur Netflix ?/i}))
  expect(
    screen.getByRole('heading', {name: 'Inscrivez-vous'}),
  ).toBeInTheDocument()
})
