import React, { Component } from "react";
import { Container } from 'native-base'
import { View, Text, StyleSheet, ViewStyle, TextStyle, Button, Alert } from "react-native";

import { Survey } from './app/Survey';

export default class App extends Component<{}, {}> {
    onButtonPress(): any {
        Alert.alert("Türkiye'nin veri bankasıyız, aslında...");
    }
    render() {
        return (
            <Container>
                <Survey />
            </Container>
        )
    }
}
