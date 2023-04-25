import createEditPasswordPage from './src/pages/EditPassword/EditPasswordPage';
import router from './src/utils/router/router';
import createEditProfilePage from './src/pages/EditProfile/EditProfilePage';
import createErrorPage from './src/pages/Error/ErrorPage';
import createLoginPage from './src/pages/Login/LoginPage';
import createProfilePage from './src/pages/Profile/ProfilePage';
import createRegistrationPage from './src/pages/Registration/RegistrationPage';
import createChatsPage from './src/pages/Chats/ChatsPage';
import store from './src/utils/store';

router
  .use('/edit-password', createEditPasswordPage)
  .use('/settings', createEditProfilePage)
  .use('/error', createErrorPage)
  .use('/profile', createProfilePage)
  .use('/sing-up', createRegistrationPage)
  .use('/messenger', createChatsPage)
  .use('/', createLoginPage)
  .start();

store.setState('currentChat', null);
