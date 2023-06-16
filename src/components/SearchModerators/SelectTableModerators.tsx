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

const SelectTableModerators = ({session, showData} : Props) => {





  return (
    <>
      <div className='row'>
        <Grid
          data={showData}
          columns={[
            // {
            //   name: _(<Form.Check type='checkbox'></Form.Check>),
            //   formatter: (externalId: string) => _(<Form.Check type='checkbox' ></Form.Check>),
            // },
            {
              name: "",
              formatter: (id: string) => _(<Form.Check type='checkbox' ></Form.Check>),
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


export default SelectTableModerators;