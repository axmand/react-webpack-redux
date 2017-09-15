/*
whole page----dialog
                table

*/

import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableHead,TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
//import reducer
import RootReducer from './../../redux/RootReducer';
//import unique ID as key for map() function (or method?)
import uuidv4 from 'uuid/v4';

//import color
import blue from 'material-ui/colors/blue';

// inset css
const styles = {
    
    dialog:{
      width: '35%',
      height: '82%',
      marginTop:'30px',
      marginLeft:'100px',
    },
  
    dialogImage:{
      width:'80%',
      height:'80%',
      marginTop:'30px',
      marginLeft:'100px',
    },  
  
    button:{
      width:80,
      height:30,
      fontFamily: "微软雅黑",
      fontWeight: 'bold',
      color: "white",
      background: blue[300],
      borderRadius:3,
      border:0,
      padding: 0,
    },

    tableHead:{
      padding:0,
    },
   
    tableCellHead:{
      backgroundColor:blue[100],
      backgroundClip:'text',
      borderRadius:'5px',
      justify:'center',
      justifyContent:'center',
      width:'50px',
      textAlign:'center',
      padding:'5px 0',
      fontSize:'18px',
  
    },
    tableCellBody:{
      width:'50px',
      padding:0,
      textAlign:'center',
    },
  
  
  };

class ImageDownload extends Component{
    constructor(props){
        super(props);
        this.state ={
          openImage:false,
        }
    
        //bind to make 'this' work in the callback
        this.handleClickImage = this.handleClickImage.bind(this);
        this.handleRequestCloseImage = this.handleRequestCloseImage.bind(this);    
      }

    handleClickImage = event => {
        this.setState({ openImage: true })
        }
    handleRequestCloseImage = () => {
        this.setState({ openImage: false });
        }

    render() {
        const imageLists=[
            {imageName:'1',imageSize:'1'},
            {imageName:'2',imageSize:'2'},
            {imageName:'1',imageSize:'1'},
            {imageName:'2',imageSize:'2'},
            {imageName:'1',imageSize:'1'},
            {imageName:'2',imageSize:'2'},      
            {imageName:'1',imageSize:'1'},
            {imageName:'2',imageSize:'2'},
            {imageName:'1',imageSize:'1'},
            {imageName:'2',imageSize:'2'},
            {imageName:'1',imageSize:'1'},
            {imageName:'2',imageSize:'2'},
            {imageName:'1',imageSize:'1'},
            {imageName:'2',imageSize:'2'},
          ];
    }
    return(
        <Dialog
        fullScreen
        classNames={classes.dialog, classes.dialogImage}
        open={this.state.openImage}
        onRequestClose={this.handleRequestCloseImage}
        
        position='absolute'
        left='100px'
        top='20px'
        >
        <DialogContent>
          <Table>
            <TableHead className={classes.tableHead} >
              <TableRow className={classes.tableHead} >
                <TableCell className={classes.tableCellHead} >影像名称</TableCell>
                <TableCell className={classes.tableCellHead} >影像大小</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {imageLists.map(imageList =>
              <TableRow key={uuidv4()}>
                <TableCell className={classes.tableCellBody} >{imageList.imageName}</TableCell>
                <TableCell numeric className={classes.tableCellBody} >{imageList.imageSize}</TableCell>
              </TableRow>
                 )}
            </TableBody>
          </Table>
        </DialogContent>
        </Dialog>
    )
}

