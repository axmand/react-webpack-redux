import React, { Component } from 'react';
import  InputCell from './InputCell'
import SelectCell from './SelectCell'
class ObligeeTable1 extends Component {  
  render() {
//用于封装宗地基本信息表第一页
    var table=(
        <table className="mytable">
    
            <tbody >

            <tr>
        
          
            <td width="9%" rowSpan="5"><p >权利人</p ></td> 
            <td width="18%"><p >所有权</p></td>
            <td width="72%" colSpan="16"><InputCell  name="OwnPowerSide" title="所有权" tips="填写。。。" tableIndex="F1"/></td>
        </tr>
            <tr>
            <td width="18%" rowSpan="4"><p >使用权</p ></td>
            <td width="21%" colSpan="5" rowSpan="4"><InputCell  name="UsePowerSide" title="使用权" tableIndex="F1" tips="此处填写使用权人信息，如企业名称、个人名称等"/></td>
            <td width="23%" colSpan="7"><p >权利人类型 </p></td>
            <td width="27%" colSpan="4"><SelectCell tableIndex="F1" name="PowerSideType" title="权利人类型" tips="此处选择权利人类型，无法归类的填写其他" items="个人 企业 事业单位 国家机关 其他"/></td>
        </tr>
        <tr>
            <td width="23%" colSpan="7"><p >证件种类 </p></td>
            <td width="27%" colSpan="4"><SelectCell tableIndex="F1" name="PowerSideCertificateType" title="证件种类" tips="此处选择证件种类" items="身份证 户口本 营业执照 学生证"/></td>
        </tr>
        <tr>
            <td width="23%" colSpan="7"><p >证件号 </p></td>
            <td width="27%" colSpan="4"><InputCell tableIndex="F1" name="PowerSideCertificateCode" title="证件号码" tips="填写证件号码"/></td>
        </tr>
        <tr>
         <td width="23%" colSpan="7"><p >通讯地址 </p></td>
            <td width="27%" colSpan="4"><InputCell tableIndex="F1" name="PowerSideAddress" title="通信地址" tips="填写权利人通信地址"/></td>
        </tr>
        <tr>
    <td width="27%" colSpan="2"><p >权利类型 </p></td>
    <td width="14%" colSpan="4"><SelectCell tableIndex="F1" name="PowerType" title="权利类型" tips="此处选择权利类型" items="集体土地所有权 国家土地所有权 国有建设用地使用权 宅基地使用权 集体建设用地使用权 土地承包经营权 林地使用权 草原使用权 水域滩涂养殖权"/></td>
    <td width="15%" colSpan="5"><p >权利性质 </p></td>
    <td width="14%" colSpan="3"><InputCell tableIndex="F1" name="PowerCharacter" title="权利性质" tips="填写权利性质"/></td>
    <td width="12%" colSpan="3"><p >土地权属来源证明材料 </p></td>
    <td width="14%"><InputCell tableIndex="F1" name="LandPowerCertificatePaper" title="土地权属来源证明材料" tips="填写土地权属来源证明材料名称及其编号"/></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >坐落 </p></td>
    <td width="72%" colSpan="16"><InputCell tableIndex="F1" name="Location" title="坐落" tips="填写土地坐落"/></td>
  </tr>
 <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >法定代表人 <br />
      或负责人姓名 </p></td>
    <td width="11%" rowSpan="2"><InputCell tableIndex="F1"  name="PrincipalName" title="法定代表人或负责人姓名" tips="填写法定代表人或负责人姓名"/></td>
    <td width="11%" colSpan="5"><p >证件种类 </p></td>
    <td width="23%" colSpan="7"><SelectCell tableIndex="F1" name="PrincipalCertificateType" title="证件种类" tips="此处选择证件种类" items="身份证 户口本 营业执照 学生证"/></td>
    <td width="7%" rowSpan="2"><p >电话 </p></td>
    <td width="17%" colSpan="2" rowSpan="2"><InputCell tableIndex="F1" name="PrincipalCertificateTelephone" title="法定代表人或负责人电话号码" tips="填写法定代表人或负责人电话号码"/></td>
  </tr>
  <tr>
    <td width="11%" colSpan="5"><p >证件号 </p></td>
    <td width="23%" colSpan="7"><InputCell tableIndex="F1" name="PrincipalCertificateCode" title="法定代表人或负责人证件号码" tips="填写法定代表人或负责人证件号码"/></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >代理人姓名 </p></td>
    <td width="11%" rowSpan="2"><InputCell tableIndex="F1" name="ProcuratorName" title="代理人姓名" tips="填写代理人姓名"/></td>
    <td width="11%" colSpan="5"><p >证件种类 </p></td>
    <td width="23%" colSpan="7"><SelectCell tableIndex="F1" name="ProcuratorCertificateType" title="证件种类" tips="此处选择证件种类" items="身份证 户口本 营业执照 学生证"/></td>
    <td width="7%" rowSpan="2"><p >电话 </p></td>
    <td width="17%" colSpan="2" rowSpan="2"><InputCell tableIndex="F1" name="ProcuratorCertificateTelephone" title="代理人电话号码" tips="填写代理人电话号码"/></td>
  </tr>
  <tr>
    <td width="11%" colSpan="5"><p >证件号 </p></td>
    <td width="23%" colSpan="7"><InputCell tableIndex="F1" name="ProcuratorCertificateCode" title="代理人证件号码" tips="填写代理人证件号码"/></td>
  </tr>
  
    </tbody>
        </table>
    )
        return table;
  }
}

export default ObligeeTable1;