import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, TextInput, CheckBox,Button , Image, Linking} from 'react-native';

import config from '../config'

import alpacaApi from '../services/alpaca'
import polygonApi from '../services/polygon'

import { Value, onChange } from 'react-native-reanimated';


export default class News extends React.Component {

    state = {
        newsList: []
    }

    componentDidMount(){

        let api = polygonApi()
        api.getNews('SPY')
        .then(resp => {
            if(resp.ok){
                let temp = this.state.newsList
                this.setState({
                    newsList: resp.data
                })
            }
        })

    }
    
    render(){
        return (
            <ScrollView>

            <View style={{flex:1}} >

                <Text style={{textAlign:'center', paddingBottom:10, fontSize:40,fontWeight:'bold', fontFamily:"Optima",color:'white', textShadowRadius:1, textShadowColor:'#000',textShadowOffset: { width: 2, height: 2 }}}>News</Text>


                {
                    this.state.newsList.map((news,index) => (
                        <View  key={index} style={{backgroundColor:'white', margin:5, flex:1, flexDirection:'row'}}>
                            <View >
                               <Image 
                                source={{ uri: news.image }}
                                style={{flex:1, width:140,height:120}}
                                />
                            </View>
                            <View style={{flex:1, flexDirection:'column'}}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                     <Text style={{textAlign:'center', fontWeight:'bold' }} >
                                          {news.title.substring(0,40)+'...'}
                                     </Text>
                                </View>

                                <View style={{flex:1, justifyContent:'center'}}>
                                     <Text style={{textAlign:'center', fontWeight:'bold' }} >
                                          {news.timestamp}
                                     </Text>
                                </View>

                                <View style={{flex:1}}>

                                     <Text 
                                     style={{textAlign:'center', borderWidth:1 ,fontWeight:'bold', backgroundColor:'lightblue'}} 
                                     onPress={() => Linking.openURL(news.url)}
                                     >
                                      Click Here For Full Story
                                     </Text>

                                </View>

      
                            </View>
    

                        </View>

                    ))
                }


            </View>
            </ScrollView>


        )
    }
}
