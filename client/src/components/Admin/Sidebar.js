import React from 'react'
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { Add, Dashboard, ExpandMore, ImportExport, ListAlt, People, PostAdd, RateReview } from '@mui/icons-material';
import {TreeItem, TreeView} from '@mui/lab'
import './Sidebar.css'

function Sidebar({open, active}) {

  return (
    <div className="sidebar">
        <Link to="/">
            <img src={logo} alt='logo' />
        </Link>
        <Link to="/admin/dashboard" className={active==="dashboard" && "active"}>
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
                <Link to="/admin/products" className={active==="all" && "active"}>
                    <TreeItem nodeId='2' label='All' icon={<PostAdd />}  />
                </Link>
                <Link to="/admin/product" className={active==="create" && "active"}>
                    <TreeItem nodeId='3' label='Create' icon={<Add />}  className={active==="create" && "active"}/>
                </Link>
            </TreeItem>
        </TreeView>
        <Link to="/admin/orders" className={active==="order" && "active"}>
            <p>
                <ListAlt /> Orders
            </p>
        </Link>
        <Link to="/admin/users" className={active==="user" && "active"}>
            <p>
                <People /> Users
            </p>
        </Link>
        <Link to="/admin/reviews" className={active==="review" && "active"}>
            <p>
                <RateReview /> Reviews
            </p>
        </Link>
    </div>
  )
}

export default Sidebar