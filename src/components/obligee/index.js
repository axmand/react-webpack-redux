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
    const { projectName,ObligeeData
    } = this.props
  
    return (

      <div>
        
          <ChooseDialog projectName={projectName} ObligeeData={ObligeeData}/>
          <FirstDialog   ObligeeData={ObligeeData} />
          <SecondDialog    ObligeeData={ObligeeData}/>
          <ThirdDialog   ObligeeData={ObligeeData}/>
          <ForthDialog  ObligeeData={ObligeeData}/>
   
      </div>

    )
  }

}

const mapStateToProps = (state, ownProps) => {
  var test=ownProps.ObligeeData.ProjectName;
  return {
    projectName:ownProps.ObligeeData.ProjectName
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  
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
    if(action.payload=== false)
    {
      alert("Error_import_002:请选择项目或检查数据是否成功导入！");
      return state
    }
  else

    {return Object.assign({}, state, {
        	open:true
      });}
     
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