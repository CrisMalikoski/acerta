import React, { Component } from 'react'
import './styles.css'
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class Register extends Component {
state = {
  isMaried: false,
  redirect: false,
  name: "",
  email: "",
  spouseName: "",
  cpf: "",
  maritalStatus: "",
  
}

handleMaried = e => {
  e.preventDefault()
  this.setState({ [e.target.name]: e.target.value })
  if(this.state.maritalStatus === "casado"){
    this.setState({
      isMaried: true
    })
  }else{
    this.setState({
      isMaried: false
    })
  }
}

handleRegister = (e) =>{
  e.preventDefault()

  const lead = {
    nome: this.state.name,
    email: this.state.email,
    nomeConjuge: this.state.spouseName,
    cpf: this.state.cpf,
    estadoCivil: this.state.maritalStatus
  }

  axios.post("http://localhost:3333/leads", lead).then(res =>{
    console.log(res);
    console.log(res.data);
    this.setState({redirect: true})
  })

  alert("Lead Cadastrado")

  this.setState({
    name: '',
    email: '',
    spouseName: '',
    cpf: '',
    maritalStatus: ''
  })

  
  
}


  render() {
    const { redirect } = this.state;
    if(redirect){
      return <Redirect to="/"/>
    }
    return (
      <div className="container">
        <img className="logo" src="https://acerta-sistema-dev.web.app/static/media/logo.7fdc93a9.svg" />
        <p className="title">Cadastro de Leads</p>
        <main >
          <div className="form">
            <form onSubmit={this.handleRegister}>
              <fieldset>
              <h2 className="title2">Cadastro</h2>
                
                <label htmlFor="completeName">Nome<br/>
                <input type="text" name="completeName" onChange={e => this.setState({name: e.currentTarget.value})}/>
                </label>
                <br/>
                <label htmlFor="email">E-mail<br/>
                <input type="email" name="email" onChange={e => this.setState({email: e.currentTarget.value})}/>
                </label>
                <label htmlFor="cpf">CPF<br/></label>
                <input type="text" name="cpf" onChange={e => this.setState({cpf: e.currentTarget.value})}/>
                <br/>
                
                
                
                <label htmlFor="maritalStatus">Estado Civil<br/></label>
                <select name="maritalStatus" value={this.state.maritalStatus} onChange={this.handleMaried} >
                  <option value="solteiro">Solteiro</option>
                  <option value="casado">Casado</option>
                  <option value="viuvo">Viúvo</option>
                  <option value="separado">Separado</option>
                </select>
                <br/>
                <label htmlFor="spouseName">Nome do conjuge<br/>
                <input type="text" name="spouseName" readonly={(this.state.isMaried)?"":'readonly'}onChange={e => this.setState({spouseName: e.currentTarget.value})}/>
                </label>
                <a href="/" className="btnCancel">Cancelar</a>
                <button type="submit" className="btnRegister">Cadastrar</button>
              </fieldset>
            </form>
          </div>
        </main>
      </div>
      
    )
  }
}

