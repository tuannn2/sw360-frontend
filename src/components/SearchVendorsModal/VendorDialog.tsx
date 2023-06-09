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
import { useTranslations } from "next-intl";
import { COMMON_NAMESPACE } from "@/object-types/Constants";
import SelectTableVendor from './SelectTableVendor';
import styles from "@/css/SearchModal.module.css"

interface Props {
  show?: boolean,
  setShow?: React.Dispatch<React.SetStateAction<boolean>>,
  session? : Session
}

const VendorDialog = ({ show, setShow, session}: Props) => {
  const t = useTranslations(COMMON_NAMESPACE);
  console.log("------VendorDialog------"+ session)
  const handleCloseDialog = () => {
    setShow(!show);
  }

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
                <div className="col-lg-6">
                    <input type="text" className="form-control" placeholder="Enter search text..." aria-describedby="Search Vendor" />
                </div>
                <div className="col-lg-4">
                    <button type="button" className={`fw-bold btn btn-light ${styles['button-plain']} me-2`}>Search</button>
                </div>
            </div>
            <div className="row mt-3">
                <SelectTableVendor session={session} />
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