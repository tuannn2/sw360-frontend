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
  email: Array<string>
}

const SelectTableModerators = ({session, showData, onChange, email} : Props) => {

  


  const handlerRadioButton = (item: any) => {
    // const emails: Array<string> = email;
    console.log(item)
    // emails.push(emailModerator)
    // console.log("sau")
    // console.log(emails)
    // setmoderators(emails)
  }



  return (
    <>
      <div className='row'>
        <Grid
          data={showData}
          columns={[
            {
              name: "",
              formatter: (item: string) => _(<Form.Check name='moderatorId' type='checkbox' onClick={() => {handlerRadioButton(item)}} ></Form.Check>),
              width: '7%'
            },
            {
              name: "GivenName",
              width: '14%',
              sort: true
            },
            {
              name: "LastName",
              sort: true,
              width: '14%',
            },
            {
              name: "Email",
              sort: true,
              width: '40%',
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


export default React.memo(SelectTableModerators);