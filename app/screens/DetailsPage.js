import React, {Component} from "react";
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import StarRating from 'react-native-star-rating';
import {connect} from "react-redux";

const width = Dimensions.get('window').width;

class DetailsPage extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('showName'),
        };
    };

    constructor(props) {
        super(props);
    };

    static cleanSummary(summary) {
        return summary.replace(/<[^>]*>/g, '');
    }

    static formatGenre(array) {
        let string = '';
        for (let i = 0; i < array.length; i++) {
            i === 0 ? string += array[i] : string += `, ${array[i]}`;
        }
        return string;
    }

    static formatSchedule(schedule) {
        let string = '';
        for (let i = 0; i < schedule.days.length; i++) {
            i === 0 ? string += `${schedule.days[i]}s` : string += `, ${schedule.days[i]}s`;
        }
        schedule.time.length > 0 ? string += ` at ${schedule.time}` : string += null;
        return string;
    }

    render() {
        let currentShow = this.props.currentShow;
        return (
            <View style={styles.container}>
                <ScrollView styles={styles.scrollView}>
                    <View>
                        {currentShow.show.image ?
                            <AutoHeightImage
                                width={width}
                                source={{uri: currentShow.show.image.original}}
                            /> : null}
                        <View style={styles.lineStyle2}/>
                        <StarRating
                            disabled={true}
                            maxStars={10}
                            rating={currentShow.show.rating.average ? currentShow.show.rating.average : 0}
                            starSize={20}
                            containerStyle={styles.stars}
                        />
                        <Text style={styles.text}>Avg Rating: {currentShow.show.rating.average ?
                            currentShow.show.rating.average : 'N/A'}</Text>
                    </View>
                    <View style={styles.lineStyle2}/>
                    <View>
                        <Text style={styles.text}>Summary: {currentShow.show.summary ?
                            DetailsPage.cleanSummary(currentShow.show.summary) : 'N/A'}</Text>
                        <Text style={styles.text}>Genres: {currentShow.show.genres.length > 0 ?
                            DetailsPage.formatGenre(currentShow.show.genres) : 'N/A'}</Text>
                        <Text style={styles.text}>Schedule: {currentShow.show.schedule.days.length > 0 ?
                            DetailsPage.formatSchedule(currentShow.show.schedule) : 'N/A'}</Text>
                        <Text style={styles.text}>Network: {currentShow.show.network ?
                            currentShow.show.network.name : currentShow.show.webChannel ?
                                currentShow.show.webChannel.name : 'N/A'}</Text>
                        <Text style={styles.text}>Language: {currentShow.show.language ?
                            currentShow.show.language : 'N/A'}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    };
}

const mapStateToProps = state => ({
    currentShow: state.currentShow,
});

export default connect(mapStateToProps, null)(DetailsPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        paddingTop: 10,
        marginBottom: 20,
    },
    lineStyle2: {
        margin: 20,
        borderBottomWidth: .5,
        borderBottomColor: 'black',
    },
    stars: {
        marginLeft: 35,
        marginRight: 35
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
});