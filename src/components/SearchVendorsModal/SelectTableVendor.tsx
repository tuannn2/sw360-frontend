'use client'

import { Grid } from 'gridjs-react'
import { Session } from '@/object-types/Session'
import Vendor from '@/object-types/Vendor'

interface Props {
  session?: Session,
  showData: Array<Vendor>
}

const SelectTableVendor = ({session, showData} : Props) => {
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
              name: "FullName",
           
              sort: true
            },
            {
              name: "ShortName",
              sort: true
            },
            {
              name: "URL",
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


export default SelectTableVendor;