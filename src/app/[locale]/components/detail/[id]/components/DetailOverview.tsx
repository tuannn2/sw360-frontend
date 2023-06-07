// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

"use client"
import { useEffect, useState, useCallback } from 'react'
import SideBar from '@/components/SideBar/SideBar'
import Summary from './Summary'
import ReleaseOverview from './ReleaseOverview'
import Attachments from '@/components/Attachments/Attachments'
import ChangeLogList from '@/components/ChangeLog/ChangeLogList/ChangeLogList'
import ChangeLogDetail from '@/components/ChangeLog/ChangeLogDetail/ChangeLogDetail'
import ComponentVulnerabilities from '@/components/ComponentVulnerabilities/ComponentVulnerabilities'
import CommonTabIds from '@/object-types/enums/CommonTabsIds'
import ComponentTabIds from '@/object-types/enums/ComponentTabIds'
import ApiUtils from '@/utils/api/api.util'
import { Session } from '@/object-types/Session'
import HttpStatus from '@/object-types/enums/HttpStatus'
import { signOut } from 'next-auth/react'
import { notFound } from 'next/navigation'
import CommonUtils from '@/utils/common.utils'
import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import { LinkedVulnerability } from '@/object-types/LinkedVulnerability'

interface Props {
  session: Session,
  componentId: string,
}

const tabList = [
  {
    id: CommonTabIds.SUMMARY,
    name: 'Summary'
  },
  {
    id: ComponentTabIds.RELEASE_OVERVIEW,
    name: 'Release Overview'
  },
  {
    id: CommonTabIds.ATTACHMENTS,
    name: 'Attachments'
  },
  {
    id: CommonTabIds.VULNERABILITIES,
    name: 'Vulnerabilities'
  },
  {
    id: CommonTabIds.CHANGE_LOG,
    name: 'Change Log'
  },
]

const DetailOverview = ({ session, componentId }: Props) => {
  const t = useTranslations(COMMON_NAMESPACE);
  const [selectedTab, setSelectedTab] = useState<string>(CommonTabIds.SUMMARY)
  const [changesLogTab, setChangesLogTab] = useState('list-change')
  const [changeLogIndex, setChangeLogIndex] = useState(-1)
  const [component, setComponent] = useState<any>(undefined)
  const [changeLogList, setChangeLogList] = useState<Array<any>>([]);
  const [vulnerData, setVulnerData] = useState<Array<LinkedVulnerability>>([]);
  const [attachmentNumber, setAttachmentNumber] = useState<number>(0);

  const fetchData: any = useCallback(async (url: string) => {
    const response = await ApiUtils.GET(url, session.user.access_token)
    if (response.status == HttpStatus.OK) {
      const data = await response.json();
      return data;
    } else if (response.status == HttpStatus.UNAUTHORIZED) {
      signOut();
    } else {
      notFound();
    }
  }, [session.user.access_token])

  useEffect(() => {
    fetchData(`components/${componentId}`).then((component: any) => {
      setComponent(component);
      if (!CommonUtils.isNullOrUndefined(component['_embedded'])
        && !CommonUtils.isNullOrUndefined(component['_embedded']['sw360:attachments'])) {
        setAttachmentNumber(component['_embedded']['sw360:attachments'].length);
      }
    })

    fetchData(`changelog/document/${componentId}`).then((changeLogs: any) => {
      setChangeLogList(CommonUtils.isNullOrUndefined(changeLogs['_embedded']['sw360:changeLogs']) ? [] : changeLogs['_embedded']['sw360:changeLogs'])
    })

    fetchData(`components/${componentId}/vulnerabilities`).then((data: any) => {
      if (!CommonUtils.isNullOrUndefined(data['_embedded']) &&
        !CommonUtils.isNullOrUndefined(data['_embedded']['sw360:vulnerabilityDTOes'])) {
        setVulnerData(data['_embedded']['sw360:vulnerabilityDTOes'])
      } else {
        setVulnerData([])
      }
    })
  }, [componentId, fetchData])

  return (
    (component) && (
      <div className='container' style={{ maxWidth: '98vw', marginTop: '10px' }}>
        <div className='row'>
          <div className='col-2 sidebar'>
            <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabList={tabList} vulnerabilities={vulnerData} />
          </div>
          <div className='col'>
            <div className='row' style={{ marginBottom: '20px' }}>
              <div className='col-auto'>
                <div className='btn-toolbar' role='toolbar'>
                  <div className='btn-group' role='group'>
                    <button type='button' className='btn btn-primary'>{t('Edit component')}</button>
                  </div>
                  <div className='btn-group' role='group'>
                    <button type='button' id='mergeButton' className='btn btn-secondary'>{t('Merge')}</button>
                  </div>
                  <div className='btn-group' role='group'>
                    <button type='button' id='splitButton' className='btn btn-secondary'>{t('Split')}</button>
                  </div>
                  <div className='btn-group' role='group'>
                    <button id='subcribeButton' type='button' className='btn btn-outline-success'>{t('Subscribe')}</button>
                  </div>
                  {(selectedTab === CommonTabIds.ATTACHMENTS && attachmentNumber > 0) &&
                    <div className='list-group-companion' data-belong-to='tab-Attachments'>
                      <div className='btn-group' role='group'>
                        <button id='downloadAttachmentBundle' type='button' className='btn btn-secondary'>{t('Download Attachment Bundle')}</button>
                      </div>
                    </div>}
                  {(selectedTab === CommonTabIds.CHANGE_LOG) &&
                    <div className="nav nav-pills justify-content-center bg-light font-weight-bold" id="pills-tab" role="tablist">
                      <a className={`nav-item nav-link ${changesLogTab == 'list-change' ? 'active' : ''}`}
                        onClick={() => setChangesLogTab('list-change')}
                        style={{ color: '#F7941E', fontWeight: 'bold' }}>
                        {t('Change Log')}</a>
                      <a className={`nav-item nav-link ${changesLogTab == 'view-log' ? 'active' : ''}`}
                        onClick={() => { (changeLogIndex !== -1) && setChangesLogTab('view-log') }}
                        style={{ color: '#F7941E', fontWeight: 'bold' }}
                      >
                        {t('Changes')}</a>
                    </div>}
                </div>
              </div>
              <div className='col portlet-title text-truncate' style={{ textAlign: 'right', fontSize: '1.5rem', textTransform: 'uppercase', color: 'rgba(108, 117, 125, 0.4)' }}>
                {component.name}
              </div>
            </div>
            <div className='row' hidden={selectedTab !== CommonTabIds.SUMMARY ? true : false}>
              <Summary component={component} componentId={componentId} />
            </div>
            <div className='row' hidden={selectedTab !== ComponentTabIds.RELEASE_OVERVIEW ? true : false}>
              <ReleaseOverview componentId={componentId} session={session}/>
            </div>
            <div className='row' hidden={selectedTab != CommonTabIds.ATTACHMENTS ? true : false}>
              <Attachments session={session} componentId={componentId} />
            </div>
            <div className='containers' hidden={selectedTab != CommonTabIds.VULNERABILITIES ? true : false}>
              <ComponentVulnerabilities vulnerData={vulnerData} />
            </div>
            <div className='row' hidden={selectedTab != CommonTabIds.CHANGE_LOG ? true : false}>
              <div className='col'>
                <div className='row' hidden={changesLogTab != 'list-change' ? true : false}>
                  <ChangeLogList setChangeLogIndex={setChangeLogIndex} documentId={componentId}
                    setChangesLogTab={setChangesLogTab} changeLogList={changeLogList} />
                </div>
                <div className='row' hidden={changesLogTab != 'view-log' ? true : false}>
                  <ChangeLogDetail changeLogData={changeLogList[changeLogIndex]} />
                  <div id="cardScreen" style={{ padding: '0px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    ))
}

export default DetailOverview;