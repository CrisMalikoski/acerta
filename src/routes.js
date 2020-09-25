import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import Register from './pages/register'
import LeadsList from './pages/leads_list'
import Alter from './pages/alter_lead'
function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact  component={LeadsList}/>
      <Route path="/leads-register"  component={Register}/>
      <Route path="/alter_lead/:id"  component={Alter}/>
    </BrowserRouter>
    
  );
}

export default Routes;
