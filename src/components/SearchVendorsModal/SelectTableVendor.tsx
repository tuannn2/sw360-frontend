'use client'

import { Grid } from 'gridjs-react'
import { Session } from '@/object-types/Session'
import Vendor from '@/object-types/Vendor'
import { Form } from 'react-bootstrap'
import { _ } from 'gridjs-react'
import { useEffect } from 'react'
interface Props {
  session?: Session,
  showData: Array<Vendor>
}

const SelectTableVendor = ({session, showData} : Props) => {

  const handlerRadioButton = (id: string) => {
    console.log(id)
  }


  return (
    <>
      {/* Grid.on('cellClick', (...args) => console.log('cell: ' + JSON.stringify(args), args)); */}
      <div className='row'>

        <Grid 
          data={showData}
          columns={[
            {
              name: "",
              formatter: (id: string) => _(<Form.Check type='radio' onClick={() => handlerRadioButton(id)}></Form.Check>),
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
            },
            {
              name: "_links",
              hidden: true
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
          className = {{
            td: 'my-td-class',
            table: 'vendor' 
          }}
        />
      </div>
    </>
  )
}


export default SelectTableVendor;