import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';




export default function Header() {
  return (
    <View style={{flex:1, flexDirection: 'column', marginTop:20,backgroundColor:'white'}}>
        <View style={{flexDirection:'row'}}>

             <Image 
                  source={require('./profile.png')}
                 style={{flex:1, width:100,height:70,padding:10}}
              />
            
              <Image 
              source={require('./cover.png')}
              style={{ flex: 4, width:100,height:80}}
             />




        </View>



        

        

    </View>
  )
}
