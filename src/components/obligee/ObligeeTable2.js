import React, { Component } from 'react';
import  {InputCell1,InputCell2} from './InputCell'
class ObligeeTable2 extends Component {  
  render() {
    
    var table=(
        <table className="mytable">
     
    <tbody >
  <tr>
    <td width="27%" colSpan="2"><InputCell1 command="changeOwner"/></td>
     {/* <td width="27%" colSpan="2"><p >权利设定方式<u> </u></p></td> */}
    <td width="72%" colSpan="16"><p >地表 </p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >国民经济行业 <br />
      分类代码 </p></td>
    <td width="72%" colSpan="16"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >预编宗地代码 </p></td>
    <td width="25%" colSpan="8"><p >&nbsp;</p></td>
    <td width="14%" colSpan="3"><p >宗地代码 </p></td>
    <td width="32%" colSpan="5"><p >450108001206GB00137</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >不动产单元号 </p></td>
    <td width="72%" colSpan="16"><p >450108001206GB00137W00000000</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >所在图幅号 </p></td>
    <td width="13%" colSpan="3"><p >比例尺 </p></td>
    <td width="59%" colSpan="13"><p >1:500</p></td>
  </tr>
  <tr>
    <td width="13%" colSpan="3"><p >图幅号 </p></td>
    <td width="59%" colSpan="13"><p >5100053700,5102553700</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2" rowSpan="4"><p >宗地四至 </p></td>
    <td width="72%" colSpan="16"><p >北：011DBL-011DBG云村路 </p></td>
  </tr>
  <tr>
    <td width="72%" colSpan="16"><p >东：011DBG-011DBQ南宁市国圳投资有限公司 </p></td>
  </tr>
  <tr>
    <td width="72%" colSpan="16"><p >南：011DBQ-011DBP国有土地 </p></td>
  </tr>
  <tr>
    <td width="72%" colSpan="16"><p >西：011DBP-011DBL英岭路 </p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >等级 </p></td>
    <td width="24%" colSpan="7"><p >&nbsp;</p></td>
    <td width="22%" colSpan="6"><p >价格（元） </p></td>
    <td width="25%" colSpan="3"><p >&nbsp;</p></td>
  </tr>
 
   </tbody>
</table>
    )
        return table;
  }
}

export default ObligeeTable2;