import React, { useState, useEffect, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer';

const Customerlist = () => {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('');
    const gridRef = useRef();

    useEffect(() => {
        getCustomers()
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {
                method: 'DELETE'
            })
                .then(_ => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
                .then(_ => setMsg('Customer was deleted succesfully'))
                .then(_ => setOpen(true))
                .catch(err => console.error(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newCustomer)
        })
            .then(_ => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
            .catch(err => console.error(err))
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(_ => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
            .then(_ => setMsg('Customer was updated succesfully'))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    const columns = [
        { headerName: 'First name', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Last name', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone number', field: 'phone', sortable: true, filter: true },
        {
            headerName: '',
            field: 'links[0].href',
            width: 100,
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
        },
        {
            headerName: '',
            field: 'links[0].href',
            width: 100,
            cellRendererFramework: params =>
                <Button color="secondary" size="small" onClick={() => deleteCustomer(params.value)}>Delete</Button>
        }
    ]

    return (
        <div>
            <br></br>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: '700px', width: '90%', margin: 'auto' }}>
                <AgGridReact
                    suppressCellSelection={true}
                    ref={gridRef}
                    onGridReady={params => {
                        gridRef.current = params.api
                    }}
                    columnDefs={columns}
                    rowData={customers}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={closeSnackbar}
                    message={msg}
                />
            </div>
        </div>
    )
}
export default Customerlist;