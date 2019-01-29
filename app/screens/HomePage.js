import React, {Component} from "react";
import {ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AutoHeightImage from 'react-native-auto-height-image';
import StarRating from 'react-native-star-rating';
import {toggleSearch, setCurrentShow} from "../redux/actions";
import {connect} from "react-redux";

const width = Dimensions.get('window').width;

class HomePage extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Tv Shows',
            headerRight: (
                <TouchableOpacity
                    style={{
                        paddingRight: 10,
                        alignItems: 'center',
                        backgroundColor: 'black',
                    }}
                    onPress={navigation.getParam('toggleSearch')}
                >
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                    }}>Search <Icon
                        name='search'
                        color='white'
                        size={18}
                    /></Text>
                </TouchableOpacity>
            )
        };
    };

    constructor(props) {
        super(props);
        this.toggleSearch = this.toggleSearch.bind(this);
    };

    componentDidMount() {
        this.props.navigation.setParams({toggleSearch: this.toggleSearch});
    };

    toggleSearch() {
        this.props.toggleSearch(true);
    };

    render() {
        if (this.props.waitingForResults) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        }
        let shows = this.props.shows;
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatlist}
                    data={shows}
                    renderItem={({item}) =>
                        <View>
                            <View style={styles.card}>
                                <TouchableOpacity onPress={() => {
                                    this.props.setCurrentShow(item);
                                    navigate('Details', {showName: item.show.name ? item.show.name : 'N/A'});
                                }}>
                                    {item.show.image ?
                                        <AutoHeightImage
                                            width={width - 20}
                                            source={{uri: item.show.image.original}}
                                        /> : null}
                                    <View style={styles.lineStyle2}/>
                                    <Text style={styles.text}>Title: {item.show.name ? item.show.name : 'N/A'}</Text>
                                    <View style={styles.lineStyle2}/>
                                    <StarRating
                                        disabled={true}
                                        maxStars={10}
                                        rating={item.show.rating.average ? item.show.rating.average : 0}
                                        starSize={20}
                                        containerStyle={styles.stars}
                                    />
                                    <Text style={styles.text}>Avg Rating: {item.show.rating.average ?
                                        item.show.rating.average : 'N/A'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lineStyle}/>
                        </View>
                    }
                    keyExtractor={(item, index) => item.show.id.toString()}
                />
            </View>
        );
    };
}

const mapStateToProps = state => ({
    waitingForResults: state.waitingForResults,
    shows: state.shows,
});

const mapDispatchToProps = dispatch => ({
    toggleSearch: (trueOrFalse) => dispatch(toggleSearch(trueOrFalse)),
    setCurrentShow: (show) => dispatch(setCurrentShow(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatlist: {
        paddingTop: 10,
        marginBottom: 20,
    },
    card: {
        borderWidth: 1.5,
        borderColor: 'black',
    },
    stars: {
        marginLeft: 35,
        marginRight: 35
    },
    lineStyle2: {
        margin: 20,
        borderBottomWidth: .5,
        borderBottomColor: 'black',
    },
    lineStyle: {
        margin: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
});