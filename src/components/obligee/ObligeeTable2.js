import React, { Component } from 'react';
import  InputCell from './InputCell';
import SelectCell from './SelectCell';

class ObligeeTable2 extends Component {  
  render() {
    
    var table=(
        <table className="mytable">
     
    <tbody >
  <tr>
     <td width="27%" colSpan="2"><p >权利设定方式<u> </u></p></td>
    <td width="72%" colSpan="16"><SelectCell tableIndex="F1" name="PowerSetPattern" title="权利设定方式" tips="此处选择权利设定方式" items="1 2 3"/></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >国民经济行业 <br />
      分类代码 </p></td>
    <td width="72%" colSpan="16"><InputCell tableIndex="F1" name="NationalEconomyIndustryClassificationCode" title="国民经济行业分类代码" tips="根据《国民经济行业分类与代码》（GB/T 4754-2011）大类标准，填写类别名称及编码。"/></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >预编宗地代码 </p></td>
    <td width="25%" colSpan="8"><InputCell tableIndex="F1" name="PreParcelCode" title="预编宗地代码" tips="填写预编宗地代码"/></td>
    <td width="14%" colSpan="3"><p >宗地代码 </p></td>
    <td width="32%" colSpan="5"><InputCell tableIndex="F1" name="ParcelCode" title="宗地代码" tips="填写宗地代码"/></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >不动产单元号 </p></td>
    <td width="72%" colSpan="16"><InputCell tableIndex="F1" name="UnitNumber" title="不动产单元号" tips="填写不动产单元号"/></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >所在图幅号 </p></td>
    <td width="13%" colSpan="3"><p >比例尺 </p></td>
    <td width="59%" colSpan="13"><SelectCell tableIndex="F1" name="MapScale" title="比例尺" tips="此处选择图幅比例尺" items="1：500 1：1000 1：2000 1：5000 1：1万 1：5万"/></td>
  </tr>
  <tr>
    <td width="13%" colSpan="3"><p >图幅号 </p></td>
    <td width="59%" colSpan="13"><InputCell tableIndex="F1" name="MapCode" title="图幅号" tips="填写图幅号"/></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2" rowSpan="4"><p >宗地四至 </p></td>
    <td width="13%" colSpan="3">北</td>
    <td width="59%" colSpan="16"><InputCell tableIndex="F1" name="ParcelRangeNorth" title="宗地四至_北" tips="填写宗地四至_北"/></td>
  </tr>
  <tr>
  <td width="13%" colSpan="3">东</td>
    <td width="59%" colSpan="16"><InputCell tableIndex="F1" name="ParcelRangeEast" title="宗地四至_东" tips="填写宗地四至_东"/></td>
  </tr>
  <tr>
  <td width="13%" colSpan="3">南</td>
    <td width="59%" colSpan="16"><InputCell tableIndex="F1" name="ParcelRangeSouth" title="宗地四至_南" tips="填写宗地四至_南"/></td>
  </tr>
  <tr>
  <td width="13%" colSpan="3">西</td>
    <td width="59%" colSpan="16"><InputCell tableIndex="F1"  name="ParcelRangeWest" title="宗地四至_西" tips="填写宗地四至_西"/></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >等级 </p></td>
    <td width="24%" colSpan="7"><InputCell tableIndex="F1" name="Rank" title="等级" tips="填写根据《城镇土地分等定级规程》、《农用地质量分等规程》或《农用地定级规程》等确定的土地等别或级别"/></td>
    <td width="22%" colSpan="6"><p >价格（元） </p></td>
    <td width="25%" colSpan="3"><InputCell tableIndex="F1" name="Price" title="价格（元）" tips="填写价格"/></td>
  </tr>
 
   </tbody>
</table>
    )
        return table;
  }
}

export default ObligeeTable2;