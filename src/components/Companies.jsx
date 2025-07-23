import React from 'react';
import Company from './Company'

function Companies({company}) {
  return (
    <div className="bg-blue-200 min-h-[100vh] pt-[30px] pt-[50px] justify-center flex flex-wrap gap-10 lg:gap-[80px]">
    {
      company.map((item)=>(
        <Company
          id={item.id}
          item={item.company}
        />
      )) 
    }
    


    </div>
  )
}

export default Companies