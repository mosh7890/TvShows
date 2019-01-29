import React, {Component} from 'react';
import {Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {toggleActivity, toggleSearch, addShow} from "../../redux/actions";
import {connect} from "react-redux";

const axios = require('axios');

const width = Dimensions.get('window').width;

class SearchModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInputText: '',
        };
        this.search = this.search.bind(this);
    }

    async search() {
        try {
            this.props.toggleActivity(true);
            this.props.toggleSearch(false);
            const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${this.state.searchInputText}`);
            this.props.addShow(res.data);
            this.props.toggleActivity(false);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.searchModalIsOpen}
                    onRequestClose={() => this.props.toggleSearch(false)}
                >
                    <View style={styles.container}>
                        <View style={styles.container2}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({searchInputText: text})}
                                value={this.state.searchInputText}
                                autoFocus={true}
                            />
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.search()}
                                >
                                    <Text style={styles.text}>Search</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.props.toggleSearch(false)}
                                >
                                    <Text style={styles.text}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    searchModalIsOpen: state.searchModalIsOpen,
});

const mapDispatchToProps = dispatch => ({
    toggleActivity: (trueOrFalse) => dispatch(toggleActivity(trueOrFalse)),
    toggleSearch: (trueOrFalse) => dispatch(toggleSearch(trueOrFalse)),
    addShow: (show) => dispatch(addShow(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width - 20,
    },
    textInput: {
        height: 40,
        width: width - 60,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
    },
    button: {
        padding: 10,
        width: (width - 60) / 2,
        borderColor: 'white',
        borderWidth: .5,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
});