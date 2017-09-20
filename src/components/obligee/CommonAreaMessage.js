import React, { Component } from 'react';
import InputCell from './InputCell'
import PropTypes from 'prop-types'



import { Provider, connect } from 'react-redux'

// Map Redux state to component props
function mapStateToProps(state) {


  
  return {

    FixedCount:state.FixedCount,
    FixedCode:state.FixedCode,
    LandOwnUseArea:state.LandOwnUseArea,
    LandUniqueArea:state.LandUniqueArea,
    CommonArea:state.CommonArea
//     startPoint:state.StartPointCodeList,
//     innerPoint:state.InnerPointCodeList,
// endPoint:state.EndPointCodeList
    
    
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
//修改命令 修改的字段名 修改字段的值
    onCompleteInput: (inputData,name) => {

      dispatch({
        type: "change", 
        payload: {
          inputValue: inputData,
          inputName: name

        }
      });
    }
  }
}
class CommonAreaMessage extends Component {  

   
  render() {
    const { FixedCount,FixedCode,LandOwnUseArea,LandUniqueArea,CommonArea } = this.props;

    var tableContent=[];


   var tableHead=( <tr>
    <td width="143"><p >定着物代码 </p></td>
    <td width="150"><p >土地所有权／使用权面积（m2） </p></td>
    <td width="157"><p >独有／独用土地面积（m2） </p></td>
    <td width="154"><p >分摊土地面积 <br />
      （m2） </p></td>
  </tr>);
  tableContent.push(tableHead);
  
  
  for(var index=0;index<FixedCode.length;index++)
    {
        var obj=(
        <tr>
      <td width="143"><p >{FixedCode[index]}</p></td>
            <td width="150"><p >{LandOwnUseArea[index]}</p></td>
            <td width="157"><p >{LandUniqueArea[index]}</p></td>
            <td width="154"><p >{CommonArea[index]}</p></td>
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
// export default CommonAreaMessage;