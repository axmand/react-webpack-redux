import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import RootReducer from './../../redux/RootReducer';

import Dialog, { DialogTitle } from 'material-ui/Dialog';
// import FontAwesome from 'react-fontawesome'
import LibraryBooksIcon from 'material-ui-icons/LibraryBooks';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Provider, connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import PeopleIcon from 'material-ui-icons/People'
import projectData from './../../redux/RootData';

const styles = {
  avatar: {
    background: blue[100],
    color: blue[600],
  },
 paper: {
    width: '100%',
    
    overflowX: 'auto',
  },
   listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
    paddingTop: "15%",
    paddingBottom: "15%",
   
  },
  listItemIcon: {
    width: "40%",
    height: "40%",
    margin: 0,
    color: "#C1C6C9"
  },
  listItemText: {
    fontSize: '1em',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
    padding: '0px',
  },
}

class ChooseTableDialog extends Component {


  render() {
    
    const{open,close,search, choose1,choose2,choose3,choose4,choose5,choose6,projectName,classes,clickIcon}=this.props;
    return (
      <div>
      <ListItem button className={classes.listitem} disableGutters={true} onClick={clickIcon}>
          <ListItemIcon>
            <LibraryBooksIcon className={classes.listItemIcon}/>
          </ListItemIcon>
          <ListItemText 
            primary="填写表格"
            disableTypography={true}
            className={classes.listItemText}
          />
        </ListItem>
        <Dialog
           
            open={open}
            onRequestClose={close}
          
          >
             <Paper className={classes.paper}>
<Table>
        <TableHead style ={{backgroundColor:"#455A64"}}>
          <TableRow>
            <TableCell style={{ fontSize: '1em',color: '#ffffff',fontFamily: "微软雅黑", fontWeight: 'bold',padding: '0px',}}><p>表格类型</p></TableCell>
            <TableCell style={{ fontSize: '1em',color: '#ffffff',fontFamily: "微软雅黑", fontWeight: 'bold',padding: '0px',}}><p>所属项目</p></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
         
                <TableRow >
            <TableCell ><Button onClick={choose1} key="权籍调查表">权籍调查表</Button></TableCell>
            <TableCell><Button onClick={choose1} key="权籍调查表">{projectData.ProjectName}</Button></TableCell>
            
          </TableRow>

               <TableRow >
            <TableCell ><Button onClick={choose2} key={"界址标示表"}>界址标示表</Button></TableCell>
            <TableCell><Button onClick={choose2} key={"界址标示表"}>{projectData.ProjectName}</Button></TableCell>
            
          </TableRow>

            <TableRow >
            <TableCell ><Button onClick={choose3} >界址签章表</Button></TableCell>
            <TableCell><Button onClick={choose3} >{projectData.ProjectName}</Button></TableCell>
            
          </TableRow>
            <TableRow >
            <TableCell ><Button onClick={choose4} >界址说明表</Button></TableCell>
            <TableCell><Button onClick={choose4} >{projectData.ProjectName}</Button></TableCell>
            
          </TableRow>

            <TableRow >
            <TableCell ><Button onClick={choose5} key={"调查审核表"}>调查审核表</Button></TableCell>
            <TableCell><Button onClick={choose5} key={"调查审核表"}>{projectData.ProjectName}</Button></TableCell>
            
          </TableRow>

            <TableRow >
            <TableCell ><Button onClick={choose6} key={"共有宗地面积分摊表"}>共有宗地面积分摊表</Button></TableCell>
            <TableCell><Button onClick={choose6} key={"共有宗地面积分摊表"}>{projectData.ProjectName}</Button></TableCell>
            
          </TableRow>
           
        </TableBody>
      </Table>
      
</Paper>
<Button onClick={search } height="150px"  width="100%">属性查询</Button>
       </Dialog>
      </div>
    );
  }
}

ChooseTableDialog.propTypes = {
  
};




const mapStateToProps = (state) => {

    

    return {
        open:state.obligeeReducer.open
    }
}
// Map Redux actions to component props
const mapDispatchToProps= (dispatch)=> {
  return {
    search:()=>dispatch(
      {
        type: 'search'
      }
    ),
    choose1: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 1
                }
            }),
    choose2: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 2
                }
            }),
    choose3: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 3
                }
            }),

    choose4: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 4
                }
            }),

    choose5: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 5
                }
    }),
   choose6: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 6
                }
    }),
  close:()=>dispatch({
    type: 'closeChoose',
                payload: {
                   
    }
  }),
clickIcon:()=>dispatch({
  type: 'clickIcon',

  })
}
}
const ChooseDialog = withStyles(styles,{name:'ChooseTableDialog'})(ChooseTableDialog);
export default connect(mapStateToProps, mapDispatchToProps)(ChooseDialog);

// // Reducer
const ObContentReducer = (state={
loaded:false
}, action) => {
 
  
  switch (action.type) {

    case "handleChooseItem":

   
   let list = [];
   
   list = JSON.parse(action.payload.data);
  
  
   var newValue = list.slice(0);

   //console.log(newValue[0].F1);
   var newsss=newValue[0];
   state=newsss;
  
   projectData.Loaded=true;
   return state;
   

  
    case 'change':
     var inputName=action.payload.inputName;
     var tableID=action.payload.tableID;
     

      var statenew=state;
      statenew[tableID][inputName]=action.payload.inputValue;
     
      var returnState=Object.assign({}, state, statenew);



      projectData.ProjectItem=returnState;

      //console.log(projectData.ProjectItem)
      return returnState;

     case 'changetest':
  
    var newState=state;
    newState[action.payload.tableID][action.payload.type][action.payload.row]=action.payload.col;


    var returnState=Object.assign({}, state, newState);
    projectData.ProjectItem=returnState;
    return returnState;
   

    case 'signatureClick':
    var jzxData=projectData.ProjectItem.L.jzxJSONData;
    var jzx = eval('(' + jzxData + ')');
  
  
    var startPoints=[];
    var endPoints=[];
    var innerPoints=[];
    var jzxID=[];
    for(var i=0;i<jzx.geometries.length;i++)
    {
      jzxID.push(jzx.geometries[i].options.id) ;
      var jzxPoints=jzx.geometries[i].options.poiArr;
      startPoints.push(jzxPoints[0]);
      endPoints.push(jzxPoints[jzxPoints.length-1]);
      if(jzxPoints.length>2)
      {
        var temp="";
        for(var j=1;j<jzxPoints.length-2;j++)
        { temp+=jzxPoints[j]+",";
  
        }   
        temp+=jzxPoints[jzxPoints.length-2];
        innerPoints.push(temp);
            
      }
      else
      {
        innerPoints.push("");
      }
    }
      var newState=state;
newState.F3.StartPointCodeList=startPoints;
newState.F3.InnerPointCodeList=innerPoints;
newState.F3.EndPointCodeList=endPoints;

  
      var returnState=Object.assign({}, state, newState);
      projectData.ProjectItem=returnState;
      return returnState;

  case 'changelist':
  
         
         var type=action.payload.type;
         var tableID=action.payload.tableID;
         var statenew=state;
         statenew[tableID][type][action.payload.row]=action.payload.value;
         var returnState=Object.assign({}, state, statenew);
         projectData.ProjectItem=returnState;
         return returnState;




  case 'ZoomToPoint':
  console.log("clicked "+action.payload.pointName);

   return state;
    default:
      return state
  }
}



RootReducer.merge(ObContentReducer);