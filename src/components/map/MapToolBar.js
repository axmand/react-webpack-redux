/**
 * 
 */
import React from 'react';
import PropTypes from 'prop-types';
//ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Menu, { MenuItem } from 'material-ui/Menu'
import Divider from 'material-ui/Divider';
//图标

const style = {
    paper: {
        display: 'inline-block',
        float: 'left',
        margin: '16px 32px 16px 0',
    },
    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },
}

const MapToolBar = ({ onClick, complete, text }) => {
    return (<div>
        <MuiThemeProvider>
            <Paper style={style.paper}>
                <Menu desktop={true} width={60} onClick={()=>onClick(text)}>
                    <MenuItem>123</MenuItem>
                </Menu>
            </Paper>
        </MuiThemeProvider>
    </div>)
};


MapToolBar.propTypes = {
    onClick: PropTypes.func.isRequired,
    text:PropTypes.string.isRequired
}

export default MapToolBar;
