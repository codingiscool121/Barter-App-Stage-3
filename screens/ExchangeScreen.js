import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import { render } from 'react-dom';

export default class Exchange extends React.Component{
constructor(props){
    super(props);
    this.state={
        UserId: firebase.auth().currentUser.email,
        ItemName:"",
        Description: "",
    }
}

storeItem(ItemName, Description){
var userid = this.state.UserId;
db.collection('Barter_Items').add({
    UserId: userid,
    ItemName: ItemName,
    Description: Description
})
this.setState({
    ItemName:"",
    Description: ""
})
return(
    Alert.alert(ItemName + "has successfully been requested, and we will try to get it to you, " + firebase.auth().currentUser.email + "as soon as possible.")
)
}
render(){
    <View>
        <TextInput placeholder="Please enter the name of your item."
        style={styles.inputBox}
        multiline
        numberOfLines={4}
        onChangeText={text=>{
            this.setState({
           ItemName: text 
            })
        }}
        value={this.state.ItemName}
        ></TextInput>
        <TextInput placeholder={"Enter a description of your item, " + firebase.auth().currentUser.email + "."}
       style={styles.inputBox}
       multiline
       numberOfLines={8}
        onChangeText={text=>{
            this.setState({
                Description: text
            })
        }}
        value={this.state.Description}
        ></TextInput>
        <TouchableOpacity
        style={styles.button}
        onPress={()=>{
            this.storeItem(this.state.ItemName,this.state.Description);
        }}
        >
        <Text>Send</Text>
        </TouchableOpacity>
    </View>
}
}

const styles= StyleSheet.create({
    keyboardstyle:{
        flex:1,
        alignItems:'center',
        justifyContent: ' center'
    },
    inputBox:{
        width:"80%",
        height: 30,
        alignSelf: 'center',
        borderColor: "orange",
        borderRadius: 30,
        borderWidth: 2,
        marginTop : 25,
        padding: 30
    },
    button:{
        width:30,
        height: 30,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "green",
        marginTop: 30,
        shadowColor: "black",
        shadowOpacity: 0.53,
        ShadowOffset:{width:23, height: 34}
    }
})