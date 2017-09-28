import React, { Component } from 'react';
import InputCell from './InputCell';
import CommonAreaMessage from './CommonAreaMessage'
import { Provider, connect } from 'react-redux'

class CommonAreaTable extends Component {  
  render() {
    
    var table=(  
      <div>
<table className="mytable">
     
    <tbody >

  <tr>
    <td width="143"><p >土地坐落 </p></td>
    <td width="461" colSpan="3"><InputCell tableIndex="F1" name="Location" title="坐落" tips="填写土地坐落"/></td>
  </tr>
  <tr>
    <td width="143"><p >宗地代码 </p></td>
    <td width="461" colSpan="3"><InputCell tableIndex="F1" name="ParcelCode" title="宗地代码" tips="填写宗地代码"/></td>
  </tr>
  <tr>
    <td width="143"><p >宗地面积(m2) </p></td>
    <td width="150"><InputCell tableIndex="F1" name="ParcelArea" title="宗地面积" tips="填写宗地面积"/></td>
    <td width="157"><p >定着物单元数 </p></td>
    <td width="154"><InputCell tableIndex="F7" name="FixedCount" title="宗地面积" tips="填写宗地面积"/></td>
  </tr>
   </tbody>
</table>

<CommonAreaMessage  tableIndex="F7"/>

<table className="mytable">

<tr>
    <td width="143"><p >备注 </p></td>
    <td width="461" colSpan="3"><InputCell tableIndex="F1"  name="Explain" title="备注" tips="填写备注"/></td>
  </tr>
</table>
</div>
 )
        return table;
  }
}

export default CommonAreaTable;