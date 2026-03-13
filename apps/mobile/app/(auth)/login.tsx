import { Text } from 'react-native';
import { withUniwind } from 'uniwind';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GoogleSigninButton,
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import { useAuthStore } from '../../stores/auth.store';

const StyledSafeAreaView = withUniwind(SafeAreaView);

export default function LoginScreen() {
  const {user, setAuth} = useAuthStore()
  console.log('hej login screen');

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      
      if(isSuccessResponse(response)) {
        console.log('response success', response.data.idToken)
        const idToken = response.data.idToken;
        console.log('id token', idToken)

        const responseBackend = await fetch('http://10.0.2.2:3000/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });
  
        const data = await responseBackend.json();
        setAuth(data.user, data.accessToken, data.refreshToken)
        console.log('Auth response:', data);
      }

      

      // wyślij idToken do backendu
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  console.log('user', user)
  console.log('user name', user?.displayName)

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
