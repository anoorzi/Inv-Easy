import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';

import alpacaApi from '../services/alpaca'

import {Ionicons} from '@expo/vector-icons'
import polygonApi from '../services/polygon'

export default class Dashboard extends React.Component {
  
  state = {
    buying_power:0,
    cash: 0,
    equity: 0,
    portfolio_value: 0 ,
    positions: [],
    rates:[],
    SPY: 0,
    QQQ: 0,
    DIA:0,
    GOLD:0,
    spyRate:0,
    qqqRate:0,
    diaRate:0,
    goldRate:0



  }

  componentDidMount(){

    const api = alpacaApi()
    api.getAccount()
    .then((responce) => {
        this.setState({
            buying_power: responce.data.buying_power,
            cash: responce.data.cash,
            equity: responce.data.equity,
            portfolio_value: responce.data.portfolio_value 
        })
    })


    api.getPositions()
    .then(responce => {
        this.setState({
            positions: responce.data
        })
    })

    const symbols = ['SPY','QQQ', 'DIA','GOLD']
    let polygon = polygonApi()


    symbols.forEach(symbol => {
        
        polygon.getQuote(symbol)
        .then((responce) => {
            if (responce.ok){
                let state = this.state
                
                state[symbol] = responce.data.ticker.lastTrade.p

                // console.log(responce.data.ticker.todaysChangePerc)

     
                this.setState(state)
                // this.setState({
                //     rates:[...this.state.rates, responce.data.ticker.todaysChangePerc]
                // })
     
            }

        })
    })

    polygon.getQuote('SPY')
    .then(resp => {
        this.setState({
            spyRate: resp.data.ticker.todaysChangePerc
        })
    })
    polygon.getQuote('QQQ')
    .then(resp => {
        this.setState({
            qqqRate: resp.data.ticker.todaysChangePerc
        })
    })
    polygon.getQuote('DIA')
    .then(resp => {
        this.setState({
            diaRate: resp.data.ticker.todaysChangePerc
        })
    })
    polygon.getQuote('GOLD')
    .then(resp => {
        this.setState({
            goldRate: resp.data.ticker.todaysChangePerc
        })
    })



    






  }

  renderRow = ({item}) => {
      return (
          <View  style={{flexDirection:"row", margin:7, borderWidth:1, borderRadius:7, backgroundColor : 'grey', padding:10}} key={item.asset_id}>
              <View style={{flex:4}}>
                  <Text style={{fontSize:16, fontWeight:"bold",color: 'white'}}>{item.symbol}</Text>
                  <Text style={{color:"black"}}>{item.qty} @ {(item.avg_entry_price * 1).toFixed(2)}</Text>

              </View>
              <View style={{flex:1}} >
                    {
                        item.current_price >= (item.avg_entry_price * 1).toFixed(2) ?
                        <Text style={{fontSize:16, fontWeight:"bold",color: 'green'}}>{item.current_price}</Text>
                        : <Text style={{fontSize:16, fontWeight:"bold",color: 'red'}}>{item.current_price}</Text>



                    }
                    {
                      (item.change_today * 100).toFixed(2) >= 0 ?
                      <Text style={{color:"black"}}> <Ionicons name='ios-arrow-round-up'size={22} color="green" ></Ionicons>{ (item.change_today * 100).toFixed(2)}</Text>
                      : <Text style={{color:"black"}}> <Ionicons name='ios-arrow-round-down'size={22} color="red" ></Ionicons>{(item.change_today * 100).toFixed(2)}</Text>

                    }
              </View>
          </View>
      )
  }



  render(){
    return (
        <View style={{flex:1, flexDirection: 'column'}}>

            <View style={{flex:1, borderColor : 'white',borderBottomWidth:2, alignItems: 'center' , marginLeft:50, marginRight:50, paddingTop:10}}>
                <Text style={{color: 'white', textAlign: 'center',fontSize:20, fontWeight:'bold', fontFamily:"Optima", textShadowRadius:1, textShadowColor:'#000',textShadowOffset: { width: 2, height: 2 } }}>
                    Dashboard
                </Text>
            </View>
            
             <View  style={{flex:6, borderWidth:1,borderColor : 'green',  padding:10 ,margin:20, backgroundColor:'black', borderRadius:7 }} >
                 <View style= {{  borderBottomWidth:1, borderColor:'white', marginLeft:75, marginRight:75}}>

                       <Text style= {{ color: 'white', textAlign: 'center',fontSize:20, fontWeight:'bold', fontFamily:"Optima"}}>My Account</Text>


                 </View>

                 <View style={{flex:1, flexDirection: 'row'}}>
                      <View style={{flex:1}}>
                          <Text style={{color: 'white',padding:10}}>Buying Power: {this.state.buying_power}</Text>
                          <Text  style= {{ color: 'white', padding:10}}>Cash: {this.state.cash}</Text>
                     </View>
                
                     <View style={{flex:1}}>
                         <Text style= {{ color: 'white', padding:10}}>Equity: {this.state.equity}</Text>
                         <Text style= {{ color: 'white', padding:10}}>Portfolio Value: {this.state.portfolio_value}</Text>
                     </View>  
                </View>   
       

  
            </View>
            
           
            <View  style={{flex:4, flexDirection: 'row', padding:5}}>
                {
                    this.state.spyRate >=0 ?
                    <View style={{flex:8,alignItems:'center', flexDirection:'column', borderWidth:1, borderColor : 'black', marginRight:10, borderRadius:7, backgroundColor:'green'}}>
                    <Text style ={{color: 'white', fontSize:20, fontWeight:'bold', padding:5}}>SPY</Text>
                    <Text style= {{ color: 'black', fontWeight:'bold'}}>{"$"+this.state.SPY}</Text>
                    <Text style={{color:"black", fontWeight:'bold'}}> <Ionicons name='ios-arrow-round-up'size={16} color="black" ></Ionicons></Text>
                    <Text style= {{ color: 'black', fontWeight:'bold'}}>{this.state.spyRate+"%"}</Text>

                    </View>
                    : 
                    <View style={{flex:8,alignItems:'center', flexDirection:'column', borderWidth:1, borderColor : 'black', marginRight:10, borderRadius:7, backgroundColor:'red'}}>
                    <Text style ={{color: 'white', fontSize:20, fontWeight:'bold', padding:5}}>SPY</Text>
                    <Text style= {{ color: 'black', fontWeight:'bold'}}>{"$"+this.state.SPY}</Text>
                    <Text style={{color:"black", fontWeight:'bold'}}> <Ionicons name='ios-arrow-round-down'size={16} color="black" ></Ionicons></Text>
                    <Text style= {{ color: 'black', fontWeight:'bold'}}>{this.state.spyRate+"%"}</Text>

                    
                    </View>
                }

                {
                    this.state.qqqRate >= 0 ?
                    <View style={{alignItems:'center', flex:8, borderWidth:1, borderColor : 'green',flexDirection:'column' , marginRight:10, borderRadius:7, backgroundColor:'green'}}>
                    <Text style ={{color: 'white', fontSize:20, fontWeight:'bold', padding:5}}>QQQ</Text>
                    <Text  style= {{ color: 'black', fontWeight:'bold'}}>{"$"+this.state.QQQ}</Text>
                    <Text style={{color:"black", fontWeight:'bold'}}> <Ionicons name='ios-arrow-round-up'size={16} color="black" ></Ionicons></Text>
                    <Text  style= {{ color: 'black', fontWeight:'bold'}}>{this.state.qqqRate+"%"}</Text>

                    </View>
                      :
                    <View style={{alignItems:'center', flex:8, borderWidth:1, borderColor : 'green',flexDirection:'column' , marginRight:10, borderRadius:7, backgroundColor:'red'}}>
                    <Text style ={{color: 'white', fontSize:20, fontWeight:'bold', padding:5}}>QQQ</Text>
                     <Text  style= {{ color: 'black', fontWeight:'bold'}}>{"$"+this.state.QQQ}</Text>
                     <Text style={{color:"black", fontWeight:'bold'}}> <Ionicons name='ios-arrow-round-down'size={16} color="black" ></Ionicons></Text>
                     <Text  style= {{ color: 'black', fontWeight:'bold'}}>{this.state.qqqRate+"%"}</Text>

                     </View>

                }

                {
                    this.state.diaRate >= 0 ?
                    <View style={{alignItems:'center', flex:8, borderWidth:1, borderColor : 'green', flexDirection:'column', marginRight:10, borderRadius:7, backgroundColor:'green'}}>
                    <Text style ={{color: 'white',fontSize:20, fontWeight:'bold', padding:5}}>DIA</Text>
                    <Text  style= {{ color: 'black', fontWeight:'bold'}}>{"$"+this.state.DIA}</Text>
                    <Text style={{color:"black", fontWeight:'bold'}}> <Ionicons name='ios-arrow-round-up'size={16} color="black" ></Ionicons></Text>
                    <Text  style= {{ color: 'black', fontWeight:'bold'}}>{this.state.diaRate+"%"}</Text>

                    </View>
                    :
                    <View style={{alignItems:'center', flex:8, borderWidth:1, borderColor : 'green', flexDirection:'column', marginRight:10, borderRadius:7, backgroundColor:'red'}}>
                    <Text style ={{color: 'white',fontSize:20, fontWeight:'bold', padding:5}}>DIA</Text>
                    <Text  style= {{ color: 'black', fontWeight:'bold'}}>{"$"+this.state.DIA}</Text>
                    <Text style={{color:"black", fontWeight:'bold'}}> <Ionicons name='ios-arrow-round-down'size={16} color="black" ></Ionicons></Text>
                    <Text  style= {{ color: 'black', fontWeight:'bold'}}>{this.state.diaRate+"%"}</Text>

                    </View>
 
                }

            
                {
                    this.state.goldRate >= 0 ?
                    <View style={{alignItems:'center', flex:8, borderWidth:1, borderColor : 'green', flexDirection:'column', marginRight:10, borderRadius:7, backgroundColor:'green'}}>
                    <Text style ={{color: 'white',fontSize:20, fontWeight:'bold', padding:5}}>GOLD</Text>
                    <Text  style= {{ color: 'black', fontWeight:'bold'}}>{"$"+this.state.GOLD}</Text>
                    <Text style={{color:"black", fontWeight:'bold'}}> <Ionicons name='ios-arrow-round-up'size={16} color="black" ></Ionicons></Text>
                    <Text  style= {{ color: 'black', fontWeight:'bold'}}>{this.state.goldRate+"%"}</Text>

                   </View>
                    :
                    <View style={{alignItems:'center', flex:8, borderWidth:1, borderColor : 'green', flexDirection:'column', marginRight:10, borderRadius:7, backgroundColor:'red'}}>
                    <Text style ={{color: 'white',fontSize:20, fontWeight:'bold', padding:5}}>GOLD</Text>
                    <Text  style= {{ color: 'black', fontWeight:'bold'}}>{"$"+this.state.GOLD}</Text>
                    <Text style={{color:"black", fontWeight:'bold'}}> <Ionicons name='ios-arrow-round-down'size={16} color="black" ></Ionicons></Text>
                    <Text  style= {{ color: 'black', fontWeight:'bold'}}>{this.state.goldRate+"%"}</Text>

                    </View>

                }





            </View>
            
            <View style={{flex:8}}>
                <View style= {{  borderBottomWidth:1, borderColor:'white', marginLeft:75, marginRight:75}}>

                      <Text style= {{ color: 'white', textAlign: 'center',fontSize:20, fontWeight:'bold', fontFamily:"Optima", textShadowRadius:1, textShadowColor:'#000',textShadowOffset: { width: 2, height: 2 }}}>
                         My Holdings
                     </Text>

                </View>


                    


                    <FlatList
                        data= {this.state.positions}
                        renderItem={this.renderRow}
                        keyExtractor={item => item.asset_id}
                    />


                
            

              

                
            </View>

        </View>
 
      );
  }
  

}

