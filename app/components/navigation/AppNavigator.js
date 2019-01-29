import React from "react";
import {createStackNavigator} from "react-navigation";
import HomePage from "../../screens/HomePage";
import DetailsPage from "../../screens/DetailsPage";

const AppNavigator = createStackNavigator(
    {
        Home: HomePage,
        Details: DetailsPage,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
            },
        },
    },
);

export default AppNavigator;