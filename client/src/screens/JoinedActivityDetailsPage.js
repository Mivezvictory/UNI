const dateFormat = require('dateformat');
const sportsIcon = require("../assets/images/sportIcon.png");
const studyIcon = require("../assets/images/study.jpeg");
const danceIcon = require("../assets/images/danceIcon.png");
const artIcon = require("../assets/images/art.png")
const musicIcon = require("../assets/images/music.png")
const politicsIcon = require("../assets/images/politics.png")

import React from 'react';
import {AsyncStorage} from 'react-native';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView
} from 'react-native';
import styles from '../assets/Styles.js';
import * as App from '../App';

export default class ActivityDetailsScreen extends React.Component {

    componentWillUnmount() {
        const { navigation } = this.props
        navigation.state.params.onBack();
    }
      
    render() {
        const { navigation } = this.props;
        let icon = setCategoryIcon(navigation.getParam("category"))


        const activityDetails = {
            activityTitle : navigation.getParam("title"),
            activityDescription : navigation.getParam("description")

        }


        function setCategoryIcon(category) {
            console.log(category)
            if (category === "SPORTS") {
                return sportsIcon;
            } else if(category === "STUDY") {
                return studyIcon;
            } else if(category === "DANCE") {
                return danceIcon;
            } else if(category === "POLITICS") {
                return politicsIcon;
            } else if(category === "ART") {
                return artIcon;
            } else if(category === "MUSIC") {
                return musicIcon;
            }
        }

        function leaveActivity(pageNavigation) {
            AsyncStorage.getItem("AuthToken").then(token =>{
                if(token) {
                    const activityID = navigation.getParam("activity_id");
                    fetch(App.URL + '/activities/activity/unattend/' + activityID, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization' : token
                        }
                    }).then(res => {
                        console.log(res)
                        pageNavigation.goBack()
                    })
                }
            })
        }


        return (
            <View style={styles.currActContainer}>
                <Text style={styles.title}>Activity Details</Text>
                <Text>{navigation.getParam("title")}</Text>
                
                <Image style={styles.logo} source={icon}></Image>
                <Text>Event Type: {navigation.getParam("category")}</Text>
                <Text>Time of Event: {dateFormat(navigation.getParam("activity_datetime"), "dddd, mmmm dS, h:MM TT")}</Text>
                <Text>{navigation.getParam("description")}</Text>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText} onPress={() => leaveActivity(this.props.navigation)}>Leave Activity</Text>
                </TouchableOpacity>
            </View>
        )
    }
}