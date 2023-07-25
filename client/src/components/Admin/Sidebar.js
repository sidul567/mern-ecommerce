import React from 'react'
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { Add, Dashboard, ExpandMore, ImportExport, ListAlt, People, PostAdd, RateReview } from '@mui/icons-material';
import {TreeItem, TreeView} from '@mui/lab'
import './Sidebar.css'

function Sidebar({open}) {
  return (
    <div className="sidebar">
        <Link to="/">
            <img src={logo} alt='logo' />
        </Link>
        <Link to="/admin/dashboard">
            <p>
                <Dashboard /> Dashboard
            </p>
        </Link>
        <TreeView
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ImportExport />}
            defaultExpanded={open && ['1']}
        >
            <TreeItem nodeId='1' label="Products">
                <Link to="/admin/products">
                    <TreeItem nodeId='2' label='All' icon={<PostAdd />} />
                </Link>
                <Link to="/admin/product">
                    <TreeItem nodeId='3' label='Create' icon={<Add />} />
                </Link>
            </TreeItem>
        </TreeView>
        <Link to="/admin/orders">
            <p>
                <ListAlt /> Orders
            </p>
        </Link>
        <Link to="/admin/users">
            <p>
                <People /> Users
            </p>
        </Link>
        <Link to="/admin/reviews">
            <p>
                <RateReview /> Reviews
            </p>
        </Link>
    </div>
  )
}

export default Sidebar