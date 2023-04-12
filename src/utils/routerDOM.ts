import { HomePage } from '../../HomePage';
import { ErrorPage } from '../pages/Error/ErrorPage';
import { LoginPage } from '../pages/Login/LoginPage';
import { ChatsPage } from '../pages/Chats/ChatsPage';
import { EditPasswordPage } from '../pages/EditPassword/EditPasswordPage';
import { EditProfilePage } from '../pages/EditProfile/EditProfilePage';
import { ProfilePage } from '../pages/Profile/ProfilePage';
import { RegistrationPage } from '../pages/Registration/RegistrationPage';

const ROUTES = {
  home: HomePage,
  error: ErrorPage,
  login: LoginPage,
  profile: ProfilePage,
  registration: RegistrationPage,
  editProfile: EditProfilePage,
  chats: ChatsPage,
  editPassword: EditPasswordPage,
};

export function renderDOM(route: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!;

  root.innerHTML = '';
  const PageComponent = ROUTES[route];
  const page = new PageComponent({});

  root.appendChild(page.element);
  page.dispatchComponentDidMount();
}
