import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { useContext } from 'react';
import UserContext from '../context/user';
import { LocationContext } from '../context/Location'
import { AccountScreens, AddScreens, ChatScreens, HomeScreens, SellScreens, CurrentLocation, SelectedLocation } from '../screens';
// import CurrentLocation from '../screens/CurrentLocation'
import { colors, scale } from '../utilities';
import { StackOptions, tabIcon, tabOptions, TopBarOptions } from './screenOptions';


const Tabs = createBottomTabNavigator()
const MainStack = createStackNavigator()
const HomeStack = createStackNavigator()
const ProductStack = createStackNavigator()
const AccountStack = createStackNavigator()
const EditAccountStack = createStackNavigator()
const ChatStack = createStackNavigator()
const AddStack = createStackNavigator()
const SellStack = createStackNavigator()
const FilterStack = createStackNavigator()
const AccountTOP = createMaterialTopTabNavigator()
const ChatTOP = createMaterialTopTabNavigator()
const AdsTOP = createMaterialTopTabNavigator()
const Location = createStackNavigator()

function NetworkTabs() {
    return (
        <AccountTOP.Navigator initialRouteName='Following' tabBarOptions={TopBarOptions()}>
            <AccountTOP.Screen name='Following' component={AccountScreens.Following} />
            <AccountTOP.Screen name='Followers' component={AccountScreens.Followers} />
        </AccountTOP.Navigator>
    )
}

function AdsTabs() {
    return (
        <AdsTOP.Navigator initialRouteName='Ads' tabBarOptions={TopBarOptions()}>
            <AdsTOP.Screen name='Ads' component={AddScreens.Ads} />
            <AdsTOP.Screen name='Favourite' component={AddScreens.Favourite} />
        </AdsTOP.Navigator>
    )
}

function InboxTabs() {
    return (
        <ChatTOP.Navigator initialRouteName='All'
            tabBarOptions={TopBarOptions()}
        >
            <ChatTOP.Screen name='All' component={ChatScreens.All} />
            <ChatTOP.Screen name='Buying' component={ChatScreens.Buying} />
            <ChatTOP.Screen name='Selling' component={ChatScreens.Selling} />
        </ChatTOP.Navigator>
    )
}

function FilterScreen() {
    return (
        <FilterStack.Navigator initialRouteName='FilterModal' headerMode='screen' screenOptions={StackOptions()}>
            <FilterStack.Screen name='FilterModal' component={HomeScreens.FilterModal} />
            <FilterStack.Screen name='Categories' component={HomeScreens.Categories} />
            <FilterStack.Screen name='SubCategories' component={HomeScreens.SubCategories} />
        </FilterStack.Navigator>
    )
}

function HomeTabs() {
    return (
        <HomeStack.Navigator initialRouteName='Main' headerMode='screen' screenOptions={StackOptions()}>
            <HomeStack.Screen name='Main' component={HomeScreens.MainHome} />
            <HomeStack.Screen name='AdPosting' component={SellScreens.AdPosting} />
            <HomeStack.Screen name='Categories' component={HomeScreens.Categories} />
            <HomeStack.Screen name='SubCategories' component={HomeScreens.SubCategories} />
            <HomeStack.Screen name='ProductListing' component={HomeScreens.ProductListing} options={{ title: 'Product Listing' }}/>
            <HomeStack.Screen name='Notifications' component={HomeScreens.Notifications} />
            <HomeStack.Screen name='UserProfile' component={HomeScreens.UserProfile} />
            <HomeStack.Screen name='ProductDescription' component={ProdcutMap} options={{headerShown:false}} />

        </HomeStack.Navigator>
    )
}
function ChatTabs() {
    return (
        <ChatStack.Navigator initialRouteName='MainChat' headerMode='screen' screenOptions={StackOptions()}>
            <ChatStack.Screen name='MainChat' component={InboxTabs} options={{
                title: 'Inbox',
                headerStyle: {
                    backgroundColor: colors.headerbackground,
                },
                headerTitleContainerStyle: {
                    marginLeft: scale(0),
                },
            }} />
            {/* <ChatStack.Screen name='LiveChat' component={ChatScreens.LiveChat} /> */}
        </ChatStack.Navigator>
    )
}

function SellTabs() {
    return (
        <SellStack.Navigator initialRouteName='Sell' screenOptions={StackOptions()}>
            <SellStack.Screen name='Sell' component={SellScreens.MainSell} />
            <SellStack.Screen name='Categories' component={SellScreens.Categories} options={{ title: 'Choose a category' }} />
            <SellStack.Screen name='SubCategories' component={SellScreens.SubCategories} />
            <SellStack.Screen name='SellingForm' component={SellScreens.SellingFrom} options={{ title: 'Include some details' }} />
            <SellStack.Screen name='UploadImage' component={SellScreens.UploadImage} />
            <SellStack.Screen name='Price' component={SellScreens.Price} />
            <SellStack.Screen name='LocationConfirm' component={SellScreens.LocationConfirm} />
            <SellStack.Screen name='FullMap' component={HomeScreens.FullMap} />
            <SellStack.Screen name='ProductDescription' component={ProdcutMap} options={{headerShown:false}}  />
        </SellStack.Navigator>
    )
}
function AddTabs() {
    return (
        <AddStack.Navigator initialRouteName='MainAds' screenOptions={StackOptions()}>
            <AddStack.Screen name='MainAds' component={AdsTabs} options={{
                title: 'MY ADS',
                headerStyle: {
                    backgroundColor: colors.headerbackground,
                },
            }} />
            <AddStack.Screen name='ProductDescription' component={ProdcutMap} options={{headerShown:false}} />
            <AddStack.Screen name='SellingForm' component={SellTabs} options={{headerShown:false, tabBarVisible: false }} />

        </AddStack.Navigator>
    )
}
function EditAccount() {
    return (
        <EditAccountStack.Navigator initialRouteName='EditProfile' headerMode='screen' screenOptions={StackOptions()}>
            <EditAccountStack.Screen name='EditProfile' component={AccountScreens.EditProfile} />
            <EditAccountStack.Screen name='EditPhone' component={AccountScreens.EditPhone} />
        </EditAccountStack.Navigator>

    )
}
function AccountTabs() {
    return (
        <AccountStack.Navigator initialRouteName='MainAccount' headerMode='screen' screenOptions={StackOptions()}>
            <AccountStack.Screen name='MainAccount' component={AccountScreens.MainAccount} options={{ title: 'My Account' }} />
            <AccountStack.Screen name='Help' component={AccountScreens.Help} options={{ title: 'Help and Support' }} />
            <AccountStack.Screen name='Settings' component={AccountScreens.Settings} />
            <AccountStack.Screen name='Profile' component={AccountScreens.Profile} />
            <AccountStack.Screen name='UserProfile' component={HomeScreens.UserProfile} />
            <AccountStack.Screen name='Privacy' component={AccountScreens.Privacy} />
            <AccountStack.Screen name='Notifications' component={AccountScreens.Notifications} />
            <AccountStack.Screen name='HelpBrowser' component={AccountScreens.HelpBrowser} />
            <AccountStack.Screen name='Network' component={NetworkTabs} options={{
                title: 'My Network',
                headerStyle: {
                    backgroundColor: colors.headerbackground,
                },
            }} />
        </AccountStack.Navigator>
    )
}
function ProdcutMap() {
    //console.log('ProdcutMap')
    return (
        <ProductStack.Navigator initialRouteName='ProductDescription' screenOptions={StackOptions()}>
            <ProductStack.Screen name='ProductDescription' component={HomeScreens.ProductDescription} />
            <ProductStack.Screen name='FullMap' component={HomeScreens.FullMap} />
        </ProductStack.Navigator>
    )
}


function BottomTabs() {
    const { isLoggedIn } = useContext(UserContext)
    return (
        <Tabs.Navigator initialRouteName='Home' backBehavior='history' tabBarOptions={tabOptions()}
            screenOptions={({ route }) => tabIcon(route)}>
            <Tabs.Screen name='Home' component={HomeTabs} />
            <Tabs.Screen name='Chat' component={isLoggedIn ? ChatTabs : AccountScreens.Registration} options={{ tabBarVisible: isLoggedIn ? true : false }} />
            <Tabs.Screen name='Sell' component={isLoggedIn ? SellTabs : AccountScreens.Registration} options={{
                tabBarVisible: false
            }} />
            <Tabs.Screen name='Ads' component={isLoggedIn ? AddTabs : AccountScreens.Registration} options={{ tabBarVisible: isLoggedIn ? true : false }} />
            <Tabs.Screen name='Account' component={AccountTabs} />
            {/* <Tabs.Screen name='ProductDescription' component={ProdcutMap} options={{ tabBarButton: () => null, tabBarVisible: false }} /> */}
        </Tabs.Navigator >
    )
}


function LocationStack() {
    return (
        <Location.Navigator>
            <Location.Screen
                name="CurrentLocation"
                component={CurrentLocation}
                options={{ header: () => null }}
            />
            <Location.Screen name="SelectLocation" component={SelectedLocation} />
        </Location.Navigator>
    )
}


function AppContainer() {
    const { isLoggedIn } = useContext(UserContext)
    const { location } = useContext(LocationContext)

    return (
        <NavigationContainer>
            {!location ? (
                <LocationStack />
            ) : (
                    <MainStack.Navigator initialRouteName='BottomTabs' headerMode='screen' >
                        <MainStack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false }} />
                        <MainStack.Screen name='Registration' component={AccountScreens.Registration} options={{ headerShown: false }} />
                        <MainStack.Screen name='FilterModal' component={FilterScreen} options={{
                            headerShown: false,
                            ...TransitionPresets.ModalSlideFromBottomIOS
                        }} />
                        <MainStack.Screen name='LiveChat' component={isLoggedIn ? ChatScreens.LiveChat : AccountScreens.Registration} options={{
                            ...TransitionPresets.ModalSlideFromBottomIOS
                        }} />
                        <MainStack.Screen name='EditProfile' component={isLoggedIn ? EditAccount : AccountScreens.Registration} options={{
                            headerShown: false,
                            ...TransitionPresets.ModalSlideFromBottomIOS
                        }} />
                    </MainStack.Navigator>
                )}
        </NavigationContainer>
    )
}

export default AppContainer;