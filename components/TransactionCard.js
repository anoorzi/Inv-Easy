import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';



export default class TransactionCard extends React.Component {



    

    render(){
        return(

            
            <View style={{borderWidth:1, borderColor:'blue', flexDirection:'row',margin:10,borderRadius:7, backgroundColor:'white' }}>
                <View style={{padding:10, flex:4}}>
                  <Text style={{fontWeight: 'bold', fontSize:20}}>
                      {this.props.transaction.symbol}
                  </Text>
                  <Text >
                      {this.props.transaction.qty} @ {this.props.transaction.price}
                </Text>

                 {this.props.transaction.side==='buy'?  <Text style={{color:'green'}}>{this.props.transaction.side.toUpperCase()}  </Text>:  <Text style={{color:'red'}}>{this.props.transaction.side.toUpperCase()}  </Text> }
         

                </View>

                <View  style={{padding:10,flex:1}}>

                     <Text style={{color:'red'}}>
                         {this.props.transaction.transaction_time}
                     </Text>


                </View>
    
       
         






            </View>
        )
    }

}