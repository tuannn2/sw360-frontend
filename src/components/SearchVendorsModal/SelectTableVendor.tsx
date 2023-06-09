'use client'

import { Grid } from 'gridjs-react'
import { useEffect, useState, useCallback } from 'react'
import CommonUtils from '@/utils/common.utils'
import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import ApiUtils from '@/utils/api/api.util'
import HttpStatus from '@/object-types/enums/HttpStatus'
import { notFound } from 'next/navigation'
import { Session } from '@/object-types/Session'
import ReleaseLink from '@/object-types/ReleaseLink'

interface Props {
  session?: Session,
}

const SelectTableVendor = ({session} : Props) => {
  const t = useTranslations(COMMON_NAMESPACE);
  const [data, setData] = useState([]);

  const fetchData: any = useCallback(async (url: string) => {
    console.log("-----session----"+session)
    const response = await ApiUtils.GET(url, session.user.access_token)
    if (response.status == HttpStatus.OK) {
      const data = await response.json();
      return data;
    } else {
      notFound();
    }
  }, [])

  useEffect(() => {
    fetchData(`vendors`).then((vendors: any) => {
      console.log(vendors)
      // if (!CommonUtils.isNullOrUndefined(releaseLinks['_embedded'])
      //   && !CommonUtils.isNullOrUndefined(releaseLinks['_embedded']['sw360:releaseLinks'])) {
      //   const data = releaseLinks['_embedded']['sw360:releaseLinks'].map((item: ReleaseLink) =>
      //     [item.name, [item.id, item.version], t(item.clearingState), t(item.clearingReport.clearingReportStatus), t(item.mainlineState), item.id])
      //   setData(data)
      // }
    })
  }, []);

  return (
    <>
      <div className='row'>
        <Grid
          data={data}
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