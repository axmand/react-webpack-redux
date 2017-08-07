import React, { Component } from 'react';
import  {InputCell1,InputCell2} from './InputCell'
class ObligeeTable3 extends Component {  
  render() {
    
    var table=(  
<table className="mytable">
     
    <tbody >

  <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >批准用途 </p></td>
    <td width="24%" colSpan="7"><p >工业用地 </p></td>
    <td width="14%" colSpan="3" rowSpan="2"><p >实际用途 </p></td>
    <td width="33%" colSpan="6"><p >工业用地 </p></td>
  </tr>
  <tr>
    <td width="12%" colSpan="2"><p >地类编码 </p></td>
    <td width="12%" colSpan="5"><p >061</p></td>
    <td width="18%" colSpan="5"><p >地类编码 </p></td>
    <td width="14%"><p >061</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >批准面积（m2） </p></td>
    <td width="12%" colSpan="2" rowSpan="2"><p >13110.17</p></td>
    <td width="12%" colSpan="5" rowSpan="2"><p >宗地面积（m2） </p></td>
    <td width="14%" colSpan="3" rowSpan="2"><p >13110.17</p></td>
    <td width="18%" colSpan="5"><p >建筑占地 <br />
      总面积(m2) </p></td>
    <td width="14%"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="18%" colSpan="5"><p >建筑总面积(m2) </p></td>
    <td width="14%"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >土地使用期限 </p></td>
    <td width="72%" colSpan="16"><p >2016年11月01日起2066年11月01日止 </p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >共有／共用权利人 <br />
      情况 </p></td>
    <td width="72%" colSpan="16"><p>&nbsp;</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >说明 </p></td>
    <td width="72%" colSpan="16"><p >&nbsp;</p></td>
  </tr> 
   </tbody>
</table>
 )
        return table;
  }
}

export default ObligeeTable3;