import React, { Component } from 'react';
import InputCell from './InputCell'
import PropTypes from 'prop-types'

class CommonAreaMessage extends Component {  

   
  render() {
    const { rowCount } = this.props;

    var tableContent=[];


   var tableHead=( <tr>
    <td width="143"><p >定着物代码 </p></td>
    <td width="150"><p >土地所有权／使用权面积（m2） </p></td>
    <td width="157"><p >独有／独用土地面积（m2） </p></td>
    <td width="154"><p >分摊土地面积 <br />
      （m2） </p></td>
  </tr>);
  tableContent.push(tableHead);
  
  
  for(var index=0;index<5;index++)
    {
        var obj=(
        <tr>
            <td width="143"><p >&nbsp;</p></td>
            <td width="150"><p >&nbsp;</p></td>
            <td width="157"><p >&nbsp;</p></td>
            <td width="154"><p >&nbsp;</p></td>
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
export default CommonAreaMessage;