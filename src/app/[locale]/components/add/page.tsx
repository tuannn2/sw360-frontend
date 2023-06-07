// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

"use client";
import styles from "@/css/AddComponents.module.css"
import AddKeyValueComponent from "@/components/AddKeyValue"
import SelectCountryComponent from "@/components/SelectCountry"
import AddAdditionalRolesComponent from "@/components/AddAdditionalRoles"
import SearchUsersModalComponent from "@/components/SearchUsersModal"
import CommonTabIds from "@/object-types/enums/CommonTabsIds";
import SideBar from "@/components/SideBar/SideBar";
import { useState } from "react";

export default function Summary() {

    const [selectedTab, setSelectedTab] = useState<string>(CommonTabIds.SUMMARY)

    const tabList = [
        {
          id: CommonTabIds.SUMMARY,
          name: 'Summary'
        }
    ]

    return (
        <>
            <SearchUsersModalComponent />
            <div className='container' style={{ maxWidth: '98vw', marginTop: '10px' }}>
                <div className='row'>
                    <div className='col-2 sidebar'>
                        <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabList={tabList} />
                    </div>
                    <div className='col'>
                        <div className='row' style={{ marginBottom: '20px' }}>
                            <div className='col-auto'>
                                <div className='btn-toolbar' role='toolbar'>
                                    <div className='btn-group' role='group'>
                                        <button type='button' className='btn btn-primary'>Create Component</button>
                                    </div>
                                    <div className='btn-group' role='group'>
                                        <button type='button' id='mergeButton' className='btn btn-secondary'>Cancel</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        <div className="col">
                            <div className="row mb-4">
                                <div className={`${styles["header"]} mb-2`}>
                                    <p className="fw-bold mt-3">General Information</p>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <label htmlFor="name" className="form-label fw-bold">Name </label>
                                        <input type="text" className="form-control" placeholder="Enter Name" id="name" aria-describedby="name" />
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="createdBy" className="form-label fw-bold">Created by</label>

                                        <input type="text" className="form-control" data-bs-toggle="modal" data-bs-target="#search_vendors_modal" placeholder="Will be set auto" id="createdBy" aria-describedby="Created By" readOnly={true} />
                                        <div id="createdBy" className="form-text"><i className="bi bi-x-circle"></i></div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="categories" className="form-label fw-bold">Categories </label>
                                        <input type="text" className="form-control" placeholder="e.g.,Library,cloud,mobile,..." id="categories" aria-describedby="categories" />
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <div className="row">
                                <div className="col-lg-4">
                                        <label htmlFor="component_type" className="form-label fw-bold">Component Type</label>
                                        <select className="form-select" aria-label="component_type" id="component_type" defaultValue="">
                                            <option value=""></option>
                                            <option value="OSS">OSS</option>
                                            <option value="COST">COST</option>
                                            <option value="Internal">Internal</option>
                                            <option value="Inner Source">Inner Source</option>
                                            <option value="Service">Service</option>
                                            <option value="Freeware">Freeware</option>
                                            <option value="Code Snippet">Code Snippet</option>
                                        </select>
                                        <div id="learn_more_about_component_type" className="form-text"><i className="bi bi-info-circle"></i> Learn more about component types.</div>
                                    </div>
                                    
                                    <div className="col-lg-4">
                                        <label htmlFor="default_vendor" className="form-label fw-bold">Default Vendor</label>
                                        <input type="text" className="form-control" data-bs-toggle="modal" data-bs-target="#search_vendors_modal" placeholder="Click to set vendor" id="default_vendor" aria-describedby="Vendor" readOnly={true} />
                                        <div id="default_vendor" className="form-text"><i className="bi bi-x-circle"></i></div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="tag" className="form-label fw-bold">Homepage Url</label>
                                        <input type="text" className="form-control" placeholder="Will be set automatically" id="tag" aria-describedby="Tag" />
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <div className="row">
                                    <div className="col-lg-4">
                                        <label htmlFor="blog_url" className="form-label fw-bold">Blog URL</label>
                                        <input type="text" className="form-control" placeholder="Enter Blog URL" id="blog_url" aria-describedby="blog_url" />
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="wiki_url" className="form-label fw-bold">Wiki URL</label>
                                        <input type="text" className="form-control" placeholder="Enter Wiki URL" id="wiki_url" aria-describedby="wiki_url" />
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="mailing_list_url" className="form-label fw-bold">Mailing List URL</label>
                                        <input type="text" className="form-control" placeholder="Enter Mailing List URL " id="mailing_list_url" aria-describedby="mailing_list_url" />
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <div className="row">
                                    <div className="col-lg-4">
                                        <label htmlFor="description" className="form-label fw-bold">Description</label>
                                        <textarea className="form-control" placeholder="Enter Description" id="description" aria-describedby="Description"
                                            style={{ height: "100px" }} />
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="modified_on" className="form-label fw-bold">Modified On</label>
                                        <input type="date" className="form-control" id="modified_on" aria-describedby="Modified on" />
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="modified_by" className="form-label fw-bold">Modified By</label>
                                        <input type="text" className="form-control" placeholder="Will be set automatically" id="modified_by" aria-describedby="Modified By" readOnly={true} />
                                    </div>
                                </div>
                                <hr className="my-4" />
                            </div>
                            <div className="row mb-4">
                                <div className={`${styles["header"]} mb-2`}>
                                    <p className="fw-bold mt-3">Roles</p>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <label htmlFor="component_owner" className="form-label fw-bold">Component Owner</label>
                                        <input type="text" className="form-control" data-bs-toggle="modal" data-bs-target="#search_users_modal" placeholder="Click to edit" id="component_owner" aria-describedby="component_owner" readOnly={true} />
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="owner_accounting_unit" className="form-label fw-bold">Owner Accounting Unit</label>
                                        <input type="text" className="form-control" placeholder="Enter Owner Accounting Unit" id="owner_accounting_unit" aria-describedby="Owner Accounting Unit" />
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="owner_billing_group" className="form-label fw-bold">Owner Billing Group</label>
                                        <input type="text" className="form-control" placeholder="Enter Owner Billing Group" id="owner_billing_group" aria-describedby="Owner Billing Group" />
                                    </div>
                                </div>
                                <hr className="my-4"           />
                                <div className="row">
                                    <div className="col-lg-4">
                                        <SelectCountryComponent />
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="moderators" className="form-label fw-bold">Moderators</label>
                                        <input type="text" className="form-control" data-bs-toggle="modal" data-bs-target="#search_users_modal" placeholder="Click to edit" id="moderators" aria-describedby="Moderators" readOnly={true} />
                                    </div>
                                </div>
                                <hr className="my-4" />
                            </div>
                            <div className="row mb-4">
                                <AddAdditionalRolesComponent isComponent={true}/>
                            </div>
                            <div className="row mb-4">
                                <AddKeyValueComponent header={"External ids"} keyName={"external id"} />
                            </div>
                            <div className="row mb-4">
                                <AddKeyValueComponent header={"Additional Data"} keyName={"additional data"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
