import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api'
import AsyncStorage from '@react-native-community/async-storage';
import { XCircleFill } from 'react-bootstrap-icons';

var meses = new Map();
var cortes = new Map();


async function getMeusHorarios(idUser, exThis) {

  await api.post('/meusHorarios', {
    idUser: idUser,
  }).then(function (response) {
    exThis.setState({horarios: response.data.horarios});
  })

}

function cofirmaCancelamento(idUser, data, exThis){

  if(confirm('Deseja cancelar este horario? (Clique em Ok para cancelar)')){
    cancelarHorario(idUser, data, exThis)
  }
 
}

async function cancelarHorario(idUser, data, exThis) {

  await api.post('/cancelarHorario', {
    id: idUser,
    data: data,
  }).then(function (response) {
 
    if(response.data.status === 200){
      getMeusHorarios(exThis.state.idUser, exThis)
      const notificacao = () => toast.success("Horario cancelado", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    notificacao();
    }else{
      const notificacao = () => toast.error("Erro ao cancelar, tente novamente", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    notificacao();
    }
  })

}

export default class MeusHorariosScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      idUser: '',
      horarios: ''
    }

    AsyncStorage.getItem("ID").then((value) => {
      if (value) {
        this.setState({ idUser: value });
        getMeusHorarios(this.state.idUser, this);
      }
    });

  

  }
  render() {
    getMeusHorarios(this.state.idUser, this);

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

    cortes.set(1,'Social - 30 min');
    cortes.set(2,'Degrade - 30 min' );
    cortes.set(3,'Navalhado - 45 min' );
    cortes.set(4,'Sobrancelha na pinca - 10 min' );
    cortes.set(5,'Sobrancelha na Na navalha - 5 min' );
    cortes.set(6,'Barba 15 min' );

    const exThis = this;
    const Item = ({ hora, id, nome, corte }) => {

      const horarioPuro = hora.split(' ');
      const dataFormatada = horarioPuro[0].split('-');
      const horaFormatada = horarioPuro[1].split(':');
  

      return (

        <View style = {{borderRadius: 2, borderWidth: 1, borderColor: "#20232a", flex: 1, flexDirection:'column', marginTop : 5, marginLeft: 5}}>
             <TouchableOpacity style = {{marginTop: 5}}
             onPress={()=>cofirmaCancelamento(this.state.idUser, hora, this)}>
            <Text style = {{marginLeft: 5}}>{`${dataFormatada[2]} de ${meses.get(dataFormatada[1])} de ${dataFormatada[0]} ` }</Text>
            <Text style = {{marginLeft: 5, marginTop: 5}}>{`${horaFormatada[0]}:${horaFormatada[1]}` }</Text>
            <Text style = {{marginLeft: 5, marginTop: 5}}>{`Barbeiro: ${nome}`}</Text>
            <Text style = {{marginLeft: 5, marginTop: 5}}>{`${cortes.get(corte)}`}</Text>
            </TouchableOpacity>
            </View>
      )
    }

    const renderItem = ({ item }) => (
      <Item hora={item.hora}
        id={item.id}
        nome={item.nome}
        corte={item.corte} />
    );

    function getView(horarios) {

      if (horarios.length === 0) {

        return (
          <View style = {{alignSelf: 'center'}}>
                    <Text style = {{flex: 1, flexDirection:'row', marginTop : 5, marginLeft: 5}}>Sem horarios reservados</Text>
                </View>
        );

      } else {

        return (
          <View>
          <SafeAreaView>
            <FlatList
              data={horarios}
              renderItem={renderItem}
              keyExtractor={item => item.hora} />
          </SafeAreaView>
          <ToastContainer />
          </View>
        );

      }

    }

    return (
      getView(this.state.horarios)
    );
  }
}