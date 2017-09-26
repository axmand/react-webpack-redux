import React, { Component } from 'react';
import  InputCell from './InputCell';
import SelectCell from './SelectCell';
import DateInputCell from './DateInputCell'
class ObligeeTable3 extends Component {  
  render() {
    
    var table=(  
<table className="mytable">
     
    <tbody >

  <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >批准用途 </p></td>
    <td width="24%" colSpan="7"><SelectCell tableIndex="f1" name="PermittedUsefor" title="批准用途" tips="土地权属来源材料或用地批准文件中经政府批准的土地用途，用汉字表示" items="地表 地上 地下"/></td>
    <td width="14%" colSpan="3" rowSpan="2"><p >实际用途 </p></td>
    <td width="33%" colSpan="6"><SelectCell tableIndex="f1" name="PracticalUsefor" title="实际用途" tips="土地权属来源材料或用地批准文件中经政府批准的土地用途，用汉字表示" items="地表 地上 地下"/></td>
  </tr>
  <tr>
    <td width="12%" colSpan="2"><p >地类编码 </p></td>
    <td width="12%" colSpan="5"><InputCell tableIndex="f1" name="PermittedTypeCode" title="地类编码" tips="地类编码按照《土地利用现状分类》（GB/T 21010-2007）填写至二级类，用阿拉伯数字表示"/></td>
    <td width="18%" colSpan="5"><p >地类编码 </p></td>
    <td width="14%"><InputCell  name="PracticalTypeCode" tableIndex="f1" title="地类编码" tips="地类编码按照《土地利用现状分类》（GB/T 21010-2007）填写至二级类，用阿拉伯数字表示"/></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >批准面积（m2） </p></td>
    <td width="12%" colSpan="2" rowSpan="2"><InputCell tableIndex="f1" name="PermittedArea" title="批准面积（m2）" tips="填写批准面积（m2）"/></td>
    <td width="12%" colSpan="5" rowSpan="2"><p >宗地面积（m2） </p></td>
    <td width="14%" colSpan="3" rowSpan="2"><InputCell tableIndex="f1" name="ParcelArea" title="宗地面积（m2）" tips="填写宗地面积（m2）"/></td>
    <td width="18%" colSpan="5"><p >建筑占地 <br />
      总面积(m2) </p></td>
    <td width="14%"><InputCell tableIndex="f1" name="BuildLandArea" title="建筑占地总面积" tips="填写建筑占地总面积"/></td>
  </tr>
  <tr>
    <td width="18%" colSpan="5"><p >建筑总面积(m2) </p></td>
    <td width="14%"><InputCell tableIndex="f1" name="BuildTotalArea" title="建筑总面积" tips="填写建筑总面积"/></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >土地使用期限 </p></td>
    <td width="72%" colSpan="16"><DateInputCell tableIndex="f1" name="LandUseStartTime" title="使用起始时间" tips="填写使用起始时间"/>至<DateInputCell tableIndex="f1" name="LandUseEndTime" title="使用结束时间" tips="填写使用结束时间"/></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >共有／共用权利人 <br />
      情况 </p></td>
    <td width="72%" colSpan="16"><InputCell tableIndex="f1" name="CommonUse" title="共有／共用权利人" tips="填写共有／共用权利人"/></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >说明 </p></td>
    <td width="72%" colSpan="16"><InputCell tableIndex="f1" name="Explain" title="说明" tips="填写备注信息"/></td>
  </tr> 
   </tbody>
</table>
 )
        return table;
  }
}

export default ObligeeTable3;