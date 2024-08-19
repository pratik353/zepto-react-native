import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import Splash from '../screens/Splash/Splash';
import Details from '../screens/Details/Details';
import Login from '../screens/login/Login';
import Cart from '../screens/Cart/Cart';
import Wishlist from '../screens/Wishlist/Wishlist';
import TabsNavigator from '../components/tabs-navigator/TabsNavigator';
import Settings from '../screens/Settings/Settings';
import Categories from '../screens/Categories/Categories';

const Stack = createNativeStackNavigator();

const AppRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={
        {
          // headerShown: false,
        }
      }>
      {stackScreen('Splash', Splash)}
      {stackScreen('Home', TabsNavigator)}
      {stackScreen('Details', Details)}
      {stackScreen('Login', Login)}
      {stackScreen('Settings', Settings, true)}
      {stackScreen('Wishlist', Wishlist)}
    </Stack.Navigator>
  );
};

const stackScreen = (name, component, headerShown = false) => {
  return (
    <Stack.Screen
      options={{
        headerShown,
      }}
      name={name}
      component={component}
    />
  );
};

export default AppRouter;
