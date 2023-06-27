import Tooltip  from '../components/tooltip';
import { memo, useState } from 'react';
import { Handle, Position, NodeToolbar } from 'reactflow';

const Node = ({ data }) => {
  const [isVisible, setVisible] = useState(false);

  let label = data.label
  if (data.label.length>7){
    label = label.toUpperCase()
    if (label.includes('PACKAGE')){
      data.label = 'Package'
    } else if (label.includes('ELECTIVE')){
      data.label = 'Elective'
    }
  }

  return (
    <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <NodeToolbar isVisible={isVisible} position={data.pos}>
        <div>
          <Tooltip name={data.values[1]} complexity={data.values[11]} delay={data.values[12]} block={data.values[13]} 
            cr_hrs={data.values[7]} dfwi={data.dfwi}/>
        </div>
      </NodeToolbar>
        <div style={{ 
          height: 40,
          width: 75,
          padding: 12, 
          fontSize: 12, 
          border: '1px solid #000000', 
          background: 'white', borderRadius: 10, 
          }} 
          className={data.class}>
            {data.label}
        </div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(Node);