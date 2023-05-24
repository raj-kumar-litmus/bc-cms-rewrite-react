import React, { useState, useEffect } from 'react';
import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import {workFlowsUrl} from '../constants/index';
import Pagination from './Pagination';
import AssigneEdit from '../logos/AssigneEdit.svg';
import Edit from '../logos/Edit.svg';
import ArrowSort from '../logos/ArrowSort.svg';
import MoreIcons from '../logos/MoreIcons.svg';
import FilterIcon from '../logos/Filter.svg';
import FilterIconBlack from '../logos/FilterIconBlack.svg';
import TableHeaders from './TableHeaders';



export default function Table({currentTab, setCustomers, customers, isAdmin, preText, nextText, currentPage, setCurrentPage}) {
    const [searchByStyle, setSearchByStyle] = useState('');
    const [searchByTitle, setSearchByTitle] = useState('');
    const [searchByStatus, setSearchByStatus] = useState([]);
    const [searchByAssignee, setSearchByAssignee] = useState('');
    const [searchByUpdatedBy, setsearchByUpdatedBy] = useState("");
    const [searchByUpdatedAt, setsearchByUpdatedAt] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [assigneeList, setAssignee] = useState([]);
    const [statuses, setStatus] = useState([]);
    const [showEdit, setShowEdit] = useState(null);
    const [styleSort, setStyleSort] = useState('desc');
    const [titleSort, setTitleSort] = useState('desc');
    const [brandSort, setBrandSort] = useState('desc');
    const [statusSort, setStatusSort] = useState('desc');
    const [updatedBySort, setUpdatedBySort] = useState('desc');
    const [updatedAtSort, setUpdatedAtSort] = useState('desc');
    const [assigneeSort, setAssigneeSort] = useState('desc');
    const [currentSort, setCurrentSort] = useState('');
    const [isRowSelected, setIsRowSelected] = useState(false);
    const [isStatusSelected, setIsStatusSelected] = useState(false);

    useEffect(() => {
            fetch(`${workFlowsUrl}/search?limit=10&page=${currentPage}&unique=brand`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(result => setBrands(result?.data?.uniqueValues.filter(Boolean).map(item=>({brand:item}))));

            fetch(`${workFlowsUrl}/search?limit=10&page=${currentPage}&unique=assignee`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(result => setAssignee(result?.data?.uniqueValues.filter(Boolean)));
            
            fetch(`${workFlowsUrl}/search?limit=10&page=${currentPage}&unique=status`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(result => setStatus(result?.data?.uniqueValues));
    }, [currentPage]);

     useEffect(() => {
        var date = new Date(searchByUpdatedAt);
        const newDate = date.toDateString().split(' ')
        const finalDate = `${newDate[3]}-${newDate[1]}-${newDate[2]}`
        const newSelectedBrand = selectedBrand.map(item => item.brand)
            const status = []
            switch(currentTab){
                case "Unassigned" :
                      status.push("WAITING_FOR_WRITER")
                case "Completed" :
                      status.push("WRITING_COMPLETE", "EDITING_COMPLETE")
                case "Assigned" :
                    status.push("ASSIGNED_TO_WRITER", "ASSIGNED_TO_EDITOR")
                case "InProgress" :
                    status.push("WRITING_IN_PROGRESS", "EDITING_IN_PROGRESS")
                default: status
            }

            const body = {
                "filters": {
                     ...(searchByStyle && {styleId:searchByStyle }),
                     ...(searchByTitle && {title:searchByTitle }),
                     ...(newSelectedBrand.length && {brand:newSelectedBrand }),
                     ...(searchByUpdatedBy && {lastUpdatedBy:searchByUpdatedBy }),
                     ...(searchByAssignee && {assignee:searchByAssignee }),
                     ...(searchByUpdatedAt && {lastUpdateTs:finalDate }),
                    "status": isStatusSelected ? [searchByStatus] : status
                },
                "orderBy": {
                    ...(currentSort == "styleSort" && {styleId:styleSort }),
                     ...(currentSort == "titleSort" && {title:titleSort }),
                     ...(currentSort == "brandSort" && {brand:brandSort }),
                     ...(currentSort == "updatedBySort" && {lastUpdatedBy:updatedBySort }),
                     ...(currentSort == "assigneeSort" && {lastUpdatedBy:assigneeSort }),
                     ...(currentSort == "statusSort" && {status:statusSort }),
                     ...(currentSort == "updatedAtSort" && {lastUpdateTs:updatedAtSort }),
                }
            }
        fetch(`${workFlowsUrl}/search?limit=10&page=${currentPage}`, {
            method: "POST",
            body:JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(result => setCustomers(result?.data));
     }, [searchByStyle, searchByTitle, selectedBrand, searchByStatus,searchByAssignee, searchByUpdatedBy,searchByUpdatedAt,styleSort,titleSort, brandSort, statusSort, updatedBySort,updatedAtSort,assigneeSort,currentTab, currentPage,isStatusSelected]);


     const handleStyleChanges = (e) => {
        setTimeout(()=>{setSearchByStyle(e.target.value)}, 1000)
    }

    const handleTitleChange = (e) => {
        setTimeout(()=>{setSearchByTitle(e.target.value)}, 2000)
    }

    const handleUpdatedByChange = (e) => {
        setTimeout(()=>{setsearchByUpdatedBy(e.target.value)}, 1000)
    }

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap justify-content-end gap-2">
                {selectedProducts.length>1 && 
                <button>
                    <span className='bg-white text-black rounded-full border h-8 w-8 px-1 py-1'><i className="pi pi-user-plus" /></span>
                    <span>Assign</span>
                </button>}
            </div>
        );
    };

    const representativesItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{option.brand}</span>
            </div>
        );
    };

    const statusItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{option}</span>
            </div>
        );
    };
   

    const handleBrands=(value)=>{
        setSelectedBrand(value)
    }

    const statusRowFilterTemplate = () => {
        return (<Dropdown style={{width:"100px"}} value={searchByStatus} options={statuses} onChange={handleStatus} itemTemplate={statusItemTemplate} placeholder="Status"/>);
    };

    const assigneeRowFilterTemplate = () => {
        return (<Dropdown style={{width:"120px"}} value={searchByAssignee}  options={assigneeList}   onChange={handleAssign} itemTemplate={statusItemTemplate} placeholder="Assignee"/>);
    };

    const handleAssign=(e)=>{
        setSearchByAssignee(e.target.value)
    }

    const handleStatus = (e) => {
        setIsStatusSelected(true)
        setSearchByStatus(e.target.value)
    }

    const titleRowFilterTemplate = () => {
        return (<span className="p-input-icon-left w-[100%] min-w-[80px]"><i className="pi pi-search" /><InputText onChange={handleTitleChange} /></span>);
    };

    const brandRowFilterTemplate = () => {
        return (
                <MultiSelect
                value={selectedBrand}
                options={brands}
                itemTemplate={representativesItemTemplate}
                onChange={(e) => handleBrands(e.value)}
                optionLabel="brand"
                placeholder="Brand"
                maxSelectedLabels={1}
                style={{width: "100px"}}
            />
        );
    };

    const updatedByFilterTemplate=()=>{
        return (
                <span className="p-input-icon-left w-[100%] min-w-[80px]">
                    <i className="pi pi-search" />
                    <InputText onChange={handleUpdatedByChange}/>
                </span>
        );
    }

    const styleRowFilterTemplate = () => {
        return (
                <span className="p-input-icon-left w-[100%] min-w-[80px]">
                    <i className="pi pi-search" />
                    <InputText  onChange={handleStyleChanges} />
                </span>
        );
    };

    const dateFilterTemplate = () => {
        return (
                <span className="p-input-icon-left w-[100%] min-w-[80px]">
                    <Calendar value={searchByUpdatedAt} onChange={handleCalanderChange} placeholder='dd/mm/yyy'/>
                </span>
        )
    };


    const handleCalanderChange = (e) => {
        setsearchByUpdatedAt(e.target.value)
    }

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.lastUpdateTs);
    };

    const formatDate = (value) => {
        var date = new Date(value);
        const newDate = date.toDateString().split(' ')
        const finalDate = `${newDate[0]} ${newDate[2]} ${newDate[1]}`
        return finalDate
    };

   const handleFilterIcon=()=>{
      return(
        <span>
            <button onClick={() => setShowFilters(!showFilters)}>
                 {!showFilters ? <div className="bg-black text-white text-sm rounded-full border h-8 w-8 flex justify-center items-center"> 
                     <img alt={`${FilterIcon} svg`} src={FilterIcon}/>
                 </div> :
                 <div className="bg-white text-black text-sm rounded-full border h-8 w-8 flex justify-center items-center"> 
                    <img alt={`${FilterIconBlack} svg`} src={FilterIconBlack}/>
                 </div>}
            </button>                
        </span> 
    )
}
    const handleAssigneeSort=()=>{
        setCurrentSort("assigneeSort")
        setAssigneeSort(assigneeSort == "desc" ? "asc" : "desc")
    }

    const handleUpdatedAtSort=()=>{
        setCurrentSort("updatedAtSort")
        setUpdatedAtSort(updatedAtSort == "desc" ? "asc" : "desc")
    }

    const handleUpdatedBySort=()=>{
        setCurrentSort("updatedBySort")
        setUpdatedBySort(updatedBySort == "desc" ? "asc" : "desc")
    }

    const handleStatusSort=()=>{
        setCurrentSort("statusSort")
        setStatusSort(statusSort == "desc" ? "asc" : "desc")
    }

    const handleBrandSort=()=>{
        setCurrentSort("brandSort")
        setBrandSort(brandSort == "desc" ? "asc" : "desc")
    }

    const handleTitleSort=()=>{
        setCurrentSort("titleSort")
        setTitleSort(titleSort == "desc" ? "asc" : "desc")
    }

    const handleStyleSort=()=>{
        setCurrentSort("styleSort")
        setStyleSort(styleSort == "desc" ? "asc" : "desc")
    }

    const handleRowSelectIcons=(rowData, imgPath)=>{
        return (
            <div className="flex justify-content-end">
                <span>
                {(rowData.id == showEdit && isRowSelected && isAdmin) && 
                   <span className='bg-white flex rounded-full justify-center items-center border border-grey-30  h-[30px] w-[30px]'>  
                     <img alt={`${imgPath} svg`} src={imgPath}  style={{ fontSize: '0.6rem', color: '#708090'}} onClick={handleEditIcon}/>
                    </span>
                }
                </span>
            </div>
        );
    }

    const handleEditIcon=()=>{
    // code for edit icon show go in this
    }

    const pagination=()=>{
        return(
           <Pagination customers={customers} preText={preText} nextText={nextText} currentPage={currentPage} setCurrentPage={setCurrentPage} className={"px-3 py-2 mr-2 leading-tight text-gray-500 bg-white"}/>
        )
    }

    const onSelectionChange = (event) => {
        const value = event.value;
        setSelectedProducts(value);
    };

    const onRowClick=(e)=>{
        // row click redirection code should go in this
    }

    const onRowSelect=(e)=>{
        setIsRowSelected(true)
        setShowEdit(e.data.id)
    }

    const onRowUnselect=()=>{
        setIsRowSelected(false)
    }

    return (
        <div className='border border-grey-30 text-sx'>
            <DataTable value={customers?.workflows} dataKey="id" rows={100} selection={selectedProducts} filterDisplay={showFilters && "row"} onRowMouseEnter={onRowSelect} onRowMouseLeave={onRowUnselect} header={ selectedProducts.length>1 && renderHeader} footer={pagination} onSelectionChange={onSelectionChange} emptyMessage="No customers found." onRowClick={onRowClick}>
                {isAdmin && <Column selectionMode="multiple" style={{width: "3%"}}></Column>}
                <Column field="styleId" header={<TableHeaders headerName={"Style"} sortIcon={ArrowSort} onClick={handleStyleSort}/>} filter showFilterMenu={false} filterElement={styleRowFilterTemplate} filterPlaceholder="Search by Style" style={{width: "5%"}}/>
                <Column field="title" header={<TableHeaders headerName={"Title"} sortIcon={ArrowSort} onClick={handleTitleSort}/>} filter filterElement={titleRowFilterTemplate} showFilterMenu={false} filterPlaceholder="Search by Title" style={{width: "22%"}}/>
                <Column header={<TableHeaders headerName={"Brand"} sortIcon={ArrowSort} onClick={handleBrandSort}/>} field="brand" showFilterMenu={false} filter filterElement={brandRowFilterTemplate} style={{width: "10%"}}/>
                {currentTab !== "Unassigned" && <Column field="status" header={<TableHeaders headerName={"Status"} sortIcon={ArrowSort} onClick={handleStatusSort}/>} showFilterMenu={false} filter filterElement={statusRowFilterTemplate} style={{width: "18%"}}/>}
                {(currentTab !== "Completed" && currentTab !== "Unassigned" && isAdmin)  && <Column field="assignee" header={<TableHeaders headerName={"Assignee"} sortIcon={ArrowSort} onClick={handleAssigneeSort}/>} showFilterMenu={false} filter filterElement={assigneeRowFilterTemplate} style={{width: "13%"}}/>}
                <Column field="lastUpdatedBy" header={<TableHeaders headerName={"Updated BY"} sortIcon={ArrowSort} onClick={handleUpdatedBySort}/>} filter showFilterMenu={false} filterElement={updatedByFilterTemplate} style={{width: "15%"}}/>
                <Column field="lastUpdateTs" header={<TableHeaders headerName={"Updated At"} sortIcon={ArrowSort} onClick={handleUpdatedAtSort}/>} dataType="date" filter showFilterMenu={false} body={dateBodyTemplate} filterElement={dateFilterTemplate} style={{width: "14%"}}/>
                <Column header={handleFilterIcon} style={{width: "0%"}}/>
                <Column body={(e)=>handleRowSelectIcons(e, Edit)} style={{width: "0%"}}/>
                <Column body={(e)=>handleRowSelectIcons(e, AssigneEdit)} style={{width: "0%"}} />
                <Column body={(e)=>handleRowSelectIcons(e, MoreIcons)} style={{width: "0%"}} />
              </DataTable>
           </div>
    );
}