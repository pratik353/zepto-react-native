import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import Splash from '../screens/Splash/Splash';
import Details from '../screens/Details/Details';
import Login from '../screens/login/Login';
import Cart from '../screens/Cart/Cart';
import Wishlist from '../screens/Wishlist/Wishlist';
import TabsNavigator from '../components/tabs-navigator/TabsNavigator';
import Settings from '../screens/Settings/Settings';

const Stack = createNativeStackNavigator();

const AppRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={TabsNavigator} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Cart" component={Cart} /> */}
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
    </Stack.Navigator>
  );
};

export default AppRouter;
