import React, { Component } from 'react';
import InputCell from './InputCell'
import { Provider, connect } from 'react-redux'




class BoundarySpecification extends Component {  
  render() {
    
    var table=(  
<table className="mytable" height="373">
     
    <tbody >
 <tr>
    <td width="108"><p>界址点位说明 </p></td>
    <td width="496" >
      <InputCell name="BoundaryPointExplain" title="界址点位说明" tips="此处填写界址点位说明,如：2号点位于两沟渠中心线的交点上，5号界址点位于xx山顶最高处"/>
      
      </td>
  </tr>
  <tr>
    <td width="108"><p>主要权属界线 <br />
      走向说明 </p></td>

      <InputCell name="MainBoundaryDirectionExplain" title="主要权属界线走向说明" tips="此处填写主要权属界线走向说明,如：1-2，由1沿xx公路中央走向至2；4-5，由4沿着山脊线至5"/>
  
</tr>
   </tbody>
</table>
 )
        return table;
  }
}

export default BoundarySpecification;
