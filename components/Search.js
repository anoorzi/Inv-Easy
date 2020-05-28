import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, TextInput, CheckBox,Button } from 'react-native';

import config from '../config'

import alpacaApi from '../services/alpaca'
import polygonApi from '../services/polygon'

import { Value, onChange } from 'react-native-reanimated';


export default class Search extends React.Component {

    state = {
        myPositions : [],
        value:'',
        quant:1,
        quote:null
    }

    componentDidMount(){
        const api = alpacaApi()
        api.getPositions()
        .then(responce => {
            this.setState({
                myPositions: responce.data
            })
        })
    }

    handleChange = (e) => {

        this.setState({
            value:e.nativeEvent.text
        })
    }

    handleQuantChange = (e) =>{
        this.setState({
            quant:e.nativeEvent.text
        })
    }

    getQuote = () => {
        let polygon = polygonApi()
       
        polygon.getQuote(this.state.value.toUpperCase())
        .then((responce) => {
            if (responce.ok){
     
                this.setState({
                    quote:responce.data.ticker
                })
     
            }
    
        })


    }

    sellOrder = () => {

        let order = {
            "symbol": this.state.value.toUpperCase(),
            "qty": this.state.quant,
            "side":'sell',
            "type":'market',
            "time_in_force": 'gtc'
        }
        let reqObj = {
            method: "POST",
            baseURL: config.ALPACA_URL,
            headers: {

                'APCA-API-KEY-ID': config.ALPACA_API_KEY_ID,
                'APCA-API-SECRET-KEY': config.ALPACA_API_SECRET_ID
            },
            body: JSON.stringify(order),
            timeout: 5000

        }
        
        
        fetch('https://paper-api.alpaca.markets/v2/orders', reqObj)
        .then(responce => {
                this.setState({
                    value:'',
                    quote:null,
                    quant:''
                })
            

        })

    }

    postOrder = () => {
            let order = {
                "symbol": this.state.value.toUpperCase(),
                "qty": this.state.quant,
                "side":'buy',
                "type":'market',
                "time_in_force": 'gtc'
            }
            let reqObj = {
                method: "POST",
                baseURL: config.ALPACA_URL,
                headers: {
 
                    'APCA-API-KEY-ID': config.ALPACA_API_KEY_ID,
                    'APCA-API-SECRET-KEY': config.ALPACA_API_SECRET_ID
                },
                body: JSON.stringify(order),
                timeout: 5000

            }
            
            
            fetch('https://paper-api.alpaca.markets/v2/orders', reqObj)
            .then(responce => {
                    this.setState({
                        value:'',
                        quote:null,
                        quant:''
                    })
                

            })
        
        
    }



    render(){
        return(
            <View style={{flex:1}}>

                <Text style={{textAlign:'center', paddingBottom:10, fontSize:30,fontWeight:'bold', fontFamily:"Optima",color:'white', textShadowRadius:1, textShadowColor:'#000',textShadowOffset: { width: 2, height: 2 }}}>Buy / Sell</Text>



                 <View style={{flex:1, backgroundColor:'grey', margin:10, borderRadius:7}}>


                     <Text style={{ textAlign:'center', padding:5, fontSize:18,fontWeight:'bold', fontFamily:"Optima"}}>Enter Desired Stock Symbol</Text>

                     <TextInput 
                     style={{backgroundColor:'white', marginLeft:85, marginRight:85, borderRadius:7 }}
                     value={this.state.value}
                     onChange={this.handleChange}
                 
                     />
                    <Button
                    title="Get Stock Quote"
                    onPress={this.getQuote}

                    />
                    {this.state.quote? <Text style={{textAlign:'center'}}>{this.state.value.toUpperCase()} @ {this.state.quote.lastTrade.p}</Text> : null}
                     <Text style={{textAlign:'center', padding:5, fontSize:18,fontWeight:'bold', fontFamily:"Optima"}}>Quantity</Text>

                     <TextInput 
                     style={{backgroundColor:'white', marginLeft:75, marginRight:75, borderRadius:7 }}
                     value={this.state.quant}
                     onChange={this.handleQuantChange}
                 
                     />

                     <View style={{borderBottomWidth:2, marginLeft:75,marginRight:75}}>


                     <Button
                     title="Create Purchase Order"
                     onPress={this.postOrder}


                     />
                     </View>


                    <Button
                     title="Create Sell Order"
                     onPress={this.sellOrder}
                     />
                    
                 </View>
              

                <View style={{flex:1}}>
                    

                     <Text style={{ fontFamily:"Optima", color:'white',textAlign:'center', fontSize:30, fontWeight:'bold', borderBottomWidth:1, borderColor:'red', textShadowRadius:1, textShadowColor:'#000',textShadowOffset: { width: 2, height: 2 }}}>
                    Positions List
                     </Text>
                     <ScrollView>

                     <View>
                         {
                         this.state.myPositions.map((position,index) => (
                         <View key={index}style={{borderWidth:1, borderColor:'green', margin:4, flexDirection:'row', backgroundColor:'white', borderRadius:7}}>

                             <Text style={{color:'black', flex:4, fontSize:25, fontWeight:'bold', fontFamily:"Futura"}}>{position.symbol}</Text>
                             <Text style={{color:'blue',flex:1}}>{position.qty} @ {(position.avg_entry_price * 1).toFixed(2)}</Text>
                         </View>
                         ))
                         }


                     </View>
                     </ScrollView>


                 </View>


       
  

            </View>
        )
    }

}
