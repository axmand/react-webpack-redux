import React, { Component } from 'react';

class BoundarySpecification extends Component {  
  render() {
    
    var table=(  
<table className="mytable" height="373">
     
    <tbody >
 <tr>
    <td width="108"><p>界址点位说明 </p></td>
    <td width="496" ><p>如：2号点位于两沟渠中心线的交点上，5号界址点位于xx山顶最高处，3号界址点位于xx工厂围墙西北角处，8号界址点位于农村道路与xx公路交叉点中心等等 </p></td>
  </tr>
  <tr>
    <td width="108"><p>主要权属界线 <br />
      走向说明 </p></td>
    <td width="496"><p>如：1-2，由1沿xx公路中央走向至2；4-5，由4沿着山脊线至5；9-10，由9沿xx学校东侧围墙至10等等。 </p></td>
</tr>
   </tbody>
</table>
 )
        return table;
  }
}

export default BoundarySpecification;