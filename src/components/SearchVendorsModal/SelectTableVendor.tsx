'use client'

import { Grid } from 'gridjs-react'
import { Session } from '@/object-types/Session'
import Vendor from '@/object-types/Vendor'
import { Form } from 'react-bootstrap'
import { _ } from 'gridjs-react'
import React, { useEffect, useState } from 'react'
interface Props {
  session?: Session,
  showData: Array<Vendor>,
  onChange: any
}

const SelectTableVendor = (props : Props) => {

  const handlerRadioButton = (id: string) => {
    const vendorId: string =  handleId(id);
    props.onChange(vendorId)
  }

  const handleId = (id: string): string => {
    const splits: string[] = id.split("/");
    return splits[splits.length-1];
  }


  return (
    <>
      <div className='row'>

        <Grid 
          data={props.showData}
          columns={[
            {
              name: "",
              formatter: (id: string) => _(<Form.Check type='radio' name='VendorId' onChange={() => handlerRadioButton(id)}></Form.Check>),
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


export default React.memo(SelectTableVendor);