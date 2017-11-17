import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import { withStyles } from 'material-ui/styles'
import {ListItem} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import Typograghy from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Button from "material-ui/Button";
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import CloseIcon from "material-ui-icons/Close";


const drawerWidth = 240;
const styles =theme=>({
  listItem: {
    flexDirection: "column",
    justifyContent: "center",
    padding: "0px",
    border: 0,
    background: "rgba(69, 90, 100, .6)",
    borderRadius: '6%',
  },
  text:{
    fontSize:'0.75em',
    color:"#fff",
    paddingBottom: '15%',
  },
  bar:{},
  checked:{
    color:'	#B3D9D9',
    '& + $bar': {
      background: '	#B3D9D9',
    },
  },
  drawerPaper: {
    left:`${window.innerWidth * 0.083}px`,
    top:`${window.innerHeight * 0.2}px`,
    height: '60%',
    width: drawerWidth,
  },
  // content: {
  //   backgroundColor: theme.palette.background.default,
  //   width: '100%',
  //   padding: theme.spacing.unit * 3,
  //   height: 'calc(100% - 56px)',
  //   marginTop: 56,
  //   [theme.breakpoints.up('sm')]: {
  //     height: 'calc(100% - 64px)',
  //     marginTop:64,
  //   },
  // },
  toolBar:{
    padding:0,
    minHeight:'40px',
    background:'#455A64',
  },
  title: {
    flex: 1,
    fontSize:'1.2em',
    fontWeight: '800',
    textAlign:'center',
    color:'#fff',
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
    fontWeight:'400',
    textAlign:'center',
  }
})

class RealtimeMapping extends Component {

  render() {
    const { 
      classes, 
      isRealtimeOn, 
      jzdTableData,
      handleRealtimeMapping,
      onjzdXCZJClick}=this.props;

    const drawer = (
      <Drawer
        type="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor= 'left'
        open={isRealtimeOn}
      >
      <Toolbar className={classes.toolBar}>
        <Typography type="title" color="inherit" className={classes.title}>
            实时成图点列表
        </Typography>
        <IconButton color="contrast" aria-label="Close" >
          <CloseIcon />
        </IconButton>
      </Toolbar> 
      <div style={{overflowX: 'auto', overflowY: 'auto'}}>
        <Table>
          <TableHead>
            <TableRow style={{height:'40px'}}>
              <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.4}px`}}>            
                <Typography className={classes.headtext} >点号</Typography>      
              </TableCell>
              <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.4}px`}}>
                <Typography className={classes.headtext} >坐标</Typography>  
              </TableCell>
              <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.2}px`}}>
                <Typography className={classes.headtext} >定位</Typography>  
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jzdTableData.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell className={classes.tablecell}>{n.id}</TableCell>
                  <TableCell className={classes.tablecell}>{n.coordinates}</TableCell>
                  <TableCell 
                    className={classes.tablecell}
                    onClick={()=>onjzdXCZJClick(n.id)}>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Drawer>
    );

    return (
      <div>
        <ListItem className={classes.listItem}>
        <Switch
          classes={{
            checked:classes.checked,
            bar:classes.bar
          }}
          checked={isRealtimeOn}
          onChange={handleRealtimeMapping}          
          aria-label="RealtimeMappingCheckBox"
        />
        <Typograghy className={classes.text}>实时<br/>成图</Typograghy>
      </ListItem>
      {drawer}
      </div>
    );
  }
}

RealtimeMapping.propTypes = {
  classes: PropTypes.object.isRequired,
  isRealtimeOn: PropTypes.bool.isRequired,
  handleRealtimeMapping: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const sketchState = state.sketchReduce;
  const JZDListState = state.JZDListReduce;
    return {
      isRealtimeOn: sketchState.isRealtimeOn,
      jzdTableData:JZDListState.jzdTableData,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleRealtimeMapping:()=>{
      dispatch({
        type:'handleRealtimeMapping'
      })
    },
  }
}  	

export default withStyles(styles,{name:'RealtimeMapping'})(connect(mapStateToProps, mapDispatchToProps)(RealtimeMapping))