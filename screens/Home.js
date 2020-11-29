import React from 'react';
import { StyleSheet, Text, View ,FlatList,ScrollView} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Header} from 'react-native-elements';
import db from '../config'
import firebase from 'firebase'

export default class Home extends React.Component{
    constructor(){
        super();
        this.state={
            allItems: [],
            dataSource=[]
        }
    }

    componentDidMount(){
        this.retrieveItems();
    }

    retrieveItems=()=>{
        var allItems=[],
        var items = db.collection("Barter_Items")
        .get.then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                allItems.push(doc.data())
            })
            this.setState({allItems:allItems})
        })
    }

    render(){ 
        return(
            <FlatList
            renderItem={ ({item})=>(
              <View  style={{borderColor:'turquoise',borderWidth:2,padding:10,alignItems:'center',margin:30}}>
                <Text>Requested Item: {item.Description}</Text>
                <Text>Description: {item.ItemName}</Text>
              </View>
              
              )
            }
            >
          </FlatList> 
        )
    }
}

