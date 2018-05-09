import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
// import Avatar from 'material-ui/Avatar';
import RootReducer from './../../redux/RootReducer';

import Dialog from 'material-ui/Dialog';
// import FontAwesome from 'react-fontawesome'
import LibraryBooksIcon from 'material-ui-icons/LibraryBooks';
// import AddIcon from 'material-ui-icons/Add';
// import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
// import PeopleIcon from 'material-ui-icons/People'
//import projectData from './../../redux/RootData';

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
    // paddingTop: "15%",
    // paddingBottom: "15%",
    height:`${window.innerHeight*0.1}px`,
   
  },
  listItemIcon: {
    width: "60%",
    height: "60%",
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
    
    const{open,close,search, choose1,choose2,choose3,choose4,choose5,choose6,
       projectName,ObligeeData,
      classes,
      clickIcon
    }=this.props;
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
            <TableCell><Button onClick={choose1} key="权籍调查表">{projectName}</Button></TableCell>
            
          </TableRow>

               <TableRow >
            <TableCell ><Button onClick={choose2} key={"界址标示表"}>界址标示表</Button></TableCell>
            <TableCell><Button onClick={choose2} key={"界址标示表"}>{projectName}</Button></TableCell>
            
          </TableRow>

            <TableRow >
            <TableCell ><Button onClick={choose3} >界址签章表</Button></TableCell>
            <TableCell><Button onClick={choose3} >{projectName}</Button></TableCell>
            
          </TableRow>
            <TableRow >
            <TableCell ><Button onClick={choose4} >界址说明表</Button></TableCell>
            <TableCell><Button onClick={choose4} >{projectName}</Button></TableCell>
            
          </TableRow>

            <TableRow >
            <TableCell ><Button onClick={choose5} key={"调查审核表"}>调查审核表</Button></TableCell>
            <TableCell><Button onClick={choose5} key={"调查审核表"}>{projectName}</Button></TableCell>
            
          </TableRow>

            <TableRow >
            <TableCell ><Button onClick={choose6} key={"共有宗地面积分摊表"}>共有宗地面积分摊表</Button></TableCell>
            <TableCell><Button onClick={choose6} key={"共有宗地面积分摊表"}>{projectName}</Button></TableCell>
            
          </TableRow>
           
        </TableBody>
      </Table>
      
</Paper>
{/* <Button onClick={search } height="150px"  width="100%">属性查询</Button> */}
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
const mapDispatchToProps= (dispatch,ownProps)=> {
  return {
    search:()=>dispatch(
      {
        type: 'search'
      }
    ),
    choose1: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 1,
                    data:ownProps.ObligeeData
                }
            }),
    choose2: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 2,
                    data:ownProps.ObligeeData
                }
            }),
    choose3: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 3,
                    data:ownProps.ObligeeData
                }
            }),

    choose4: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 4,
                    data:ownProps.ObligeeData
                }
            }),

    choose5: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 5,
                    data:ownProps.ObligeeData
                }
    }),
   choose6: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 6,
                    data:ownProps.ObligeeData
                }
    }),
    close:()=>dispatch({
      type: 'closeChoose',
                  payload: {
                    
      }
    }),
    clickIcon:() => {
      if(ownProps.sketchHaveSaved){
        dispatch({
          type: 'MAP_SKETCH_VIEW_HIDE',
        });
      }
      dispatch({
        type: 'clickIcon',
        payload: {
          Loaded:ownProps.ObligeeData.Loaded,
          sketchHaveSaved:ownProps.sketchHaveSaved
        }    
      });      

    }
  }
}
const ChooseDialog = withStyles(styles,{name:'ChooseTableDialog'})(ChooseTableDialog);
export default connect(mapStateToProps, mapDispatchToProps)(ChooseDialog);

// // Reducer
const ObContentReducer = (state={
loaded:false
}, action) => {
  var newState = state;
  
 
  
  switch (action.type) {

    case "handleChooseItem":
    {
      let list0 = [];
    
      list0 = action.payload;
     
      newState = JSON.parse(list0[3].data)[0];
     
      
  
     
      
       return { ...state, ...newState }; 
    }
break;


   case "choose":
   if(action.payload.choice===2)
     {
      var statenew=state;
      
    var LandPointInMap=[];
    if(action.payload.data==undefined)
      return state;

      if(typeof(action.payload.data.ProjectItem.L.jzxJSONData)=="string")

      var jzx =JSON.parse(action.payload.data.ProjectItem.L.jzxJSONData);
      else
      var jzx =action.payload.data.ProjectItem.L.jzxJSONData;
      
      

      if(jzx.geometries.length!==0)
      {
        for(let i=0;i<jzx.geometries.length;i++)
        {
      for(let j=0;j<jzx.geometries[i].options.poiArr.length;j++)
      {
        var newValue=jzx.geometries[i].options.poiArr[j];
        if(LandPointInMap.indexOf(newValue)<0)
        LandPointInMap.push(newValue);
      }
        }
   
        var LandPointInMapCount=LandPointInMap.length;


      var LandPointCount =action.payload.data.ProjectItem.F2.LandPointCodeList.length;

      var LandPointTypeCount =action.payload.data.ProjectItem.F2.LandPointTypeList.length;

      var LandPointDistanceCount =action.payload.data.ProjectItem.F2.LandPointDistance.length;

      var LandBoundaryTypeCount =action.payload.data.ProjectItem.F2.LandBoundaryType.length;

      var LandBoundaryLocationCount =action.payload.data.ProjectItem.F2.LandBoundaryLocation.length ;

     
      if(LandPointInMapCount>LandPointCount)
      {
        if(LandPointCount===0)
        {
          statenew.F2.LandPointCodeList=new Array(LandPointInMapCount);
           statenew.F2.LandPointTypeList =new Array(LandPointInMapCount);

          statenew.F2.LandPointDistance  =new Array(LandPointInMapCount-1);
          statenew.F2.LandBoundaryType  =new Array(LandPointInMapCount-1);
          statenew.F2.LandBoundaryLocation  =new Array(LandPointInMapCount-1);
          statenew.F2.LandBoundaryExplain  =new Array(LandPointInMapCount-1);
  

        for(let i=0;i<LandPointInMapCount;i++)
        {
            statenew.F2.LandPointCodeList[i]="";
            statenew.F2.LandPointTypeList[i]=-1;
    
        }
        for(let i=0;i<LandPointInMapCount-1;i++)
        {
            statenew.F2.LandPointDistance[i]=0;
            statenew.F2.LandBoundaryType[i]=-1;
            statenew.F2.LandBoundaryLocation[i]=-1;
            statenew.F2.LandBoundaryExplain[i] ="";
         }
        }

      else
      {
         for(let i=LandPointCount;i<LandPointInMapCount;i++)
        {
          statenew.F2.LandPointCodeList[i]="";
          statenew.F2.LandPointTypeList[i]=-1;
    
        }
        for(let i=LandPointCount;i<LandPointInMapCount-1;i++)
        {
            statenew.F2.LandPointDistance[i]=0;
            statenew.F2.LandBoundaryType[i]=-1;
           statenew.F2.LandBoundaryLocation[i]=-1;
            statenew.F2.LandBoundaryExplain[i] ="";
    
        }
      }
      }
      if(LandPointInMapCount<LandPointCount)
      {
        statenew.F2.LandPointCodeList.length=LandPointInMapCount;
        statenew.F2.LandPointTypeList.length=LandPointInMapCount;

       statenew.F2.LandPointDistance.length=LandPointInMapCount-1;
     statenew.F2.LandBoundaryType.length=LandPointInMapCount-1;
     statenew.F2.LandBoundaryLocation.length=LandPointInMapCount-1;
     statenew.F2.LandBoundaryExplain.length=LandPointInMapCount-1;
      }

     }
    }
       var returnState=Object.assign({}, state, statenew);
   
       return returnState;

       break;
       
    case 'change':
     var inputName=action.payload.inputName;
     var tableID=action.payload.tableID;
     

      var statenew=state;
      statenew[tableID][inputName]=action.payload.inputValue;
     
      var returnState=Object.assign({}, state, statenew);



     // projectData.ProjectItem=returnState;

      //console.log(projectData.ProjectItem)
      return returnState;


      case 'CHANGE_INPUTLIST':
      var inputName=action.payload.inputName;
      var tableID=action.payload.tableID;
      var index= action.payload.index;
 
       var statenew=state;

       statenew[tableID][inputName][index]=action.payload.inputValue;
      console.log(statenew[tableID][inputName][index]);
       var returnState=Object.assign({}, state, statenew);
 
      // projectData.ProjectItem=returnState;
   
       console.log(returnState);
       return returnState;
       break;
       
       case 'Muti_CHANGE_CHECKBOX':
       
         newState=state;
        
        for(var i=0;i<newState[action.payload.tableID][action.payload.type].length;i++)
        {
          newState[action.payload.tableID][action.payload.type][i]=action.payload.col;
        }
       
     
     
          var returnState=Object.assign({}, state, newState);
         // projectData.ProjectItem=returnState;
     
         console.log(returnState);
         return returnState;




     case 'CHANGE_CHECKBOX':
  
    newState=state;
   
        
    newState[action.payload.tableID][action.payload.type][action.payload.row]=action.payload.col;


    var returnState=Object.assign({}, state, newState);
   // projectData.ProjectItem=returnState;

    console.log(returnState);
    return returnState;
   

    case 'fillSignatureList':
    if(typeof(action.payload.data)=="undefined")
return state;
    console.log(action.payload.data);
   
    let jzx=action.payload.data.jzxJSONData;
   if(typeof(jzx)=="string")
   jzx=JSON.parse(jzx);
      let startPoints=[];
      let endPoints=[];
      let innerPoints=[];
      let jzxID=[];
      for(let i=0;i<jzx.geometries.length;i++)
      {
        jzxID.push(jzx.geometries[i].feature.id) ;
        let jzxPoints=jzx.geometries[i].options.poiArr;
        startPoints.push(jzxPoints[0]);
        endPoints.push(jzxPoints[jzxPoints.length-1]);
        if(jzxPoints.length>2)
        {
          let temp="";
          for(let j=1;j<jzxPoints.length-2;j++)
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
      console.log(state)
      newState=state;
      newState.F3.StartPointCodeList=startPoints;
      newState.F3.InnerPointCodeList=innerPoints;
      newState.F3.EndPointCodeList=endPoints;
      newState.L.jzxID=jzxID;
      
      console.log(newState)
      const returnState=Object.assign({}, state, newState);
      
      return returnState;
  


  case 'changelist':
  
         
         var type=action.payload.type;
         var tableID=action.payload.tableID;
         var statenew=state;
         statenew[tableID][type][action.payload.row]=action.payload.value;
         var returnState=Object.assign({}, state, statenew);
         //projectData.ProjectItem=returnState;
         return returnState;




  case 'ZoomToPoint':
  console.log("clicked "+action.payload.pointName);

   return state;
    default:
      return state
  }
}



RootReducer.merge(ObContentReducer);