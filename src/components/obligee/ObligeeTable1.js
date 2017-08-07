import React, { Component } from 'react';
import  {InputCell1,InputCell2} from './InputCell'
class ObligeeTable1 extends Component {  
  render() {
    //const { value, onShowClick,onCompleteInput,dialogShow } = this.props;
    var table=(
        <table className="mytable">
    
            <tbody >

            <tr>
   
            <td width="9%" rowSpan="5"><InputCell1 command="changeOwner"/></td> 
            <td width="18%"><p >所有权 </p></td>
            <td width="72%" colSpan="16"><p >/ </p></td>
        </tr>
            <tr>
            <td width="18%" rowSpan="4"><InputCell2 command="changeUser"/></td>
            <td width="21%" colSpan="5" rowSpan="4"><p >xxxxxxxxxxxxx</p></td>
            <td width="23%" colSpan="7"><p >权利人类型 </p></td>
            <td width="27%" colSpan="4"><p >企业 </p></td>
        </tr>
        <tr>
            <td width="23%" colSpan="7"><p >证件种类 </p></td>
            <td width="27%" colSpan="4"><p >营业执照 </p></td>
        </tr>
        <tr>
            <td width="23%" colSpan="7"><p >证件号 </p></td>
            <td width="27%" colSpan="4"><p >xxxxxxx</p></td>
        </tr>
        <tr>
         <td width="23%" colSpan="7"><p >通讯地址 </p></td>
            <td width="27%" colSpan="4"><p >&nbsp;</p></td>
        </tr>
        <tr>
    <td width="27%" colSpan="2"><p >权利类型 </p></td>
    <td width="14%" colSpan="4"><p >国有建设用地使用权 </p></td>
    <td width="15%" colSpan="5"><p >权利性质 </p></td>
    <td width="14%" colSpan="3"><p >出让 </p></td>
    <td width="12%" colSpan="3"><p >土地权属来源证明材料 </p></td>
    <td width="14%"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >坐落 </p></td>
    <td width="72%" colSpan="16"><p >南宁市五象新区云村路南侧、英岭路东侧 </p></td>
  </tr>
 <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >法定代表人 <br />
      或负责人姓名 </p></td>
    <td width="11%" rowSpan="2"><p >赵勇 </p></td>
    <td width="11%" colSpan="5"><p >证件种类 </p></td>
    <td width="23%" colSpan="7"><p >身份证 </p></td>
    <td width="7%" rowSpan="2"><p >电话 </p></td>
    <td width="17%" colSpan="2" rowSpan="2"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="11%" colSpan="5"><p >证件号 </p></td>
    <td width="23%" colSpan="7"><p >xxxxxxxxxxxxxxx</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >代理人姓名 </p></td>
    <td width="11%" rowSpan="2"><p >&nbsp;</p></td>
    <td width="11%" colSpan="5"><p >证件种类 </p></td>
    <td width="23%" colSpan="7"><p >&nbsp;</p></td>
    <td width="7%" rowSpan="2"><p >电话 </p></td>
    <td width="17%" colSpan="2" rowSpan="2"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="11%" colSpan="5"><p >证件号 </p></td>
    <td width="23%" colSpan="7"><p >&nbsp;</p></td>
  </tr>
  
    </tbody>
        </table>
    )
        return table;
  }
}

export default ObligeeTable1;