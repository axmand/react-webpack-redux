import React, { Component } from 'react';
// import InputCell from './InputCell'
import PropTypes from 'prop-types'
import ListInputCell from './ListInputCell'


import { connect } from 'react-redux'

// Map Redux state to component props
const mapStateToProps=(state,ownProps)=> {


  
  return {

    FixedCount:state.ObContentReducer["F7"].FixedCount,
    FixedCode:state.ObContentReducer["F7"].FixedCode,
    LandOwnUseArea:state.ObContentReducer["F7"].LandOwnUseArea,
    LandUniqueArea:state.ObContentReducer["F7"].LandUniqueArea,
    CommonArea:state.ObContentReducer["F7"].CommonArea
//     startPoint:state.StartPointCodeList,
//     innerPoint:state.InnerPointCodeList,
// endPoint:state.EndPointCodeList
    
    
  };
}

// Map Redux actions to component props
const mapDispatchToProps=(dispatch,ownProps) =>{
  return {
//修改命令 修改的字段名 修改字段的值
    onCompleteInput: (inputData,name,tableID) => {

      dispatch({
        type: "change", 
        payload: {
          inputValue: inputData,
          inputName: name,
          tableID:tableID
        }
      });
    }
  }
}
class CommonAreaMessage extends Component {  

   
  render() {
    const { 
       FixedCount,
      FixedCode,
      // LandOwnUseArea,
      // LandUniqueArea,
      // CommonArea,
      tableIndex 
    } = this.props;

    var tableContent=[];


   var tableHead=( <tr>
    <td width="143"><p >定着物代码 </p></td>
    <td width="150"><p >土地所有权／使用权面积（m2） </p></td>
    <td width="157"><p >独有／独用土地面积（m2） </p></td>
    <td width="154"><p >分摊土地面积 <br />
      （m2） </p></td>
  </tr>);
  tableContent.push(tableHead);
  
  
  for(var index=0;index<FixedCount;index++)
    {
        var obj=(
        <tr>
      <td width="143"><p >   <ListInputCell tableIndex={tableIndex} name="FixedCode" row={index} tips="..." title="..."/></p></td>

   
          

            <td width="150"><ListInputCell tableIndex={tableIndex} name="LandOwnUseArea" row={index} tips="..." title="..."/></td>
            <td width="157"><ListInputCell tableIndex={tableIndex}  name="LandUniqueArea" row={index} tips="..." title="..."/></td>
            <td width="154"><ListInputCell tableIndex={tableIndex}  name="CommonArea" row={index} tips="..." title="..."/></td>
        </tr>
        );
        tableContent.push(obj);
    }
    
    var table=(  

     <table className="mytable">
    <tbody >
{tableContent}
   </tbody>
   </table>
 )
        return table;
  }
}
CommonAreaMessage.propTypes = {
 
    rowCount: PropTypes.number.isRequired,
  }


  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommonAreaMessage)
