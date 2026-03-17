import { Text } from 'react-native';
import { withUniwind } from 'uniwind';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GoogleSigninButton,
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import { useAuthStore } from '../../src/stores/auth.store';
import { authApi } from '../../src/api/auth.api';

const StyledSafeAreaView = withUniwind(SafeAreaView);

export default function LoginScreen() {
  const { user, setAuth } = useAuthStore();
  console.log('hej login screen');

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const idToken = response.data.idToken;

        if (!idToken)
          throw Error(
            'no idToken from google. Check google sign in configuration',
          );

        const res = await authApi.googleLogin({ idToken });

        setAuth(res.user, res.accessToken, res.refreshToken);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <StyledSafeAreaView edges={['bottom', 'top']} className="flex-1">
      <Text style={{ color: 'red' }}>who is logged?: {user?.displayName}</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleLogin}
      />
    </StyledSafeAreaView>
  );
}
