import React, { Component } from 'react'
import './styles.css'
import axios from 'axios';
import LeadsItem from '../../services/lead_item'
export default class LeadsList extends Component {
  
  state = {
    leads: [],
}

fetchById = (id) => {
    
    try {
        axios.get(`http://localhost:3333/leads/${id}`)
            .then(res => {
                this.setState({
                    leads: this.state.leads.filter(lead => lead.id !== id)
                })
            })
    } catch (erro) {
        alert(`Erro: ${erro}`)
    }
    let leadId= this.props.match.params.id;
}
componentDidMount() {
    axios.get('http://localhost:3333/leads')
    .then(res => {
        const leads = res.data
        
        this.setState({ leads })
        
    })
    
}

deleteLead = (id) => {

  alert("Deletando...")
  
  try {
      axios.delete(`http://localhost:3333/leads/${id}`)
          .then(res => {
              this.setState({
                  leads: this.state.leads.filter(lead => lead.id !== id)
              })
          })
  } catch (erro) {
      alert(`Erro: ${erro}`)
  }
}




  
  render() {
    
    return (
      <div className="container">
         <img className="logo" src="https://acerta-sistema-dev.web.app/static/media/logo.7fdc93a9.svg"/>
        <p className="title">Consulta de Leads</p>
        <main>
          <section>
            <form onSubmit={console.log("SUBMiTOU!")} className="filter">
              <fieldset>
            <h2 className="titleFilter">Filtros</h2>
              <label htmlFor="completeName">Nome</label>
                <input type="text" name="completeName" onChange={e => this.setState({name: e.currentTarget.value})}/><label htmlFor="cpf">CPF</label>
                <input type="text" name="cpf" onChange={e => this.setState({name: e.currentTarget.value})}/>
                <button type="submit" className="btnFilter">Filtrar</button>
              </fieldset>
            </form>
          </section>
            <div>
            <a href="/leads-register" className="register">Novo Lead</a>
            </div>
            
          <section className="tabela">
            <table className="rTable">
              <thead>
                <tr>
                  <th></th>
                  <th>Email</th>
                  <th>Nome</th>
                  <th>CPF</th>
                </tr>
              </thead>

              <tbody>
              {this.state.leads.map((lead) => (
                    <LeadsItem
                    key={lead.id}
                    id={lead.id}
                    excluir={() => this.deleteLead(lead.id)}
                    alter={lead.id}
                    nome={lead.nome}
                    email={lead.email}
                    cpf={lead.cpf}
                    ></LeadsItem>
                    ))}

              </tbody>

            </table>
          </section>
        </main>
      </div>
    )
  }
}
