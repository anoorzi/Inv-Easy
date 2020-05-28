import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ImageBackground } from 'react-native';

import Header from './components/Header';
import Dashboard from './components/DashBoard';
import Profile from './components/Profile';
import Search from './components/Search'
import News from './components/News'




import {Ionicons} from '@expo/vector-icons'




export default class App extends React.Component{


  state ={
      view:'dash'
  }

  render(){
    return (
      <ImageBackground source={require('./assets/background.jpg')} style={{flex:1, flexDirection: 'column'}}>
        <View style={{flex:3 }}>
          
             <Header />
  
        </View>

        <View style={{flex:18}}>
        {this.state.view==='dash' && <Dashboard />}
        {this.state.view==='profile' && <Profile />}
        {this.state.view==='search' && <Search />}
        {this.state.view==='news' && <News />}





        </View>
        
  
        <View style={{flex:2 , flexDirection:'row'}} >
          
            <TouchableOpacity style={{flex:1,backgroundColor: "white"}} onPress={()=> this.setState({view:'dash'})}>
               <Text style={{textAlign:'center'}}>
               <Ionicons name='ios-stats'size={50} color="green" >                
               </Ionicons>
                       
               </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1, backgroundColor: "white" }} onPress={()=> this.setState({view:'profile'})}>
               <Text style={{textAlign:'center'}}>
                   <Ionicons name='ios-person'size={50} color="red" >                
                   </Ionicons>
               </Text>

            </TouchableOpacity>

            <TouchableOpacity style={{flex:1, backgroundColor: "white" }} onPress={()=> this.setState({view:'search'})}>
               <Text style={{textAlign:'center'}}>
                   <Ionicons name='logo-usd'size={50} color="green" >                
                   </Ionicons>
               </Text>

            </TouchableOpacity>

            <TouchableOpacity style={{flex:1, backgroundColor: "white" }} onPress={()=> this.setState({view:'news'})}>
               <Text style={{textAlign:'center'}}>
                   <Ionicons name='ios-paper'size={50} color="red" >    

                   </Ionicons>
               </Text>

            </TouchableOpacity>



        </View> 
  
      </ImageBackground>
    )

  }
 
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'blue',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

