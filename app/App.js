import React, {Component} from 'react';
import {createAppContainer} from "react-navigation";
import {Provider} from 'react-redux';
import store from "./redux/store";
import AppNavigator from "./components/navigation/AppNavigator";
import SearchModal from "./components/modals/SearchModal";
import MainFooter from "./components/static/MainFooter";

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer/>
                <SearchModal/>
                <MainFooter/>
            </Provider>
        );
    }
}