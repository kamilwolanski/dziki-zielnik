import { withUniwind } from 'uniwind';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  GoogleSigninButton,
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import { useGoogleLogin } from '../../src/features/auth/queries/useLogin';
import { ActivityIndicator } from 'react-native';

const StyledSafeAreaView = withUniwind(SafeAreaView);

export default function LoginScreen() {
  const { mutateAsync, isPending } = useGoogleLogin();

  const handleGoogleLogin = async () => {
    const response = await GoogleSignin.signIn();

    if (!isSuccessResponse(response)) return;

    const idToken = response.data.idToken;
    if (!idToken) throw Error('No idToken');

    await mutateAsync(idToken);
  };

  if (isPending) return <ActivityIndicator size={'large'} />;

  return (
    <StyledSafeAreaView edges={['bottom', 'top']} className="flex-1">
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleLogin}
      />
    </StyledSafeAreaView>
  );
}
