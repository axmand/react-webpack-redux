import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from "material-ui/Dialog";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';

const styles = {
  content:{
    padding:0,
    width:`${window.innerWidth * 0.6}px`,
    height:`${window.innerHeight * 0.6}px`,
  },
  toolBar:{
    padding:0,
    minHeight:'50px',
    background:'#3f51b5',
  },
  title: {
    flex: 1,
    fontSize:'1.5em',
    textAlign:'center',
    color:'#fff',
  },
  list:{
    padding:0,
  },
  headcell:{
    padding:0,
    height:'30px',
  },
  headtext:{
    fontSize:'1.2em',
    textAlign:'center',
    width:'100%',    
    fontWeight:'600',
  },
  tablecell:{
    fontSize:'1em',
    border:'1px',
    fontWeight:'400',
    
  },
  tabletext:{
    fontSize:'1em',
    textAlign:'center',
    width:'100%',    
    fontWeight:'400',
  }
};


class SignatureList extends Component {

  render() {
    const { classes,signatureIsChecked,onSignatureListClose,poiTableData,onJzdTableClick} = this.props;
    return (
        <Dialog
          className={classes.root}
          open={signatureIsChecked}
          onRequestClose={onSignatureListClose}
        >
        <Paper className={classes.content}>
          <Toolbar className={classes.toolBar}>
            <Typography type="title" color="inherit" className={classes.title}>
              界址点签章表
            </Typography>            
            <IconButton color="contrast" aria-label="Close" onClick={onSignatureListClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar> 

          <Table>
            <TableHead>
              <TableRow style={{height:'40px'}}>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.2}px`}}>            
                  <Typography className={classes.headtext} >点号</Typography>      
                </TableCell>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.4}px`}}>
                  <Typography className={classes.headtext} >坐标</Typography>  
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {poiTableData.map(n => {
              return (
                <TableRow key={n.id}  onClick={() => onJzdTableClick(n.num)}>
                  <TableCell>{n.num}</TableCell>
                  <TableCell>{n.coor[0]} , {n.coor[1]}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </Paper>
      </Dialog>
    );
  }
}

SignatureList.propTypes = {
  classes: PropTypes.object.isRequired,
  signatureIsChecked:PropTypes.bool.isRequired,
  poiTableData:PropTypes.array.isRequired,
};

const mapStateToProps = state =>{
  const sketchState = state.sketchReduce;
  return{
    signatureIsChecked:sketchState.signatureIsChecked,
    poiTableData:sketchState.poiTableData,
  }
}

const mapDispatchToProps = (dispatch,ownProps)=> {

  return{
    onSignatureListClose:()=>{
      dispatch({
        type:'signatureClose'
      })
    },
    onJzdTableClick:poi_num=>{
      dispatch({
        type:'jzdTableClick',
        payload:{command:poi_num}
      })
    },
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: "SignatureList" })(SignatureList));