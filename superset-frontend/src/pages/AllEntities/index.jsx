/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// import React, { useMemo } from 'react';
// import { ensureIsArray, styled, t } from '@superset-ui/core';
// import { StringParam, useQueryParam } from 'use-query-params';
// import withToasts from 'src/components/MessageToasts/withToasts';
// import AsyncSelect from 'src/components/Select/AsyncSelect';
// import { SelectValue } from 'antd/lib/select';
// import { loadTags } from 'src/components/Tags/utils';
// import { getValue } from 'src/components/Select/utils';
// import AllEntitiesTable from 'src/features/allEntities/AllEntitiesTable';
//
// const AllEntitiesContainer = styled.div`
//   ${({ theme }) => `
//   background-color: ${theme.colors.grayscale.light4};
//   .select-control {
//     margin-left: ${theme.gridUnit * 4}px;
//     margin-right: ${theme.gridUnit * 4}px;
//     margin-bottom: ${theme.gridUnit * 2}px;
//   }
//   .select-control-label {
//     text-transform: uppercase;
//     font-size: ${theme.gridUnit * 3}px;
//     color: ${theme.colors.grayscale.base};
//     margin-bottom: ${theme.gridUnit * 1}px;
//   }`}
// `;
//
// const AllEntitiesNav = styled.div`
//   ${({ theme }) => `
//   height: ${theme.gridUnit * 12.5}px;
//   background-color: ${theme.colors.grayscale.light5};
//   margin-bottom: ${theme.gridUnit * 4}px;
//   .navbar-brand {
//     margin-left: ${theme.gridUnit * 2}px;
//     font-weight: ${theme.typography.weights.bold};
//   }`};
// `;
//
// function AllEntities() {
//   const [tagsQuery, setTagsQuery] = useQueryParam('tags', StringParam);
//
//   const onTagSearchChange = (value: SelectValue) => {
//     const tags = ensureIsArray(value).map(tag => getValue(tag));
//     const tagSearch = tags.join(',');
//     setTagsQuery(tagSearch);
//   };
//
//   const tagsValue = useMemo(
//     () =>
//       tagsQuery
//         ? tagsQuery.split(',').map(tag => ({ value: tag, label: tag }))
//         : [],
//     [tagsQuery],
//   );
//
//   return (
//     <AllEntitiesContainer>
//       <div className="select-control">
//         <div className="select-control-label">{t('search by folder names')}</div>
//         <AsyncSelect
//           ariaLabel="tags"
//           value={tagsValue}
//           onChange={onTagSearchChange}
//           options={loadTags}
//           placeholder="Select"
//           mode="single"
//         />
//       </div>
//       <AllEntitiesTable search={tagsQuery || ''} />
//     </AllEntitiesContainer>
//   );
// }
//
// export default withToasts(AllEntities);





// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   isFeatureEnabled,
//   FeatureFlag,
//   getExtensionsRegistry,
//   JsonObject,
//   styled,
//   t,
// } from '@superset-ui/core';
// import rison from 'rison';
// import Collapse from 'src/components/Collapse';
// import { User } from 'src/types/bootstrapTypes';
// import { reject } from 'lodash';
// import {
//   dangerouslyGetItemDoNotUse,
//   dangerouslySetItemDoNotUse,
//   getItem,
//   LocalStorageKeys,
//   setItem,
// } from 'src/utils/localStorageHelpers';
// import ListViewCard from 'src/components/ListViewCard';
// import withToasts from 'src/components/MessageToasts/withToasts';
// import {
//   CardContainer,
//   createErrorHandler,
//   getRecentActivityObjs,
//   getUserOwnedObjects,
//   loadingCardCount,
//   mq,
// } from 'src/views/CRUD/utils';
// import { AntdSwitch } from 'src/components';
// import getBootstrapData from 'src/utils/getBootstrapData';
// import { TableTab } from 'src/views/CRUD/types';
// import SubMenu, { SubMenuProps } from 'src/features/home/SubMenu';
// import { userHasPermission } from 'src/dashboard/util/permissionUtils';
// import { WelcomePageLastTab } from 'src/features/home/types';
// import DashboardTable from 'src/features/home/DashboardTable';

// const extensionsRegistry = getExtensionsRegistry();

// interface WelcomeProps {
//   user: User;
//   addDangerToast: (arg0: string) => void;
// }

// export interface ActivityData {
//   [TableTab.Created]?: JsonObject[];
//   [TableTab.Edited]?: JsonObject[];
//   [TableTab.Viewed]?: JsonObject[];
//   [TableTab.Other]?: JsonObject[];
// }

// interface LoadingProps {
//   cover?: boolean;
// }

// const DEFAULT_TAB_ARR = ['2', '3'];

// const WelcomeContainer = styled.div`
//   background-color: ${({ theme }) => theme.colors.grayscale.light4};
//   .ant-row.menu {
//     margin-top: -15px;
//     background-color: ${({ theme }) => theme.colors.grayscale.light4};
//     &:after {
//       content: '';
//       display: block;
//       border: 1px solid ${({ theme }) => theme.colors.grayscale.light2};
//       margin: 0px ${({ theme }) => theme.gridUnit * 6}px;
//       position: relative;
//       width: 100%;
//       ${mq[1]} {
//         margin-top: 5px;
//         margin: 0px 2px;
//       }
//     }
//     .ant-menu.ant-menu-light.ant-menu-root.ant-menu-horizontal {
//       padding-left: ${({ theme }) => theme.gridUnit * 8}px;
//     }
//     button {
//       padding: 3px 21px;
//     }
//   }
//   .ant-card-meta-description {
//     margin-top: ${({ theme }) => theme.gridUnit}px;
//   }
//   .ant-card.ant-card-bordered {
//     border: 1px solid ${({ theme }) => theme.colors.grayscale.light2};
//   }
//   .ant-collapse-item .ant-collapse-content {
//     margin-bottom: ${({ theme }) => theme.gridUnit * -6}px;
//   }
//   div.ant-collapse-item:last-child.ant-collapse-item-active
//     .ant-collapse-header {
//     padding-bottom: ${({ theme }) => theme.gridUnit * 3}px;
//   }
//   div.ant-collapse-item:last-child .ant-collapse-header {
//     padding-bottom: ${({ theme }) => theme.gridUnit * 9}px;
//   }
//   .loading-cards {
//     margin-top: ${({ theme }) => theme.gridUnit * 8}px;
//     .ant-card-cover > div {
//       height: 168px;
//     }
//   }
// `;

// const WelcomeNav = styled.div`
//   ${({ theme }) => `
//     .switch {
//       display: flex;
//       flex-direction: row;
//       margin: ${theme.gridUnit * 4}px;
//       span {
//         display: block;
//         margin: ${theme.gridUnit}px;
//         line-height: ${theme.gridUnit * 3.5}px;
//       }
//     }
//   `}
// `;

// const bootstrapData = getBootstrapData();

// export const LoadingCards = ({ cover }: LoadingProps) => (
//   <CardContainer showThumbnails={cover} className="loading-cards">
//     {[...new Array(loadingCardCount)].map((_, index) => (
//       <ListViewCard
//         key={index}
//         cover={cover ? false : <></>}
//         description=""
//         loading
//       />
//     ))}
//   </CardContainer>
// );

// function Welcome({ user, addDangerToast }: WelcomeProps) {
//   const canReadSavedQueries = userHasPermission(user, 'SavedQuery', 'can_read');
//   const userid = user.userId;
//   const id = userid!.toString(); // confident that user is not a guest user
//   const params = rison.encode({ page_size: 6 });
//   const recent = `/api/v1/log/recent_activity/?q=${params}`;
//   const [activeChild, setActiveChild] = useState('Loading');
//   const userKey = dangerouslyGetItemDoNotUse(id, null);
//   let defaultChecked = false;
//   const isThumbnailsEnabled = isFeatureEnabled(FeatureFlag.THUMBNAILS);
//   if (isThumbnailsEnabled) {
//     defaultChecked =
//       userKey?.thumbnails === undefined ? true : userKey?.thumbnails;
//   }
//   const [checked, setChecked] = useState(defaultChecked);
//   const [activityData, setActivityData] = useState<ActivityData | null>(null);
//   const [chartData, setChartData] = useState<Array<object> | null>(null);
//   const [queryData, setQueryData] = useState<Array<object> | null>(null);
//   const [dashboardData, setDashboardData] = useState<Array<object> | null>(
//     null,
//   );
//   const [isFetchingActivityData, setIsFetchingActivityData] = useState(true);

//   const collapseState = getItem(LocalStorageKeys.homepage_collapse_state, []);
//   const [activeState, setActiveState] = useState<Array<string>>(collapseState);

//   const handleCollapse = (state: Array<string>) => {
//     setActiveState(state);
//     setItem(LocalStorageKeys.homepage_collapse_state, state);
//   };

//   const WelcomeMessageExtension = extensionsRegistry.get('welcome.message');
//   const WelcomeTopExtension = extensionsRegistry.get('welcome.banner');
//   const WelcomeMainExtension = extensionsRegistry.get(
//     'welcome.main.replacement',
//   );

//   const [otherTabTitle, otherTabFilters] = useMemo(() => {
//     const lastTab = bootstrapData.common?.conf
//       .WELCOME_PAGE_LAST_TAB as WelcomePageLastTab;
//     const [customTitle, customFilter] = Array.isArray(lastTab)
//       ? lastTab
//       : [undefined, undefined];
//     if (customTitle && customFilter) {
//       return [t(customTitle), customFilter];
//     }
//     if (lastTab === 'all') {
//       return [t('All'), []];
//     }
//     return [
//       t('Examples'),
//       [
//         {
//           col: 'created_by',
//           opr: 'rel_o_m',
//           value: 0,
//         },
//       ],
//     ];
//   }, []);

//   const [newUniqueTags, setNewUniqueTags] = useState<string[]>([]);

//   useEffect(() => {
//     if (!otherTabFilters) {
//       return;
//     }
//     const tagsArray : string[] = [];
//     const activeTab = getItem(LocalStorageKeys.homepage_activity_filter, null);
//     setActiveState(collapseState.length > 0 ? collapseState : DEFAULT_TAB_ARR);
//     getRecentActivityObjs(user.userId!, recent, addDangerToast, otherTabFilters)
//       .then(res => {
//           console.log("Response : ", res)
//             res.other.forEach((item: Item) => {
//               item.tags.forEach((tag: Tag) => {
//                 if (!tag.name.startsWith("owner:") && tag.name !== "type:dashboard" && !tag.name.startsWith("fav") {
//                   if (!tagsArray.includes(tag.name)) {
//                     tagsArray.push(tag.name);
//                   }
//                 }
//               });
//             });
//         setNewUniqueTags(tagsArray);
//         const data: ActivityData | null = {};
//         data[TableTab.Other] = res.other;
//         if (res.viewed) {
//           const filtered = reject(res.viewed, ['item_url', null]).map(r => r);
//           data[TableTab.Viewed] = filtered;
//           if (!activeTab && data[TableTab.Viewed]) {
//             setActiveChild(TableTab.Viewed);
//           } else if (!activeTab && !data[TableTab.Viewed]) {
//             setActiveChild(TableTab.Created);
//           } else setActiveChild(activeTab || TableTab.Created);
//         } else if (!activeTab) setActiveChild(TableTab.Created);
//         else setActiveChild(activeTab);
//         setActivityData(activityData => ({ ...activityData, ...data }));
//       })
//       .catch(
//         createErrorHandler((errMsg: unknown) => {
//           setActivityData(activityData => ({
//             ...activityData,
//             [TableTab.Viewed]: [],
//           }));
//           addDangerToast(
//             t('There was an issue fetching your recent activity: %s', errMsg),
//           );
//         }),
//       );

//     // Sets other activity data in parallel with recents api call
//     const ownSavedQueryFilters = [
//       {
//         col: 'created_by',
//         opr: 'rel_o_m',
//         value: `${id}`,
//       },
//     ];
//     Promise.all([
//       getUserOwnedObjects(id, 'dashboard')
//         .then(r => {
//           setDashboardData(r);
//           return Promise.resolve();
//         })
//         .catch((err: unknown) => {
//           setDashboardData([]);
//           addDangerToast(
//             t('There was an issue fetching your dashboards: %s', err),
//           );
//           return Promise.resolve();
//         }),
//       getUserOwnedObjects(id, 'chart')
//         .then(r => {
//           setChartData(r);
//           return Promise.resolve();
//         })
//         .catch((err: unknown) => {
//           setChartData([]);
//           addDangerToast(t('There was an issue fetching your chart: %s', err));
//           return Promise.resolve();
//         }),
//       canReadSavedQueries
//         ? getUserOwnedObjects(id, 'saved_query', ownSavedQueryFilters)
//             .then(r => {
//               setQueryData(r);
//               return Promise.resolve();
//             })
//             .catch((err: unknown) => {
//               setQueryData([]);
//               addDangerToast(
//                 t('There was an issue fetching your saved queries: %s', err),
//               );
//               return Promise.resolve();
//             })
//         : Promise.resolve(),
//     ]).then(() => {
//       setIsFetchingActivityData(false);
//     });
//   }, [otherTabFilters]);

//   const handleToggle = () => {
//     setChecked(!checked);
//     dangerouslySetItemDoNotUse(id, { thumbnails: !checked });
//   };

//   useEffect(() => {
//     if (!collapseState && queryData?.length) {
//       setActiveState(activeState => [...activeState, '4']);
//     }
//     setActivityData(activityData => ({
//       ...activityData,
//       Created: [
//         ...(chartData?.slice(0, 3) || []),
//         ...(dashboardData?.slice(0, 3) || []),
//         ...(queryData?.slice(0, 3) || []),
//       ],
//     }));
//   }, [chartData, queryData, dashboardData]);

//   useEffect(() => {
//     if (!collapseState && activityData?.[TableTab.Viewed]?.length) {
//       setActiveState(activeState => ['1', ...activeState]);
//     }
//   }, [activityData]);

//   const isRecentActivityLoading =
//     !activityData?.[TableTab.Other] && !activityData?.[TableTab.Viewed];

//   const menuData: SubMenuProps = {
//     activeChild: 'Home',
//     name: t('Dashboards'),
//   };

//   if (isThumbnailsEnabled) {
//     menuData.buttons = [
//       {
//         name: (
//           <WelcomeNav>
//             <div className="switch">
//               <AntdSwitch checked={checked} onClick={handleToggle} />
//               <span>{t('Thumbnails')}</span>
//             </div>
//           </WelcomeNav>
//         ),
//         onClick: handleToggle,
//         buttonStyle: 'link',
//       },
//     ];
//   }

//   return (
//     <>
//       <SubMenu {...menuData} />
//       <WelcomeContainer>
//         {(!WelcomeTopExtension || !WelcomeMainExtension) && (
//           <>
//             <Collapse
//               activeKey={activeState}
//               onChange={handleCollapse}
//               ghost
//               bigger
//             >
//                 {!dashboardData || isRecentActivityLoading ? (
//                   <LoadingCards cover={checked} />
//                 ) : (
//                   <DashboardTable
//                     user={user}
//                     mine={dashboardData}
//                     showThumbnails={checked}
//                     otherTabData={activityData?.[TableTab.Other]}
//                     otherTabFilters={otherTabFilters}
//                     otherTabTitle={otherTabTitle}
//                   />
//                 )}
//             </Collapse>
//           </>
//         )}
//       </WelcomeContainer>
//     </>
//   );
// }

// export default withToasts(Welcome);






// import React, { useEffect, useMemo, useState } from 'react';
// // @ts-ignore
// import { getExtensionsRegistry, JsonObject, styled, t, ensureIsArray, FeatureFlag } from '@superset-ui/core';
// import rison from 'rison';
// import Collapse from 'src/components/Collapse';
// import { User } from 'src/types/bootstrapTypes';
// import { reject } from 'lodash';
// import { getItem, LocalStorageKeys, setItem,} from 'src/utils/localStorageHelpers';
// // @ts-ignore
// import ListViewCard from 'src/components/ListViewCard';
// import withToasts from 'src/components/MessageToasts/withToasts';
// // @ts-ignore
// import { CardContainer, createErrorHandler, getRecentActivityObjs, getUserOwnedObjects, loadingCardCount, mq, } from 'src/views/CRUD/utils';
// import getBootstrapData from 'src/utils/getBootstrapData';
// import { TableTab } from 'src/views/CRUD/types';
// import SubMenu, { SubMenuProps } from 'src/features/home/SubMenu';
// import { canUserAccessSqlLab } from 'src/dashboard/util/permissionUtils';
// import { WelcomePageLastTab } from 'src/features/home/types';
// import AllEntitiesTable from 'src/features/allEntities/AllEntitiesTable';
// import AsyncSelect from 'src/components/Select/AsyncSelect';
// import { SelectValue } from 'antd/lib/select';
// import { loadTags } from 'src/components/Tags/utils';
// import { getValue } from 'src/components/Select/utils';
// import { StringParam, useQueryParam } from 'use-query-params';
//
// const extensionsRegistry = getExtensionsRegistry();
// interface WelcomeProps {
//   user: User;
//   addDangerToast: (arg0: string) => void;
// }
// export interface ActivityData {
//   [TableTab.Created]?: JsonObject[];
//   [TableTab.Edited]?: JsonObject[];
//   [TableTab.Viewed]?: JsonObject[];
//   [TableTab.Other]?: JsonObject[];
// }
// // @ts-ignore
// interface LoadingProps {
//   cover?: boolean;
// }
// const DEFAULT_TAB_ARR = ['2', '3'];
// const WelcomeContainer = styled.div`
//   background-color: #f0f0f0;
//   .ant-row.menu {
//     margin-top: 20px;
//     background-color: ${({ theme }) => theme.colors.grayscale.light4};
//     &:after {
//       content: '';
//       display: block;
//       border: 1px solid ${({ theme }) => theme.colors.grayscale.light2};
//       margin: 0px ${({ theme }) => theme.gridUnit * 6}px;
//       position: relative;
//       width: 100%;
//       ${mq[1]} {
//         margin-top: 5px;
//         margin: 0px 2px;
//       }
//     }
//     .ant-menu.ant-menu-light.ant-menu-root.ant-menu-horizontal {
//       padding-left: ${({ theme }) => theme.gridUnit * 8}px;
//     }
//     button {
//       padding: 3px 21px;
//     }
//   }
//   .ant-card-meta-description {
//     margin-top: ${({ theme }) => theme.gridUnit}px;
//   }
//   .ant-card.ant-card-bordered {
//     border: 10px solid ${({ theme }) => theme.colors.grayscale.light1};
//   }
//   .ant-collapse-item .ant-collapse-content {
//     margin-bottom: ${({ theme }) => theme.gridUnit * -6}px;
//   }
//   div.ant-collapse-item:last-child.ant-collapse-item-active
//     .ant-collapse-header {
//     padding-bottom: ${({ theme }) => theme.gridUnit * 3}px;
//   }
//   div.ant-collapse-item:last-child .ant-collapse-header {
//     padding-bottom: ${({ theme }) => theme.gridUnit * 9}px;
//   }
//   .loading-cards {
//     margin-top: ${({ theme }) => theme.gridUnit * 8}px;
//     .ant-card-cover > div {
//       height: 168px;
//     }
//   }
// `;
//
// const AllEntitiesContainer = styled.div`
//   ${({ theme }) => `
//   background-color: #f0f0f0;
//   .select-control {
//     margin-left: ${theme.gridUnit * 4}px;
//     margin-right: ${theme.gridUnit * 4}px;
//     margin-bottom: ${theme.gridUnit * 2}px;
//   }
//   .select-control-label {
//     text-transform: uppercase;
//     font-size: ${theme.gridUnit * 3}px;
//     color: ${theme.colors.grayscale.base};
//     margin-bottom: ${theme.gridUnit * 1}px;
//     background-color: #f0f0f0;
//   }`}
// `;
//
// interface Tag {
//   id: number;
//   name: string;
//   type: number;
// }
// interface Item {
//   tags: Tag[];
// }
// interface ViewedItem {
//   item_url: string | null;
// }
// interface ResponseType {
//   other: Item[];
//   viewed?: ViewedItem[];
// }
// const bootstrapData = getBootstrapData();
//
// function Welcome({ user, addDangerToast }: WelcomeProps) {
//   const [tagsQuery, setTagsQuery] = useQueryParam('tags', StringParam);
//   const onTagSearchChange = (value: SelectValue) => {
//     const tags = ensureIsArray(value).map(tag => getValue(tag));
//     const tagSearch = tags.join(',');
//     setTagsQuery(tagSearch);
//   };
//   const tagsValue = useMemo(
//     () =>
//       tagsQuery
//         ? tagsQuery.split(',').map(tag => ({ value: tag, label: tag }))
//         : [],
//     [tagsQuery],
//   );
//   const canAccessSqlLab = canUserAccessSqlLab(user);
//   const userid = user.userId;
//   const id = userid!.toString(); // confident that user is not a guest user
//   const params = rison.encode({ page_size: 50000 });
//   const recent = `/api/v1/log/recent_activity/${user.userId}/?q=${params}`;
//   // @ts-ignore
//   const [activeChild, setActiveChild] = useState('Loading');
//   const [activityData, setActivityData] = useState<ActivityData | null>(null);
//   const [chartData, setChartData] = useState<Array<object> | null>(null);
//   const [queryData, setQueryData] = useState<Array<object> | null>(null);
//   const [dashboardData, setDashboardData] = useState<Array<object> | null>(
//     null,
//   );
//   // @ts-ignore
//   const [isFetchingActivityData, setIsFetchingActivityData] = useState(true);
//   const collapseState = getItem(LocalStorageKeys.homepage_collapse_state, []);
//   // @ts-ignore
//   const [activeState, setActiveState] = useState<Array<string>>(collapseState);
//   const handleCollapse = (state: Array<string>) => {
//     setActiveState(state);
//     setItem(LocalStorageKeys.homepage_collapse_state, state);
//   };
//   const WelcomeMessageExtension = extensionsRegistry.get('welcome.message');
//   const WelcomeTopExtension = extensionsRegistry.get('welcome.banner');
//   const WelcomeMainExtension = extensionsRegistry.get(
//     'welcome.main.replacement',
//   );
//   // @ts-ignore
//   const [otherTabTitle, otherTabFilters] = useMemo(() => {
//     const lastTab = bootstrapData.common?.conf
//       .WELCOME_PAGE_LAST_TAB as WelcomePageLastTab;
//     const [customTitle, customFilter] = Array.isArray(lastTab)
//       ? lastTab
//       : [undefined, undefined];
//     if (customTitle && customFilter) {
//       return [t(customTitle), customFilter];
//     }
//     if (lastTab === 'all') {
//       return [t('All'), []];
//     }
//     return [
//       t('Examples'),
//       [
//         {
//           col: 'created_by',
//           opr: 'rel_o_m',
//           value: 0,
//         },
//       ],
//     ];
//   }, []);
//
//   const [newUniqueTags, setNewUniqueTags] = useState<string[]>([]);
//
//   useEffect(() => {
//     if (!otherTabFilters) {
//       return;
//     }
//     const tagsArray : string[] = [];
//
//     const activeTab = getItem(LocalStorageKeys.homepage_activity_filter, null);
//         setActiveState(collapseState.length > 0 ? collapseState : DEFAULT_TAB_ARR);
//         getRecentActivityObjs(user.userId!, recent, addDangerToast, otherTabFilters)
//           .then((res: ResponseType) => {
//             console.log("Response : ", res)
//             res.other.forEach((item: Item) => {
//               item.tags.forEach((tag: Tag) => {
//                 if (!tag.name.startsWith("owner:") && tag.name !== "type:dashboard" && !tag.name.startsWith("fav") {
//                   if (!tagsArray.includes(tag.name)) {
//                     tagsArray.push(tag.name);
//                   }
//                 }
//               });
//             });
//         setNewUniqueTags(tagsArray);
//         const data: ActivityData | null = {};
//         data[TableTab.Other] = res.other;
//         if (res.viewed) {
//           const filtered = reject(res.viewed, ['item_url', null]).map(r => r);
//           data[TableTab.Viewed] = filtered;
//           if (!activeTab && data[TableTab.Viewed]) {
//             setActiveChild(TableTab.Viewed);
//           } else if (!activeTab && !data[TableTab.Viewed]) {
//             setActiveChild(TableTab.Created);
//           } else {
//             setActiveChild(activeTab || TableTab.Created);
//           }
//         } else if (!activeTab) {
//           setActiveChild(TableTab.Created);
//         } else {
//           setActiveChild(activeTab);
//         }
//         setActivityData(activityData => ({ ...activityData, ...data }));
//       })
//       .catch(
//         createErrorHandler((errMsg: unknown) => {
//           setActivityData(activityData => ({
//             ...activityData,
//             [TableTab.Viewed]: [],
//           }));
//           addDangerToast(
//             t('There was an issue fetching your recent activity: %s', errMsg),
//           );
//         }),
//       );
//
//     const ownSavedQueryFilters = [
//       {
//         col: 'created_by',
//         opr: 'rel_o_m',
//         value: `${id}`,
//       },
//     ];
//     Promise.all([
//       getUserOwnedObjects(id, 'dashboard')
//         .then(r => {
//           setDashboardData(r);
//           return Promise.resolve();
//         })
//         .catch((err: unknown) => {
//           setDashboardData([]);
//           addDangerToast(
//             t('There was an issue fetching your dashboards: %s', err),
//           );
//           return Promise.resolve();
//         }),
//       getUserOwnedObjects(id, 'chart')
//         .then(r => {
//           setChartData(r);
//           return Promise.resolve();
//         })
//         .catch((err: unknown) => {
//           setChartData([]);
//           addDangerToast(t('There was an issue fetching your chart: %s', err));
//           return Promise.resolve();
//         }),
//       canAccessSqlLab
//         ? getUserOwnedObjects(id, 'saved_query', ownSavedQueryFilters)
//             .then(r => {
//               setQueryData(r);
//               return Promise.resolve();
//             })
//             .catch((err: unknown) => {
//               setQueryData([]);
//               addDangerToast(
//                 t('There was an issue fetching your saved queries: %s', err),
//               );
//               return Promise.resolve();
//             })
//         : Promise.resolve(),
//     ]).then(() => {
//       setIsFetchingActivityData(false);
//     });
//   }, [otherTabFilters]);
//
//   useEffect(() => {
//     if (!collapseState && queryData?.length) {
//       setActiveState(activeState => [...activeState, '4']);
//     }
//     setActivityData(activityData => ({
//       ...activityData,
//       Created: [
//         ...(chartData?.slice(0, 3) || []),
//         ...(dashboardData?.slice(0, 3) || []),
//         ...(queryData?.slice(0, 3) || []),
//       ],
//     }));
//   }, [chartData, queryData, dashboardData]);
//
//   useEffect(() => {
//     if (!collapseState && activityData?.[TableTab.Viewed]?.length) {
//       setActiveState(activeState => ['1', ...activeState]);
//     }
//   }, [activityData]);
//
//   const menuData: SubMenuProps = {
//     activeChild: 'Home',
//     name: t('Recently Added Dashboard Folders'),
//   };
//
//    return (
//     <>
//       <SubMenu {...menuData} />
//       <WelcomeContainer>
//       <AllEntitiesContainer>
//       <div className="select-control">
//         <div className="select-control-label">{t('search dashboards by folder name')}</div>
//         <AsyncSelect
//           ariaLabel="tags"
//           value={tagsValue}
//           onChange={onTagSearchChange}
//           options={loadTags}
//           placeholder="Select"
//           isClearable={true}
//         />
//       </div>
//       <AllEntitiesTable search={tagsQuery || ''} />
//     </AllEntitiesContainer>
//         {WelcomeMessageExtension && <WelcomeMessageExtension />}
//         {WelcomeTopExtension && <WelcomeTopExtension />}
//         {WelcomeMainExtension && <WelcomeMainExtension />}
//         {(!WelcomeTopExtension || !WelcomeMainExtension) && (
//           <>
//             <Collapse
//             onChange={handleCollapse}
//             ghost
//             bigger>
//             {newUniqueTags.map((tag, index) => (
//             <Collapse.Panel header={t(tag ?? `Loading Folder......`)} key={index.toString()}>
//             {tag && <AllEntitiesTable search={tag} />}
//             </Collapse.Panel>
//           ))}
//           </Collapse>
//           </>
//           )}
//       </WelcomeContainer>
//     </>
//   );
// }
//
// export default withToasts(Welcome);


// import React, { useEffect, useState } from 'react';
// import shortid from 'shortid';


// function App() {
//   const [dashboards, setDashboards] = useState([]);

//   useEffect(() => {
//     // Code to execute when the component is mounted

//     const cid = shortid.generate();
//     const postPayload = {
//       client_id: cid,
//       database_id: 2,
//       json: true,
//       runAsync: false,
//       schema: "softroniclabs_db",
//       sql: `SELECT * FROM folder_bin;`,
//       sql_editor_id: "6",
//       tab: "Folder_bin",
//       tmp_table_name: "",
//       select_as_cta: false,
//       ctas_method: "TABLE",
//       queryLimit: 1000,
//       expand_data: true
//     };

//     // Fetch data from '/api/v1/sqllab/execute/' and update state
//     fetch('/api/v1/sqllab/execute/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(postPayload)
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Log the received data to understand its format
//         console.log('Response from API:', data);
//       })
//       .catch(error => console.error('Error fetching data:', error));

//     // Fetch data from '/api/v1/dashboard/' and update state
//     fetch('/api/v1/dashboard/')
//     .then(response => response.json())
//     .then(data => {
//       // Log the received data to understand its format
//       console.log('Response from Dashboard API:', data);

//       // Set the dashboard data in the state
//       setDashboards(data.result);
//     })
//     .catch(error => console.error('Error fetching dashboards:', error));
// }, []); // The empty dependency array ensures this effect runs only once, when the component mounts

//   return (
//     <div>
//       <h1>Hello, React with TypeScript!</h1>
//       {/* Render the fetched dashboards data */}
//       <ul>
//         {dashboards.map((dashboard, index) => (
//           <li key={index}>{dashboard.dashboard_title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import shortid from 'shortid';

// function App() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Code to execute when the component is mounted

//     const cid = shortid.generate();
//     const postPayload = {
//       client_id: cid,
//       database_id: 2,
//       json: true,
//       runAsync: false,
//       schema: "softroniclabs_db",
//       sql: `SELECT * FROM folder_bin;`,
//       sql_editor_id: "6",
//       tab: "Folder_bin",
//       tmp_table_name: "",
//       select_as_cta: false,
//       ctas_method: "TABLE",
//       queryLimit: 1000,
//       expand_data: true
//     };

//     // Fetch data from '/api/v1/sqllab/execute/' and update state
//     fetch('/api/v1/sqllab/execute/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(postPayload),
//     })
//       .then((response) => response.json())
//       .then((sqlData) => {
//         // Log the received data to understand its format
//         console.log('Response from SQL API:', sqlData);

//         // Fetch data from '/api/v1/dashboard/' and update state
//         fetch('/api/v1/dashboard/')
//           .then((response) => response.json())
//           .then((dashboardData) => {
//             // Log the received data to understand its format
//             console.log('Response from Dashboard API:', dashboardData);

//             // Merge data based on 'id' and build the tree structure
//             const mergedData = mergeData(sqlData.data, dashboardData.result);

//             // Set the merged data in the state
//             setCategories(mergedData);
//           })
//           .catch((error) => console.error('Error fetching dashboards:', error));
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   // Function to merge data based on 'id'
//   const mergeData = (sqlData, dashboardData) => {
//     const mergedData = [];

//     sqlData.forEach((sqlItem) => {
//       const matchingDashboard = dashboardData.find(
//         (dashboardItem) => dashboardItem.id === sqlItem.id
//       );

//       if (matchingDashboard) {
//         const categoryIndex = mergedData.findIndex(
//           (category) => category.category_name === sqlItem.category_name
//         );

//         if (categoryIndex === -1) {
//           // Create a new category if it doesn't exist
//           mergedData.push({
//             category_name: sqlItem.category_name,
//             dashboards: [matchingDashboard.dashboard_title],
//           });
//         } else {
//           // Add the dashboard to the existing category
//           mergedData[categoryIndex].dashboards.push(
//             matchingDashboard.dashboard_title
//           );
//         }
//       }
//     });

//     return mergedData;
//   };

//   // Function to render the tree structure
//   const renderTree = (data) => (
//     <ul>
//       {data.map((category) => (
//         <li key={category.category_name}>
//           {category.category_name}
//           {category.dashboards.length > 0 && (
//             <ul>
//               {category.dashboards.map((dashboard) => (
//                 <li key={dashboard}>{dashboard}</li>
//               ))}
//             </ul>
//           )}
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <div>
//       <h1>Categories</h1>
//       {/* Render the tree structure */}
//       {renderTree(categories)}
//     </div>
//   );
// }

// export default App;



// import React, { useEffect, useState } from 'react';
// import shortid from 'shortid';
//
// function App() {
//   const [categories, setCategories] = useState([]);
//
//   useEffect(() => {
//     // Code to execute when the component is mounted
//
//     const cid = shortid.generate();
//     const postPayload = {
//       client_id: cid,
//       database_id: 2,
//       json: true,
//       runAsync: false,
//       schema: "softroniclabs_db",
//       sql: `SELECT * FROM folder_bin;`,
//       sql_editor_id: "6",
//       tab: "Folder_bin",
//       tmp_table_name: "",
//       select_as_cta: false,
//       ctas_method: "TABLE",
//       queryLimit: 1000,
//       expand_data: true
//     };
//
//     // Fetch data from '/api/v1/sqllab/execute/' and update state
//     fetch('/api/v1/sqllab/execute/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(postPayload),
//     })
//       .then((response) => response.json())
//       .then((sqlData) => {
//         // Log the received data to understand its format
//         console.log('Response from SQL API:', sqlData);
//
//         // Fetch data from '/api/v1/dashboard/' and update state
//         fetch('/api/v1/dashboard/')
//           .then((response) => response.json())
//           .then((dashboardData) => {
//             // Log the received data to understand its format
//             console.log('Response from Dashboard API:', dashboardData);
//
//             // Merge data based on 'id' and build the tree structure with URLs
//             const mergedData = mergeData(sqlData.data, dashboardData.result);
//
//             // Set the merged data in the state
//             setCategories(mergedData);
//           })
//           .catch((error) => console.error('Error fetching dashboards:', error));
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);
//
//   // Function to merge data based on 'id' and include dashboard URLs
//   const mergeData = (sqlData, dashboardData) => {
//     const mergedData = [];
//
//     sqlData.forEach((sqlItem) => {
//       const matchingDashboard = dashboardData.find(
//         (dashboardItem) => dashboardItem.id === sqlItem.id
//       );
//
//       if (matchingDashboard) {
//         const categoryIndex = mergedData.findIndex(
//           (category) => category.category_name === sqlItem.category_name
//         );
//
//         if (categoryIndex === -1) {
//           // Create a new category if it doesn't exist
//           mergedData.push({
//             category_name: sqlItem.category_name,
//             dashboards: [
//               {
//                 title: matchingDashboard.dashboard_title,
//                 url: matchingDashboard.url, // Include the dashboard URL
//               },
//             ],
//           });
//         } else {
//           // Add the dashboard to the existing category
//           mergedData[categoryIndex].dashboards.push({
//             title: matchingDashboard.dashboard_title,
//             url: matchingDashboard.url, // Include the dashboard URL
//           });
//         }
//       }
//     });
//
//     return mergedData;
//   };
//
//   // Function to handle navigation when a dashboard link is clicked
//   const handleDashboardClick = (url) => {
//     window.location.href = url; // Navigate to the dashboard URL
//   };
//
//   // Function to render the tree structure with clickable links
//   const renderTree = (data) => (
//     <ul>
//       {data.map((category) => (
//         <li key={category.category_name}>
//           {category.category_name}
//           {category.dashboards.length > 0 && (
//             <ul>
//               {category.dashboards.map((dashboard) => (
//                 <li key={dashboard.title}>
//                   <a
//                     href={dashboard.url}
//                     onClick={(e) => {
//                       e.preventDefault(); // Prevent the default link behavior
//                       handleDashboardClick(dashboard.url); // Handle the click event
//                     }}
//                   >
//                     {dashboard.title}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
//
//   return (
//     <div>
//       <h1>Categories</h1>
//       {/* Render the tree structure */}
//       {renderTree(categories)}
//     </div>
//   );
// }
//
// export default App;


// import React, { useEffect, useState } from 'react';
// import shortid from 'shortid';
// import styled from 'styled-components';
//
// const TreeContainer = styled.div`
//   font-family: Arial, sans-serif;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//
//   h2 {
//   font-size: 24px;
//   color: #333;
//   margin-bottom: 16px;
//   }
//
//
//   ul {
//     list-style: none;
//     padding-left: 20px;
//   }
//
//   li {
//     margin-bottom: 8px;
//
//     a {
//       text-decoration: none;
//       color: #007bff;
//       cursor: pointer;
//
//       &:hover {
//         text-decoration: underline;
//       }
//     }
//   }
// `;
//
// const Dropdown = styled.div`
//   cursor: pointer;
//
//   &:before {
//     content: '▶';
//     display: inline-block;
//     margin-right: 5px;
//   }
//
//   &.open:before {
//     content: '▼';
//   }
// `;
//
// function App() {
//   const [categories, setCategories] = useState([]);
//   const [openCategory, setOpenCategory] = useState('');
//
//   useEffect(() => {
//     // Code to execute when the component is mounted
//
//     const cid = shortid.generate();
//     const postPayload = {
//       client_id: cid,
//       database_id: 2,
//       json: true,
//       runAsync: false,
//       schema: 'softroniclabs_db',
//       sql: `SELECT * FROM folder_bin;`,
//       sql_editor_id: '6',
//       tab: 'Folder_bin',
//       tmp_table_name: '',
//       select_as_cta: false,
//       ctas_method: 'TABLE',
//       queryLimit: 1000,
//       expand_data: true,
//     };
//
//     // Fetch data from '/api/v1/sqllab/execute/' and update state
//     fetch('/api/v1/sqllab/execute/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(postPayload),
//     })
//       .then((response) => response.json())
//       .then((sqlData) => {
//         // Log the received data to understand its format
//         console.log('Response from SQL API:', sqlData);
//
//         // Fetch data from '/api/v1/dashboard/' and update state
//         fetch('/api/v1/dashboard/')
//           .then((response) => response.json())
//           .then((dashboardData) => {
//             // Log the received data to understand its format
//             console.log('Response from Dashboard API:', dashboardData);
//
//             // Merge data based on 'id' and build the tree structure with URLs
//             const mergedData = mergeData(sqlData.data, dashboardData.result);
//
//             // Set the merged data in the state
//             setCategories(mergedData);
//           })
//           .catch((error) => console.error('Error fetching dashboards:', error));
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);
//
//   // Function to merge data based on 'id' and include dashboard URLs
//   const mergeData = (sqlData, dashboardData) => {
//     const mergedData = [];
//
//     sqlData.forEach((sqlItem) => {
//       const matchingDashboard = dashboardData.find(
//         (dashboardItem) => dashboardItem.id === sqlItem.id
//       );
//
//       if (matchingDashboard) {
//         const categoryIndex = mergedData.findIndex(
//           (category) => category.category_name === sqlItem.category_name
//         );
//
//         if (categoryIndex === -1) {
//           // Create a new category if it doesn't exist
//           mergedData.push({
//             category_name: sqlItem.category_name,
//             dashboards: [
//               {
//                 title: matchingDashboard.dashboard_title,
//                 url: matchingDashboard.url, // Include the dashboard URL
//               },
//             ],
//           });
//         } else {
//           // Add the dashboard to the existing category
//           mergedData[categoryIndex].dashboards.push({
//             title: matchingDashboard.dashboard_title,
//             url: matchingDashboard.url, // Include the dashboard URL
//           });
//         }
//       }
//     });
//
//     return mergedData;
//   };
//
//   // Function to handle navigation when a dashboard link is clicked
//   const handleDashboardClick = (url) => {
//     window.location.href = url; // Navigate to the dashboard URL
//   };
//
//   // Function to toggle the dropdown for a category
//   const toggleCategory = (categoryName) => {
//     if (openCategory === categoryName) {
//       setOpenCategory('');
//     } else {
//       setOpenCategory(categoryName);
//     }
//   };
//
//   // Function to render the tree structure with clickable links and dropdowns
//   const renderTree = (data) => (
//     <TreeContainer>
//       <h2>Categories</h2>
//       <ul>
//         {data.map((category) => (
//           <li key={category.category_name}>
//             <Dropdown
//               onClick={() => toggleCategory(category.category_name)}
//               className={openCategory === category.category_name ? 'open' : ''}
//             >
//               {category.category_name}
//             </Dropdown>
//             {category.dashboards.length > 0 && openCategory === category.category_name && (
//               <ul>
//                 {category.dashboards.map((dashboard) => (
//                   <li key={dashboard.title}>
//                     <a
//                       href={dashboard.url}
//                       onClick={(e) => {
//                         e.preventDefault(); // Prevent the default link behavior
//                         handleDashboardClick(dashboard.url); // Handle the click event
//                       }}
//                     >
//                       {dashboard.title}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </TreeContainer>
//   );
//
//   return (
//     <div>
//       {/* Render the tree structure */}
//       {renderTree(categories)}
//     </div>
//   );
// }
//
// export default App;



// import React, { useEffect, useState } from 'react';
// import shortid from 'shortid';
// import styled from 'styled-components';
//
//
// const Heading = styled.h2`
//   font-size: 28px;
//   color: #808080;
//   margin-bottom: 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
//
//
// const List = styled.ul`
//   list-style: none;
//   padding-left: 30px;
//   color: #333;
// `;
//
// const ListItem = styled.li`
//   margin-bottom: 10px;
//   color: #333; // Dark grey for text
//   font-size: 16px; // Slightly larger font size for readability
//
//   // If you want to style list items differently based on their level, you can add more specific styles here
// `;
//
//
//
// const Link = styled.a`
//   text-decoration: none;
//   color: #0056b3; // Blue color for the dashboard links
//   cursor: pointer;
//   transition: color 0.3s;
//
//   &:hover {
//     color: #003880; // Darker blue on hover
//     text-decoration: underline;
//   }
// `;
//
//
//
// const Dropdown = styled.div`
//   cursor: pointer;
//   user-select: none;
//   font-weight: bold;
//   color: #000000; // Green color for the category names
//   margin-bottom: 5px;
//   font-size: 20px;
//
//   &:before {
//     content: '▶';
//     display: inline-block;
//     margin-right: 5px;
//     transition: transform 0.3s;
//     color: #808080; // Slightly different green for the arrow
//   }
//
//   &.open:before {
//     content: '▼';
//     transform: rotate(90deg);
//   }
// `;
//
//
//
// function App() {
//   const [categories, setCategories] = useState([]);
//   const [openCategory, setOpenCategory] = useState('');
//
//   useEffect(() => {
//     // Code to execute when the component is mounted
//
//     const cid = shortid.generate();
//     const postPayload = {
//       client_id: cid,
//       database_id: 2,
//       json: true,
//       runAsync: false,
//       schema: 'softroniclabs_db',
//       sql: `SELECT * FROM folder_bin;`,
//       sql_editor_id: '6',
//       tab: 'Folder_bin',
//       tmp_table_name: '',
//       select_as_cta: false,
//       ctas_method: 'TABLE',
//       queryLimit: 1000,
//       expand_data: true,
//     };
//
//     // Fetch data from '/api/v1/sqllab/execute/' and update state
//     fetch('/api/v1/sqllab/execute/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(postPayload),
//     })
//       .then((response) => response.json())
//       .then((sqlData) => {
//         // Log the received data to understand its format
//         console.log('Response from SQL API:', sqlData);
//
//         // Fetch data from '/api/v1/dashboard/' and update state
//         fetch('/api/v1/dashboard/')
//           .then((response) => response.json())
//           .then((dashboardData) => {
//             // Log the received data to understand its format
//             console.log('Response from Dashboard API:', dashboardData);
//
//             // Merge data based on 'id' and build the tree structure with URLs
//             const mergedData = mergeData(sqlData.data, dashboardData.result);
//
//             // Set the merged data in the state
//             setCategories(mergedData);
//           })
//           .catch((error) => console.error('Error fetching dashboards:', error));
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);
//
//   // Function to merge data based on 'id' and include dashboard URLs
//   const mergeData = (sqlData, dashboardData) => {
//     const mergedData = [];
//
//     sqlData.forEach((sqlItem) => {
//       const matchingDashboard = dashboardData.find(
//         (dashboardItem) => dashboardItem.id === sqlItem.id
//       );
//
//       if (matchingDashboard) {
//         const categoryIndex = mergedData.findIndex(
//           (category) => category.category_name === sqlItem.category_name
//         );
//
//         if (categoryIndex === -1) {
//           // Create a new category if it doesn't exist
//           mergedData.push({
//             category_name: sqlItem.category_name,
//             dashboards: [
//               {
//                 title: matchingDashboard.dashboard_title,
//                 url: matchingDashboard.url, // Include the dashboard URL
//               },
//             ],
//           });
//         } else {
//           // Add the dashboard to the existing category
//           mergedData[categoryIndex].dashboards.push({
//             title: matchingDashboard.dashboard_title,
//             url: matchingDashboard.url, // Include the dashboard URL
//           });
//         }
//       }
//     });
//
//     return mergedData;
//   };
//
//   // Function to handle navigation when a dashboard link is clicked
//   const handleDashboardClick = (url) => {
//     window.location.href = url; // Navigate to the dashboard URL
//   };
//
//   // Function to toggle the dropdown for a category
//   const toggleCategory = (categoryName) => {
//     if (openCategory === categoryName) {
//       setOpenCategory('');
//     } else {
//       setOpenCategory(categoryName);
//     }
//   };
//
//   // Function to render the tree structure with clickable links and dropdowns
//   const renderTree = (data) => (
//       <List>
//         {data.map((category) => (
//           <ListItem key={category.category_name}>
//             <Dropdown
//               onClick={() => toggleCategory(category.category_name)}
//               className={openCategory === category.category_name ? 'open' : ''}
//             >
//               {category.category_name}
//             </Dropdown>
//             {category.dashboards.length > 0 && openCategory === category.category_name && (
//               <ul>
//                 {category.dashboards.map((dashboard) => (
//                   <ListItem key={dashboard.title}>
//                     <Link
//                       href={dashboard.url}
//                       onClick={(e) => {
//                         e.preventDefault(); // Prevent the default link behavior
//                         handleDashboardClick(dashboard.url); // Handle the click event
//                       }}
//                     >
//                       {dashboard.title}
//                     </Link>
//                   </ListItem>
//                 ))}
//               </ul>
//             )}
//           </ListItem>
//         ))}
//       </List>
//   );
//
//   return (
//     <div>
//     <Heading>Categories</Heading>
//       {renderTree(categories)}
//     </div>
//   );
// }
//
// export default App;


import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';


const List = styled.ul`
  list-style: none;
  padding-left: 0;
  color: #333;
`;

const ListItem = styled.li`
  margin-bottom: 15px;
`;

const CategoryBlock = styled.div`
  background-color: #e0e0e0;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: #000000;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 15px;
  margin-right: 15px;

  &:hover {
    background-color: #d5d5d5;
  }

  &:before {
    content: '${({ isOpen }) => (isOpen ? '▼' : '▶')}';
    display: inline-block;
    margin-right: 10px;
    transition: transform 0.3s;
    font-size: 14px;
  }
`;

const DashboardList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const DashboardItem = styled.li`
  background-color: #f0f0f0;
  margin-bottom: 8px;
  padding: 10px; // Reduced padding
  border-radius: 5px;
  font-size: 14px; // Slightly smaller font size
  list-style: inside; // Use default list styling for bullets
  border: 1px solid black; // Add a black border
  margin-left: 40px;

  width: 850px; // Set a specific width
  max-width: 100%; // Ensure it doesn't exceed the width of its container
  box-sizing: border-box; // Include padding and border in the width calculation

  &:hover {
    background-color: #e5e5e5;
  }
`;


const StyledLink = styled.a`
  text-decoration: none;
  color: #0056b3;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #003880;
    text-decoration: underline;
  }
`;

function App() {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState('');
  const handleDashboardClick = (url) => {
    window.location.href = url;
  };

  useEffect(() => {
    const cid = shortid.generate();


    const mergeData = (sqlData, dashboardData) => {
    const mergedData = [];

    sqlData.forEach((sqlItem) => {
      const matchingDashboard = dashboardData.find(
        (dashboardItem) => dashboardItem.id === sqlItem.id
      );

      if (matchingDashboard) {
        const categoryIndex = mergedData.findIndex(
          (category) => category.category_name === sqlItem.category_name
        );

        if (categoryIndex === -1) {
          mergedData.push({
            category_name: sqlItem.category_name,
            dashboards: [
              {
                title: matchingDashboard.dashboard_title,
                url: matchingDashboard.url,
              },
            ],
          });
        } else {
          mergedData[categoryIndex].dashboards.push({
            title: matchingDashboard.dashboard_title,
            url: matchingDashboard.url,
          });
        }
      }
    });

    return mergedData;
  };

    const postPayload = {
      client_id: cid,
      database_id: 1,
      json: true,
      runAsync: false,
      schema: 'softroniclabs_db',
      sql: `SELECT * FROM folder_bin;`,
      sql_editor_id: '1',
      tab: 'Folder_bin',
      tmp_table_name: '',
      select_as_cta: false,
      ctas_method: 'TABLE',
      queryLimit: 1000,
      expand_data: true,
    };

    fetch('/api/v1/sqllab/execute/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postPayload),
    })
      .then((response) => response.json())
      .then((sqlData) => {
        console.log('Response from SQL API:', sqlData);

        fetch('/api/v1/dashboard/')
          .then((response) => response.json())
          .then((dashboardData) => {
            console.log('Response from Dashboard API:', dashboardData);

            const mergedData = mergeData(sqlData.data, dashboardData.result);
            setCategories(mergedData);
          })
          .catch((error) => console.error('Error fetching dashboards:', error));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);



  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? '' : categoryName);
  };

  const renderTree = (data) => (
  <List>
    {data.map((category) => (
      <ListItem key={category.category_name}>
        <CategoryBlock
          isOpen={openCategory === category.category_name}
          onClick={() => toggleCategory(category.category_name)}
        >
          {category.category_name}
        </CategoryBlock>
        <DashboardList isOpen={openCategory === category.category_name}>
          {category.dashboards.map((dashboard) => (
            <DashboardItem key={dashboard.title}>
              <StyledLink
                href={dashboard.url}
                onClick={(e) => {
                  e.preventDefault();
                  handleDashboardClick(dashboard.url);
                }}
              >
                {dashboard.title}
              </StyledLink>
            </DashboardItem>
          ))}
        </DashboardList>
      </ListItem>
    ))}
  </List>
);



  return (
    <div>
      {renderTree(categories)}
    </div>
  );
}

export default App;
