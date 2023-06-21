// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import MapData from "./MapData";

export default interface ComponentPayload {
    name: string,
    description: string,
    componentType: string,
    moderators: Array<string>,
    componentOwner: string,
    ownerAccountingUnit: string,
    ownerGroup: string,
    ownerCountry:string,
    roles: Array<MapData>,
    externalIds: Array<MapData>,
    additionalData: Array<MapData>,
    defaultVendorId: string,
    categories: Array<string>,
    homepage: string,
    mailinglist: string,
    wiki: string,
    blog: string,
  }


