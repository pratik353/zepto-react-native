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
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchProduct from '../screens/SearchProduct/SearchProduct';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const HeaderRight = () => {
  const navigation = useNavigation();

  return (
    <Ionicons
      name="search"
      size={24}
      color="black"
      style={{marginRight: 15}}
      onPress={() => {
        navigation.navigate('SearchProduct')
        console.log('Search icon pressed');
      }}
    />
  );
};

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
      {stackScreen('Details', Details, true, "", HeaderRight)}
      {stackScreen('Login', Login)}
      {stackScreen('Settings', Settings, true, "Settings")}
      {stackScreen('Wishlist', Wishlist)}
      {stackScreen('Cart', Cart, true, "Cart")}
      {stackScreen('SearchProduct', SearchProduct)}
    </Stack.Navigator>
  );
};

const stackScreen = (name, component, headerShown = false, headerTitle="", headerRight) => {
  return (
    <Stack.Screen
      options={{
        headerShown,
        headerTitle:headerTitle,
        headerRight: headerRight,
        animation:'slide_from_left'
      }}
      name={name}
      component={component}
      
    />
  );
};

export default AppRouter;
