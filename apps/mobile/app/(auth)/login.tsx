import { withUniwind } from 'uniwind';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import { useGoogleLogin } from '../../src/features/auth/queries/useLogin';
import { ActivityIndicator, Text, View, ImageBackground } from 'react-native';
import GoogleButton from '../../src/components/googleButton';
import Curve from '../../assets/images/curve.svg';
import Leaf from '../../assets/images/leaf.svg';

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
    <StyledSafeAreaView edges={['bottom', 'top']} className="flex-1 ">
      <View className="flex-1">
        <ImageBackground
          source={require('../../assets/images/hero3.png')}
          resizeMode="cover"
          className="flex-1 justify-center"
        >
          <View className="z-10 text-center mb-20">
            <Text className="text-text-inverted text-3xl font-serif text-center">
              DZIKI ZIELNIK
            </Text>
            <Text className="text-text-inverted text-base font-serif text-center">
              Twój osobisty ogród wspomnień
            </Text>
          </View>
          <View className="absolute z-10 w-full -bottom-px">
            <Curve width={'100%'} />
          </View>
        </ImageBackground>
        <View className="flex-1 bg-background-login px-5 relative">
          <View className="pt-10 justify-between flex-1 w-full">
            <View className="absolute -right-12 top-10">
              <Leaf width={130} height={130} />
            </View>
            <View className="absolute -left-14 bottom-10">
              <Leaf width={100} height={100} />
            </View>
            <View>
              <Text className="text-2xl text-center text-text-primary font-serif">
                Twój ogród czeka
              </Text>
              <Text className="text-center text-text-muted text-base font-sans">
                zaloguj się by do niego wejść
              </Text>
              <View className="mt-5">
                <GoogleButton handleOnPress={handleGoogleLogin} />
              </View>
            </View>
            <View>
              <Text className="text-center text-text-muted text-sm font-sans">
                Rejestrując się, akceptujesz{' '}
                <Text className="text-text-link underline">Regulamin</Text> oraz{' '}
                <Text className="text-text-link underline">
                  Politykę prywatności
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </StyledSafeAreaView>
  );
}
