'use client'

import { Grid } from 'gridjs-react'
import { Session } from '@/object-types/Session'
import User from '@/object-types/User'
import { _ } from 'gridjs-react'
import { Form } from 'react-bootstrap'

interface Props {
  session?: Session,
  showData: Array<User>
}

const SelectTableComponentOwner = ({session, showData} : Props) => {
  
  return (
    <>
      <div className='row'>
        <Grid
          data={showData}
          columns={[
            {
              name: "",
              formatter: (id: string) => _(<Form.Check type='radio' ></Form.Check>),
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
            limit: 100
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


export default SelectTableComponentOwner;