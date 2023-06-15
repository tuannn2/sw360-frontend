'use client'

import { Grid } from 'gridjs-react'
import { Session } from '@/object-types/Session'
import User from '@/object-types/User'

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
            {
              name: "",
              sort: true
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