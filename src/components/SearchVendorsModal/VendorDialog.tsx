// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

"use client"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Session } from '@/object-types/Session'
import SelectTableVendor from './SelectTableVendor';
import styles from "@/css/SearchModal.module.css"
import { notFound } from 'next/navigation';
import ApiUtils from '@/utils/api/api.util';
import HttpStatus from '@/object-types/enums/HttpStatus';
import { useCallback, useEffect, useState } from 'react';
import CommonUtils from '@/utils/common.utils';
import Vendor from '@/object-types/Vendor';

interface Props {
  show?: boolean,
  setShow?: React.Dispatch<React.SetStateAction<boolean>>,
  session? : Session
}

const VendorDialog = ({ show, setShow, session}: Props) => {

  const [data, setData] = useState([]);
  const [inputSeach, setInputSearch] = useState('');
  const [showDataSearch, setshowDataSearch] =useState([]);

  const handleCloseDialog = () => {
    setShow(!show);
  }

  const searchVendor = () => {
    // if (inputSeach == null){
      
    // } else {
    //   // assss
    // }
    setshowDataSearch(data);
    console.log(data)
    
  }

  const fetchData: any = useCallback(async (url: string) => {
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
      if (!CommonUtils.isNullOrUndefined(vendors['_embedded'])
        && !CommonUtils.isNullOrUndefined(vendors['_embedded']['sw360:vendors'])) {
        const data = vendors['_embedded']['sw360:vendors'].map((item: any) =>
          [item._links.self.href, item.fullName, item.shortName, item.url])
        setData(data)
      }
    })
  }, []);


  return (
    <Modal
      show={show}
      onHide={handleCloseDialog}
      backdrop='static'
      centered
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>Search Vendor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">
            <div className="row">
                {/* <div className="col-lg-6">
                    <input type="text" className="form-control" placeholder="Enter search text..." aria-describedby="Search Vendor"  onChange={(event) => {setInputSearch(event.target.value)}} />
                </div> */}
                <div className="col-lg-4">
                    <button type="button" className={`fw-bold btn btn-light ${styles['button-plain']} me-2`} onClick={searchVendor}>Search</button>
                </div>
            </div>
            <div className="row mt-3">
                <SelectTableVendor session={session}  showData={showDataSearch} />
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='justify-content-end' >
        <Button type="button" data-bs-dismiss="modal" className={`fw-bold btn btn-light ${styles['button-plain']} me-2`} onClick={handleCloseDialog}>Close</Button>
        <Button type="button" className={`fw-bold btn btn-light ${styles['button-plain']}`}>Add Vendor</Button>
        <Button type="button" className={`fw-bold btn btn-light ${styles['button-orange']}`} >Select Vendor</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default VendorDialog