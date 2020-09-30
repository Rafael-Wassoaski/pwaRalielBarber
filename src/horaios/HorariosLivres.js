import React, {useState, Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api';


var meses = new Map();

export default class HorariosLivresScreen extends Component{
    constructor(props){
        super(props);   
        this.state = {
            horarios: '',
        }
}
  
render(){

    meses.set('1', 'Janeiro');
    meses.set('2', 'Fevereiro');
    meses.set('3', 'Marco');
    meses.set('4', 'Abril');
    meses.set('5', 'Maio');
    meses.set('6', 'Junho');
    meses.set('7', 'Julho');
    meses.set('8', 'Agosto');
    meses.set('9', 'Setembro');
    meses.set('10', 'Outubro');
    meses.set('11', 'Novembro');
    meses.set('12', 'Dezembro'); 
    
    const exThis = this;
    async function getHorarios(){
        await api.get('/')
        .then(function(response){
            exThis.setState({horarios: response.data.horarios});
        });
    }
    getHorarios();
    const Item = ({hora, id}) =>{
        
        const horarioPuro = hora.split(' ');
        const dataFormatada = horarioPuro[0].split('-');
        const horaFormatada = horarioPuro[1].split(':');
    
        return(

            <View style = {{borderRadius: 2, borderWidth: 1, borderColor: "#20232a", flex: 1, flexDirection:'row', marginTop : 5, marginLeft: 5}}>
             <TouchableOpacity style = {{marginTop: 5, alignSelf: 'flex-end'}}
             onPress={()=>exThis.props.navigation.navigate('Reservar Horario',{horario:hora, idCabe:id})}>
            <Text style = {{marginLeft: 5}}>{`${dataFormatada[2]} de ${meses.get(dataFormatada[1])} de ${dataFormatada[0]} ` }</Text>
            <Text style = {{marginLeft: 5, marginTop: 5}}>{`${horaFormatada[0]}:${horaFormatada[1]}` }</Text>
            </TouchableOpacity>
            </View>
        )
    }

    const renderItem = ({ item }) => (
        <Item hora={item.hora}
        id = {item.id}/>
      );

      function getView (horarios) {

        if(horarios.length === 0){
    
            return(
                <View style = {{alignSelf: 'center'}}>
                    <Text style = {{flex: 1, flexDirection:'row', marginTop : 5, marginLeft: 5}}>Sem horarios livres</Text>
                </View>
            );
                
        }else{
    
            return(
                <SafeAreaView>
                    <FlatList
                    data = {horarios}
                    renderItem ={renderItem}
                    keyExtractor = {item => item.hora}/>
                </SafeAreaView>
            );
    
        }
        
    }

    return(
     
        getView(this.state.horarios)
    );
}

}