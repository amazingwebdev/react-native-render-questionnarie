import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Icon, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';

import { BaseComponent, BaseProps, BaseState } from '../BaseComponent'

const cards = [
    {
        text: 'Card One',
        name: 'One',
        image: require('../../../img/foo.jpeg'),
    },
    {
        text: 'Card Two',
        name: 'Two',
        image: require('../../../img/doris.jpeg'),
    }
];

interface SwiperProps extends BaseProps {

}

interface SwiperState extends BaseState {
    
}

export class DeckSwiperInput extends BaseComponent<SwiperProps, SwiperState> {
  render() {
        return (
            <Container>
                <View>
                    <DeckSwiper
                        dataSource={cards}
                        onSwipeRight={() => console.log("right")}
                        renderItem={item =>
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={item.image} />
                                        <Body>
                                            <Text>{item.text}</Text>
                                            <Text note>NativeBase</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{width:'100%'}} source={item.image} />
                                </CardItem>
                                <CardItem>
                                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                    <Text>{item.name}</Text>
                                </CardItem>
                            </Card>
                        }
                    />
                </View>
            </Container>
        );
    }

    public getValue() {

    }
}