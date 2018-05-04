import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles'
//import projectData from './../../redux/RootData';

import { connect } from 'react-redux'

import ChooseDialog from './ChooseDialog'
import FirstDialog from './FirstDialog'
import SecondDialog from './SecondDialog'
import ThirdDialog from './ThirdDialog'
import ForthDialog from './ForthDialog'
import RootReducer from './../../redux/RootReducer';
const styles = {
 
}
const DialogState={
  open: false,
  selectedValue: "",
  firstDialogOpen:false,
  secondDialogOpen:false,
  secondTabIndex:0,
  thirdDialogOpen:false,
  forthDialogOpen:false  
};
class ObligeeModule extends Component {



  render() {
    const { projectName,ObligeeData,TableData,haveSaved
    } = this.props
  
    return (

      <div>
        
          <ChooseDialog projectName={projectName} ObligeeData={ObligeeData} sketchHaveSaved={haveSaved}/>
          <FirstDialog   TableData={TableData} />
          <SecondDialog    TableData={TableData}/>
          <ThirdDialog    TableData={TableData}/>
          <ForthDialog   TableData={TableData}/>
   
      </div>

    )
  }

}

const mapStateToProps = (state, ownProps) => {
  var test=ownProps.ObligeeData.ProjectName;
  var test1=state.ObContentReducer
  console.log(ownProps)
  return {
    projectName:ownProps.ObligeeData.ProjectName,
    TableData:state.ObContentReducer,
    haveSaved:state.sketchReduce.haveSaved,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps)
  return {
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'ObligeeModule' })(ObligeeModule));

// Reducer
const obligeeReducer=(state = DialogState, action)=> {
  
   
  switch (action.type) {
    case 'search':
      alert("属性查询");
    return state;
    
  case 'clickIcon':
    console.log(action.payload)
    if(action.payload.Loaded=== false){
      alert("Error_import_002:请选择项目或检查数据是否成功导入！");
    }else{
      if(action.payload.sketchHaveSaved===false){
        alert("请先保存草图绘制数据！");
      }else{
        return Object.assign({}, state, {open:true});
      }
      return{...state}
    }
     
  case 'closeChoose':
  return Object.assign({}, state, {
        	open:false
      });
    case 'choose':
    switch(action.payload.choice)
    {
      case 1:return Object.assign({}, state, {
        open: false,
        	firstDialogOpen:true
      });

      case 2:return Object.assign({}, state, {
        open: false,
          secondDialogOpen:true,
          secondTabIndex:0
      });

      case 3:return Object.assign({}, state, {
        open: false,
          secondDialogOpen:true,
          secondTabIndex:1
      });

      case 4:return Object.assign({}, state, {
        open: false,
          secondDialogOpen:true,
          secondTabIndex:2
      });

      case 5:return Object.assign({}, state, {
        open: false,
        thirdDialogOpen:true
      });

      case 6:return Object.assign({}, state, {
        open: false,
        	forthDialogOpen:true
      });
    }
   break;
     case 'close':
  
   switch(action.payload.choice)
    {
      case 1:return Object.assign({}, state, {
        	firstDialogOpen:false
      });

      case 2:return Object.assign({}, state, {
        	secondDialogOpen:false
      });

      case 3:return Object.assign({}, state, {
        	secondDialogOpen:false
      });

      case 4:return Object.assign({}, state, {
        	secondDialogOpen:false
      });

      case 5:return Object.assign({}, state, {
        	thirdDialogOpen:false
      });

      case 6:return Object.assign({}, state, {
        	forthDialogOpen:false
      });
  
    }
    break;
    default:
      return state
  }
}

// Store
//const store = createStore(obligeeReducer);

RootReducer.merge(obligeeReducer);