'use client'

import { Grid } from 'gridjs-react'
import { Session } from '@/object-types/Session'
import User from '@/object-types/User'
import { _ } from 'gridjs-react'
import { Form } from 'react-bootstrap'
import React, { useState } from 'react'

interface Props {
  session?: Session,
  showData: Array<User>
  onChange: any
}

const SelectTableComponentOwner = ({session, showData, onChange} : Props) => {
  
  const handlerRadioButton = (email: string) => {
    onChange(email)
  }

  return (
    <>
      <div className='row'>
        <Grid
          data={showData}
          columns={[
            {
              name: "",
              formatter: (email: string) => _(<Form.Check name='componentOwner' type='radio' onClick={() => handlerRadioButton(email)} ></Form.Check>),
              width: '10%'
            },
            {
              name: "GivenName",
           
              sort: true
            },
            {
              name: "LastName",
              sort: true
            },
            {
              name: "Email",
              sort: true
            },
            {
              name: "Department",
              sort: true
            }
          ]}
          pagination={{
            limit: 10
          }}
          search={true}
          language={{
            search: {
              placeholder: "🔍 Search..."
            }
          }}
          style={{
            header: {
              display: 'block',
              width: 'fit-content',
              float: 'right'
            }
          }}
        />
      </div>
    </>
  )
}


export default React.memo(SelectTableComponentOwner);