import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class MainFooter extends Component {
    render() {
        return (
            <View style={styles.footer}>
                <Text style={styles.footerText}>Moshe Solomon</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        flex: 0.1,
        justifyContent: 'center',
        height: 25,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
    },
    footerText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
    },
});