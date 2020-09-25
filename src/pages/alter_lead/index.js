import React, { Component } from 'react'
import './styles.css'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Alter extends Component {
state = {
  name: "",
  email: "",
  spouseName: "",
  cpf: "",
  maritalStatus: "",
  
}

async componentDidMount(){
  const id = this.props.match.params.id
  const url = `http://localhost:3333/leads/${id}`
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)

 this.setState({
  name: data.nome,
  email: data.email,
  spouseName: data.nomeConjuge,
  cpf: data.cpf,
  maritalStatus: data.estadoCivil
 })
}

handleSubmit = e => {
  e.preventDefault();

  const leads = {

      nome: this.state.name,
      email: this.state.email,
      cpf: this.state.cpf,
      nomeConjuge: this.state.spouseName,
      estadoCivil: this.state.maritalStatus,
      
  }

  const message = window.confirm("Deseja Alterar " + this.state.name + " na tabela de leads?")

  if (message === true) {

      const id = this.props.match.params.id
      axios.put(`http://localhost:3333/leads/${id}`, leads)
          .then(res => {
              console.log(res);
              console.log(res.data)
              this.setState({ redirect: true})
          })

      alert("Lead Alterado com sucesso!")
        return  <Redirect to="/"/>
      this.setState({
          name: '',
          email: '',
          spouseName: '',
          cpf: '',
          maritalStatus: ''
      })
  } else {
      alert("Lead não foi cadastrado, favor verificar os dados!")
  }
}



  render() {
    return (
      <div className="container">
        <img className="logo" src="https://acerta-sistema-dev.web.app/static/media/logo.7fdc93a9.svg" />
        <p className="title">Alterar de Leads</p>
        <main className="form">
          <div>
            <form>
              <fieldset>
                <label htmlFor="completeName">Nome</label>
                <input type="text" name="completeName" value ={this.state.name} onChange={e => this.setState({name: e.currentTarget.value})}/>
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" value = {this.state.email} onChange={e => this.setState({email: e.currentTarget.value})}/>
                <label htmlFor="spouseName">Nome do conjuge</label>
                <input type="text" name="spouseName" value = {this.state.spouseName} onChange={e => this.setState({spouseName: e.currentTarget.value})}/>
                <label htmlFor="cpf">CPF</label>
                <input type="text" name="cpf" value = {this.state.cpf} onChange={e => this.setState({cpf: e.currentTarget.value})}/>
                <label htmlFor="maritalStatus">Estado Civil</label>
                <select name="maritalStatus" value={this.state.maritalStatus} onChange={e => this.setState({maritalStatus: e.currentTarget.value})} >
                  <option value="solteiro">Solteiro</option>
                  <option value="casado">Casado</option>
                  <option value="viuvo">Viúvo</option>
                  <option value="separado">Separado</option>
                </select>
                <a href="/" className="btnCancel">Cancelar</a>
                <button type="button" className="btnRegister">Cadastrar</button>
              </fieldset>
            </form>
          </div>
        </main>
      </div>
    )
  }
}

