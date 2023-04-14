import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity } from "react-native";

import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerCon } from './DrawerNavigation/DrawerCon';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import IconN from 'react-native-vector-icons/AntDesign';
import IconNm from 'react-native-vector-icons/MaterialIcons';

import Home from './Screen/Home';
import Shop from './Screen/Shop';
import Service from './Screen/Service';
import My_Account from './Screen/My_Account';
import View_Address from './Screen/View_Address';
import My_Order from './Screen/My_Order';
import Search from './Screen/Search';
import Category from './Screen/Category';
import LoginPage from './Screen/LoginPage';
import SignUp from './Screen/SignUp';
import Select_Service from './Screen/Select_Service';
import MyCart from './Screen/MyCart';
import Globals from './utils/Globals';
import ServiceItem from './Screen/ServiceItem';
import ItemPage from './Screen/ItemPage';
import ItemView from './Screen/ItemView';
import ViewImage from './Screen/ViewImage';
import My_Product from './Screen/My_Product';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { mystore } from './new_Redux/MyStore';
import PaymentPage from './Payment/PaymentPage';
import AddAddress from './Screen/AddAddress';
import { DrawerContent } from './DrawerService/DrawerContent';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import CheckOut from './Screen/CheckOut';
import ItemsFilter from './Screen/ItemsFilter';
import ConnectionInfo from './utils/ConnectionInfo';
import ServiceCart from './Screen/ServiceCart';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditAddress from './Screen/EditAddress';
import ServiceCategory from './Screen/ServiceCategory';
import ServiceInventory from './Screen/ServiceInventory';
import ServiceCheckOut from './Screen/ServiceCheckOut';
import ServiceOrder from './Screen/ServiceOrder';
import Account from './Screen/Account';
import ServiceSearch from './Screen/ServiceSearch';
import Seller from './Screen/Seller';
import SubCategory from './Screen/SubCategory';
import SubCategoryService from './Screen/SubCategoryService';


const persistor = persistStore(mystore);


const DrawerNav = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function LogoTitle() {
  return (
    <Image
      style={{ width: 220, height: 30 }}
      source={Globals.AppIcon.headerIcn}
    />
  );
}

function OrderLogo() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '25%' }}>
      <IconNm name='add-shopping-cart' size={25} color={Globals.COLOR.defaultColor} />
      <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: '10%' }}>My Order</Text>
    </View>
  );
}






const Dashboard = ({ navigation }) => {

  async function getUser() {
    try {
      const UserCode = await AsyncStorage.getItem('UserCode');
      Globals.UrCode = UserCode;
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <DrawerNav.Navigator useLegacyImplementation screenOptions={{ drawerStyle: { width: '70%' } }} drawerContent={(props) => <DrawerCon {...props} />}>
      <DrawerNav.Screen name="Home" component={TabBar} options={{ headerTitle: (props) => <LogoTitle {...props} />, headerRight: () => (<IconNm.Button name='account-circle' size={30} color={'#000'} style={{ backgroundColor: '#fff' }} onPress={() => { Globals.UrCode > 0 ? navigation.navigate('My Account') : navigation.navigate('LoginPage') }} />) }} />
      <DrawerNav.Screen name="Shop" component={Shop} />
      <DrawerNav.Screen name="View_Address" component={View_Address} />
      <DrawerNav.Screen name="Service" component={Service} options={{ headerTitle: (props) => <LogoTitle {...props} />, headerRight: () => (<IconNm.Button name='account-circle' size={30} color={'#000'} style={{ backgroundColor: '#fff' }} onPress={() => { Globals.UrCode > 0 ? navigation.navigate('Account') : navigation.navigate('LoginPage') }} />) }} />
      <DrawerNav.Screen name="My Account" component={My_Account} />
      <DrawerNav.Screen name="View Address" component={View_Address} options={{ headerRight: () => (Globals.UrCode>0 &&<IconN.Button name='plus' size={25} color={'#000'} style={{ backgroundColor: '#fff' }} onPress={() => { navigation.navigate('AddAddress') }} />) }} />
      <DrawerNav.Screen name="My Order" component={My_Order} options={{ headerStyle: { backgroundColor: '#E5E8E8' }, headerTitle: (props) => <OrderLogo {...props} /> }} />
    </DrawerNav.Navigator>
  );
};

const Dash = ({ navigation }) => {

  async function getUser() {
    try {
      const UserCode = await AsyncStorage.getItem('UserCode');
      Globals.UrCode = UserCode;
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <DrawerNav.Navigator useLegacyImplementation screenOptions={{ drawerStyle: { width: '70%' } }} drawerContent={(props) => <DrawerContent {...props} />}>
      <DrawerNav.Screen name="Service" component={TabNav} options={{ headerTitle: (props) => <LogoTitle {...props} />, headerRight: () => (<IconNm.Button name='account-circle' size={30} color={'#000'} style={{ backgroundColor: '#fff' }} onPress={() => { Globals.UrCode > 0 ? navigation.navigate('Account') : navigation.navigate('LoginPage') }} />) }} />
      <DrawerNav.Screen name="Shop" component={Shop} />
      <DrawerNav.Screen name="Home" component={Home} options={{ headerRight: () => (<IconNm.Button name='shopping-cart' size={25} color={'#000'} style={{ backgroundColor: '#fff' }} onPress={() => { navigation.navigate('My Cart') }} />) }} />
      <DrawerNav.Screen name="Account" component={Account} />
      <DrawerNav.Screen name="View Address" component={View_Address} options={{ headerRight: () => (Globals.UrCode>0 &&<IconN.Button name='plus' size={25} color={'#000'} style={{ backgroundColor: '#fff' }} onPress={() => { Globals.UrCode > 0 ? navigation.navigate('AddAddress') : navigation.navigate('LoginPage') }} />) }} />
      <DrawerNav.Screen name="Service Order" component={ServiceOrder} options={{ headerStyle: { backgroundColor: '#E5E8E8' }, headerTitle: (props) => <OrderLogo {...props} /> }} />
    </DrawerNav.Navigator>
  );
};





function TabNav({ navigation }) {
  const [Cart, setCart] = useState([]);

  const getCartItems = () => {
    // Retrieve the cart items from Async Storage
    AsyncStorage.getItem('cartItems')
      .then((cartItems) => {
        if (cartItems) {
          // If the cart items exist, parse the JSON string back into an array of objects
          const items = JSON.parse(cartItems);
          setCart(items);
        } else {
          console.log('No items in cart');
        }
      })
      .catch((error) => {
        console.log('Error retrieving cart items:', error);
      });
  }




  useEffect(() => {
    getCartItems();
  }, [Cart]);

  return (

    <Tab.Navigator
      initialRouteName='Service'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        // tabBarStyle:{
        //   backgroundColor:'#ADD8E6'
        // }
      }}

    >
      <Tab.Screen name="Service" component={Service} options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Icon
              name="home"
              color={color}
              size={size}
            />
          )
        }
      }} />
      <Tab.Screen name="Search Service" component={ServiceSearch} options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Icon
              name="search"
              color={color}
              size={size}
            />
          )
        }
      }} />
      <Tab.Screen name="Service Category" component={ServiceCategory} options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <IconNm
              name="category"
              color={color}
              size={size}
            />
          )
        }
      }} />
      <Tab.Screen name="Service Cart" component={ServiceCart} options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <View style={{ flexDirection: 'row', left: 10 }}>
              <IconNm
                name="shopping-cart"
                color={color}
                size={size}
              />

              {Cart.length > 0 &&
                <View style={{ backgroundColor: 'red', width: 15, borderRadius: 30, height: 15, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 10 }}>{Cart.length}</Text>
                </View>
              }
            </View>
          )
        }
      }} />
    </Tab.Navigator >


  );
}


function TabBar() {
  const myProduct = useSelector(state => state.cart);

  return (

    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        // tabBarStyle:{
        //   backgroundColor:'#ADD8E6'
        // }
      }}

    >
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Icon
              name="home"
              color={color}
              size={size}
            />
          )
        }
      }} />
      <Tab.Screen name="Search" component={Search} options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Icon
              name="search"
              color={color}
              size={size}
            />
          )
        }
      }} />
      <Tab.Screen name="Category" component={Category} options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <IconNm
              name="category"
              color={color}
              size={size}
            />
          )
        }
      }} />
      <Tab.Screen name="My Cart" component={MyCart} options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <View style={{ flexDirection: 'row', left: 10 }}>
              <IconNm
                name="shopping-cart"
                color={color}
                size={size}
              />
              {myProduct.length > 0 &&
                <View style={{ backgroundColor: 'red', width: 15, borderRadius: 30, height: 15, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 10 }}>{myProduct.length}</Text>
                </View>
              }
            </View>
          )
        }
      }} />
    </Tab.Navigator>


  );
}





const App = ({ navigation }) => {

  return (
    <Provider store={mystore}>
      <PersistGate persistor={persistor}>

        <Stack.Navigator initialRouteName="Select_Service" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Dash" component={Dash} />


          <Stack.Screen name="Select_Service" component={Select_Service}
            options={{
              headerShown: false,
            }} />

          <Stack.Screen name="MyCart" component={MyCart}
            options={{
              headerShown: true,
            }} />
          <Stack.Screen name="ServiceCart" component={ServiceCart}
            options={{
              headerShown: true,
            }} />

          <Stack.Screen name="ConnectionInfo" component={ConnectionInfo}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen name="PaymentPage" component={PaymentPage}
            options={{
              headerShown: true,
            }} />

          <Stack.Screen name="ItemsFilter" component={ItemsFilter}
            options={{
              headerShown: false,
            }} />

          <Stack.Screen name="MyOrder" component={My_Order}
            options={{
              headerShown: true,
            }} />

          <Stack.Screen name="SubCategory" component={SubCategory}
            options={({ route }) => ({
              title: route.params.title, headerTintColor: '#000', headerShown: true,

              // headerRight: () => (<IconN.Button name='plus' size={25} color={'#000'} style={{ backgroundColor: '#fff' }} onPress={() => { navigation.navigate('Seller') }} />)

            })} />

          <Stack.Screen name="ServiceCheckOut" component={ServiceCheckOut}
            options={{
              headerShown: true,
            }} />

          <Stack.Screen name="ViewAddress" component={View_Address}
            options={{
              headerShown: true,
              headerRight: () => (Globals.UrCode>0 &&<IconN.Button name='plus' size={25} color={'#000'} style={{ backgroundColor: '#fff' }} onPress={() => { navigation.navigate('AddAddress') }} />)
            }} />

          <Stack.Screen name="AddAddress" component={AddAddress}
            options={{
              headerShown: true,
            }} />

          <Stack.Screen name="ServiceInventory" component={ServiceInventory}
            options={({ route }) => ({
              title: route.params.title, headerTintColor: '#000', headerShown: true,
              // headerRight: () => (
              //   <IconNm.Button name='shopping-cart' size={25} color={'#000'} style={{ backgroundColor: '#fff' }}
              //     onPress={() => { navigation.navigate('ServiceCart');  }} />)
            })} />

          <Stack.Screen name="SubCategoryService" component={SubCategoryService}
            options={({ route }) => ({
              title: route.params.title, headerTintColor: '#000', headerShown: true,
            })} />


          <Stack.Screen name="LoginPage" component={LoginPage}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen name="SignUp" component={SignUp}
            options={{
              headerShown: false,
            }} />

          <Stack.Screen name="Search" component={Search}
            options={{
              headerShown: false,
            }} />

          <Stack.Screen name="Service" component={Service}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen name="EditAddress" component={EditAddress}
            options={{
              headerShown: true,
            }} />


          <Stack.Screen name="My_Product" component={My_Product}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen name="ViewImage" component={ViewImage}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen name="CheckOut" component={CheckOut}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen name="Seller" component={Seller}
            options={{
              headerShown: true,
            }} />
          <Stack.Screen name="ServiceItem" component={ServiceItem}
            options={{
              headerShown: true, headerTitle: (props) => <LogoTitle {...props} />,
              headerRight: () => (
                <IconNm.Button name='shopping-cart' size={25} color={'#000'} style={{ backgroundColor: '#fff' }}
                  onPress={() => { navigation.navigate('My Cart') }} />)
            }} />

          <Stack.Screen name="ItemPage" component={ItemPage}
            options={({ route }) => ({
              title: route.params.title, headerTintColor: '#000', headerShown: true,

              // headerRight: () => (<IconN.Button name='plus' size={25} color={'#000'} style={{ backgroundColor: '#fff' }} onPress={() => { navigation.navigate('Seller') }} />)

            })} />

          <Stack.Screen name="ItemView" component={ItemView}
            options={({ route }) => ({ title: route.params.title, headerTintColor: '#000', headerShown: true 
            })} />

        </Stack.Navigator>
      </PersistGate>
    </Provider>

  );
}

export default App;
