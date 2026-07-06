import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/AuthScreens/SignInScreen';
import SignUp from '../screens/AuthScreens/SignUp';
export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUp: undefined;
};
const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,


    }}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}