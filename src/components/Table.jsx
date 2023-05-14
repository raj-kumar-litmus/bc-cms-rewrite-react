import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
// import PersonAdd from '../logos/Person-Add.svg';

export default function Table() {
    const [products, setProducts] = useState([
      { id: "BHNJ234", fullName: "Noor Khan", brand: "Noor Khan", UpdatedBy: '18/10/2022', UpdatedAt: "Patna"},
      { id: "BHNJ234", fullName: "Rapsan Jani", brand: "Noor Khan", UpdatedBy: '18/01/2022', UpdatedAt: "Noida"},
      { id: "BHNJ234", fullName: "Monika Singh", brand: "Noor Khan", UpdatedBy: '21/12/2022', UpdatedAt: "New Delhi"},
      { id: "BHNJ234", fullName: "Sunil Kumar", brand: "Noor Khan",  UpdatedBy: '16/08/2022', UpdatedAt: "Jaipur"},
      { id: "BHNJ234", fullName: "Kajol Kumari", brand: "Noor Khan",  UpdatedBy: '05/06/2022', UpdatedAt: "Chennai"},
  ]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [rowClick, setRowClick] = useState(true);

    // useEffect(() => {
    //     ProductService.getProductsMini().then((data) => setProducts(data));
    // }, []);

    // const handleEdit=()=>{
    //   debugger
    // }

    const handleAddPopUp=()=>{

    }

    // console.log("selectedProducts>>",selectedProducts)

    // const onRowEditComplete=(e)=>{
    //   console.log("onRowEditComplete>>", e)
    // }

  //   const PersonAddICon = 
  //       <img
  //     className="px-1 py-1 h-31 w-31"
  //     src={PersonAdd}
  //     alt="PersonAdd SVG"/>   
  // };

    const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
  });

    return (
        <div className="card">
            <DataTable value={products} paginator rows={5} editMode="row" 
            // selectionMode={rowClick ? null : 'checkbox'} 
            selection={selectedProducts} 
            // onSelectionChange={(e) => setSelectedProducts(e.value)} 
            // onRowEditComplete={onRowEditComplete} dataKey="id" 
            removableSort
            filters={filters} 
            tableStyle={{ minWidth: '50rem' }}>
                <Column selectionMode="multiple"></Column>
                <Column field="id" header="Style" 
                // sortable 
                style={{ minWidth: '12rem' }}></Column>
                <Column field="fullName" header="Title"  
                // sortable 
                style={{ minWidth: '12rem' }}></Column>
                <Column field="brand" header="Brand" 
                // sortable 
                style={{ minWidth: '14rem' }}></Column>
                <Column field="UpdatedBy" header="Updated By" 
                // sortable 
                style={{ minWidth: '14rem' }}></Column>
                <Column field="UpdatedAt" header="Updated At" 
                // sortable 
                style={{ minWidth: '12rem' }}></Column>
                <Column 
                rowEditor 
                style={{ width: '10%' }}
                //  onClick={handleEdit}
                 ></Column>
                {/* <Column body={ <img
              className="px-1 py-1 h-31 w-31"
      src={PersonAdd}
      alt="PersonAdd SVG"/>} onClick={handleAddPopUp} style={{ width: '10%' }}></Column> */}
            </DataTable>
        </div>
    );
}

