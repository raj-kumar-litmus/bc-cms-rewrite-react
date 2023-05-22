import React, { useState, useEffect, useCallback } from 'react';
import "primereact/resources/themes/fluent-light/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeicons/primeicons.css';
import debounce from 'lodash.debounce'
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import {workFlowsUrl} from '../constants/index';
import Pagination from './Pagination';

export default function Table({currentTab, setCustomers, customers, isAdmin, preText, nextText, currentPage, setCurrentPage}) {
    const [loading, setLoading] = useState(false);
    const [searchByStyle, setSearchByStyle] = useState('');
    const [searchByTitle, setSearchByTitle] = useState('');
    const [searchByStatus, setSearchByStatus] = useState([]);
    const [searchByUpdatedBy, setsearchByUpdatedBy] = useState("");
    const [searchByUpdatedAt, setsearchByUpdatedAt] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [statuses, setStatus] = useState([]);
    const [showEdit, setShowEdit] = useState(null);
    const [styleSort, setStyleSort] = useState('desc');
    const [titleSort, setTitleSort] = useState('desc');
    const [brandSort, setBrandSort] = useState('desc');
    const [statusSort, setStatusSort] = useState('desc');
    const [updatedBySort, setUpdatedBySort] = useState('desc');
    const [updatedAtSort, setUpdatedAtSort] = useState('desc');
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
            .then(result => setBrands(result?.data?.uniqueValues.filter(item=> item !== null).map(item=>({brand:item}))) );
    }, []);

    useEffect(() => {
        const body = {
            "filters": {
                "status":currentTab == "Unassigned" ? ["WAITING_FOR_WRITER"] : 
                currentTab == "Completed"? ["WRITING_COMPLETE", "EDITING_COMPLETE"] : 
                currentTab == "Assigned" ? ["ASSIGNED_TO_WRITER", "ASSIGNED_TO_EDITOR"] : 
                currentTab == "InProgress" && ["WRITING_IN_PROGRESS", "EDITING_IN_PROGRESS"]
            }
        }
        fetch(`${workFlowsUrl}/search?limit=10&page=${currentPage}&unique=status`, {
                 method: "POST",
                 body:JSON.stringify(body),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8"
                 }
                 
             })
             .then(response => response.json())
            .then(result => setStatus(result?.data?.uniqueValues));
     }, [currentTab]);

     useEffect(() => {
        var date = new Date(searchByUpdatedAt);
        const newDate = date.toDateString().split(' ')
        const finalDate = `${newDate[3]}-${newDate[1]}-${newDate[2]}`
        const newSelectedBrand = selectedBrand.map(item => item.brand)
        const body = {
            "filters": {
                "styleId":searchByStyle,
                "title":searchByTitle,
                "brand":newSelectedBrand,
                "lastUpadtedBy":searchByUpdatedBy,
                "lastUpdateTs":finalDate,
                "status": isStatusSelected ? [searchByStatus] : currentTab == "Unassigned" ? ["WAITING_FOR_WRITER"] : 
                currentTab == "Completed"? ["WRITING_COMPLETE", "EDITING_COMPLETE"] : 
                currentTab == "Assigned" ? ["ASSIGNED_TO_WRITER", "ASSIGNED_TO_EDITOR"] : 
                currentTab == "InProgress" && ["WRITING_IN_PROGRESS", "EDITING_IN_PROGRESS"] 
            },
            "orderBy": {
                "styleId": styleSort,
                "title": titleSort,
                "brand": brandSort,
                "status": statusSort,
                "lastUpadtedBy": updatedBySort,
                "lastUpdateTs":updatedAtSort
            }
        }
        
        searchByStyle == "" && delete body.filters.styleId
        searchByTitle == "" && delete body.filters.title
        selectedBrand.length == 0 && delete body.filters.brand
        searchByUpdatedBy == "" && delete body.filters.lastUpadtedBy
        searchByUpdatedAt == null && delete body.filters.lastUpdateTs
        currentSort !== "styleSort" &&  delete body.orderBy.styleId
        currentSort !== "titleSort" &&  delete body.orderBy.title
        currentSort !== "brandSort" &&  delete body.orderBy.brand
        currentSort !== "statusSort" &&  delete body.orderBy.status
        currentSort !== "updatedBySort" &&  delete body.orderBy.lastUpadtedBy
        currentSort !== "updatedAtSort" &&  delete body.orderBy.lastUpdateTs
        
        fetch(`${workFlowsUrl}/search?limit=10&page=${currentPage}`, {
            method: "POST",
            body:JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(result => setCustomers(result?.data));
     }, [searchByStyle, 
        searchByTitle, 
        selectedBrand, 
        searchByStatus, 
        searchByUpdatedBy,
        searchByUpdatedAt,
        styleSort,
        titleSort,
        brandSort, 
        statusSort, 
        updatedBySort,
        updatedAtSort,
        currentTab, 
        currentPage,
        isStatusSelected
    ]);


     const handleStyleChanges = (e) => {
        setSearchByStyle(e.target.value)
    }

    const handleTitleChange = (e) => {
        setSearchByTitle(e.target.value)
    }

    const handleUpdatedByChange = (e) => {
        setsearchByUpdatedBy(e.target.value)
    }

    const debouncedStyleHandler = debounce(handleStyleChanges, 500);
    const debouncedTitleHandler = debounce(handleTitleChange , 500);
    const debouncedUpdatedByHandler = debounce(handleUpdatedByChange , 500);


    const renderHeader = () => {
        return (
            <div className="flex flex-wrap justify-content-end gap-2">
                {selectedProducts.length>1 && <button>
                    <span className='bg-white text-black rounded-full border h-8 w-8 px-1 py-1'><i className="pi pi-user-plus" /></span>
                    <span> Assign</span>
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
        return (
            <div className="w-[138px]">
                <Dropdown value={searchByStatus} options={statuses} onChange={handleStatus} itemTemplate={statusItemTemplate} placeholder="status"/>
            </div>
         );
    };

    const assigneeRowFilterTemplate = () => {
        return (
            <div className="w-[110px]">
                <Dropdown value={searchByStatus} onChange={handleStatus} itemTemplate={statusItemTemplate} placeholder="Select Status"/>
            </div>
         );
    };

    const handleStatus = (e) => {
        setIsStatusSelected(true)
        setSearchByStatus(e.target.value)
    }

    const titleRowFilterTemplate = () => {
        return (
            <div className="w-[197px]">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText onChange={debouncedTitleHandler} />
                </span>
            </div>

        );
    };

    const brandRowFilterTemplate = () => {
        return (
            <div className='w-[111px]'>
                <MultiSelect
                value={selectedBrand}
                options={brands}
                itemTemplate={representativesItemTemplate}
                onChange={(e) => handleBrands(e.value)}
                optionLabel="brand"
                placeholder="brand"
                maxSelectedLabels={1}
            />
            </div>
        );
    };

    const updatedByFilterTemplate=()=>{
        return (
            <div className="w-[114px]">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText onClick={debouncedUpdatedByHandler}/>
                </span>
            </div>
        );
    }

    const styleRowFilterTemplate = () => {
        return (
            <div className="w-[81px]">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText onChange={debouncedStyleHandler} />
                </span>
            </div>

        );
    };

    const dateFilterTemplate = () => {
        return (
            <div className='w-[132px]'>
                <span className="p-input-icon-left">
                    <Calendar value={searchByUpdatedAt} onChange={handleCalanderChange} placeholder="dd/mm/yy" />
                </span>
            </div>
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
        const finalDate = `${newDate[0]}${newDate[2]}${newDate[1]}`
        return finalDate
    };


    const header = renderHeader();


    const handleStyleSortHeader=()=>{
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left mr-2">
                    Style
                </span>
                <span>
                   <button onClick={handleStyleSort}><i className="pi pi-sort-alt"/></button>
                </span>
            </div>
        );
    }

    const handleTitleSortHeader=()=>{
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left mr-2">
                    Title
                </span>
                <span>
                <button onClick={handleTitleSort}><i className="pi pi-sort-alt"/></button>
                </span>
            </div>
        );
    }

    const handleBrandSortHeader=()=>{
        return (
            <div>
                <span className="p-input-icon-left mr-2">
                    Brand
                </span>
                <span>
                <button onClick={handleBrandSort}><i className="pi pi-sort-alt"/></button>
                </span>
            </div>
        );
    }

    const handleStatusSortHeader=()=>{
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left mr-2">
                    Status
                </span>
                <span>
                <button onClick={handleStatusSort}><i className="pi pi-sort-alt"/></button>
                </span>
            </div>
        );
    }

    const handleAssigneeSortHeader=()=>{
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left mr-2">
                    Assignee
                </span>
                <span>
                <button><i className="pi pi-sort-alt"/></button>
                </span>
            </div>
        );
    }

    const handleUpdatedBySortHeader=()=>{
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left mr-2">
                    Updated By
                </span>
                <span>
                   <i className="pi pi-sort-alt" onClick={handleUpdatedBySort} />
                </span>
            </div>
        );
    }

    const handleUpdatedAtSortHeader=()=>{
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left mr-2">
                    Updated At
                </span>
                <span>
                <button onClick={handleUpdatedAtSort}><i className="pi pi-sort-alt"/></button>
                </span>
                <span>
                <button onClick={() => setShowFilters(!showFilters)}>
                 <div className="bg-black text-white text-sm rounded-full border h-8 w-8 flex justify-center items-center ml-3"> 
                   <i className="pi pi-filter"/> 
                 </div>
                </button>                
                </span>
            </div>
        );

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


    const handleEdit=(rowData)=>{
        return (
            <div className="flex justify-content-end">
                <span>
                {(rowData.id == showEdit && isRowSelected) && <i className="pi pi-pencil" onClick={handleEditIcon}/>}
                </span>
            </div>
        );
    }

    // const handleEditIcon=()=>{

    // }

    const footer=()=>{
        return(
           <Pagination customers={customers} preText={preText} nextText={nextText} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        )
    }

    const onSelectionChange = (event) => {
        const value = event.value;
        setSelectedProducts(value);
    };

    const onRowClick=(e)=>{
        // debugger
    }

    const onRowSelect=(e)=>{
        setIsRowSelected(true)
        setShowEdit(e.data.id)
    }

    const onRowUnselect=()=>{
        setIsRowSelected(false)
    }

    return (
        <div className="card">
            <DataTable 
            value={customers?.workflows} 
            dataKey="id" 
            selection={selectedProducts} 
            filterDisplay={showFilters && "row"} 
            loading={loading} 
            header={ selectedProducts.length>1 && header}
            footer={footer}
                onSelectionChange={onSelectionChange} 
                emptyMessage="No customers found." 
                onRowSelect={onRowSelect} 
                onRowUnselect={onRowUnselect}
                onRowClick={onRowClick}
                >
                {isAdmin && <Column selectionMode="multiple"></Column>}
                <Column field="styleId" 
                header={handleStyleSortHeader} 
                filter showFilterMenu={false} 
                filterElement={styleRowFilterTemplate}
                filterPlaceholder="Search by Style"/>

                <Column 
                field="title" 
                header={handleTitleSortHeader} 
                filter 
                filterElement={titleRowFilterTemplate} 
                showFilterMenu={false} 
                filterPlaceholder="Search by Title"/>

                <Column 
                header={handleBrandSortHeader} 
                field="brand" 
                showFilterMenu={false}
                // body={brandBodyTemplate} 
                filter 
                filterElement={brandRowFilterTemplate} />

                {currentTab !== "Unassigned" && <Column 
                field="status" 
                header={handleStatusSortHeader} 
                showFilterMenu={false} 
                // body={statusBodyTemplate} 
                filter 
                filterElement={statusRowFilterTemplate} />}

                {(currentTab !== "Completed" && currentTab !== "Unassigned" && isAdmin)  && <Column 
                field="" 
                header={handleAssigneeSortHeader} 
                showFilterMenu={false} 
                // body={statusBodyTemplate} 
                filter 
                filterElement={assigneeRowFilterTemplate} 
                />}

                <Column 
                field="lastUpdatedBy" 
                header={handleUpdatedBySortHeader} 
                filter showFilterMenu={false} 
                 filterElement={updatedByFilterTemplate}
                />

                <Column field="lastUpdateTs" 
                header={handleUpdatedAtSortHeader} 
                dataType="date" filter 
                showFilterMenu={false} 
                body={dateBodyTemplate} 
                filterElement={dateFilterTemplate}/>

                <Column body={handleEdit} />
                <Column body={handleEdit} />
              </DataTable>
           </div>
    );
}