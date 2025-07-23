import React from 'react'
import Header from './components/Header'
import Companies from './components/Companies'

function Dashboard({company,signOut}) {
  return (
    <div>
    <Header signOut={signOut}/>
    <Companies company={company}/>
    </div>

  )
}

export default Dashboard