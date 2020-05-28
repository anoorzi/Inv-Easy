import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, TextInput } from 'react-native';

import alpacaApi from '../services/alpaca'
import polygonApi from '../services/polygon'

import TransactionCard from './TransactionCard'

export default class Profile extends React.Component {

    state = {
        activity : [],
        key:''
    }

    componentDidMount(){
        const api = alpacaApi()
        api.getActivity()
        .then((responce) => {

            if(responce.ok){
                 this.setState({
                    activity: responce.data
                 })
            }
      
        })
    }
    handleChange = (e) =>{
        this.setState({
            key:e.nativeEvent.text
        })
    }

    render(){
        return(
            <View style={{padding:10}}>
                <Text style={{ fontFamily:"Optima", color:'white',textAlign:'center', fontSize:30, fontWeight:'bold', borderBottomWidth:1, borderColor:'red', textShadowRadius:1, textShadowColor:'#000',textShadowOffset: { width: 2, height: 2 }}}>
                    Transaction List
                </Text>
                
                <TextInput 
                     style={{backgroundColor:'white', marginLeft:85, marginRight:85, borderRadius:7 }}
                     value={this.state.key}
                     onChange={this.handleChange}
                 
                 />
                <ScrollView>
                     {
                        this.state.activity.filter(s => s.symbol.includes(this.state.key.toUpperCase())).map((act,index) => (
                            <TransactionCard key={index}transaction={act}/>
                        ))
                     }

                </ScrollView>

            </View>
        )
    }

}