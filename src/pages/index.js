import Image from 'next/image'
import StudyPlanMenu from '@/components/menu'
import {useState} from 'react'
import {ReactFlow} from 'reactflow';
import Node from '../components/node';
import {SmartBezierEdge} from '@tisoap/react-flow-smart-edge'
import 'reactflow/dist/style.css'

export default function Home() {

  const [studyPlan,setStudyPlan] = useState('')
  const [terms,setTerms] = useState(0)
  const [nodes,setNodes] = useState([])
  const [edges,setEdges] = useState([])
  const [selectedNode,setSelectedNode] = useState(0)
  const [selection, setSelection] = useState(false)

  const nodeTypes = {
    customNode: Node,
  };

  const edgeTypes = {
    smart: SmartBezierEdge
  } 

  const updateSourceEdges = (id,sourceEdges,updatedEdges,animate) => {
    for (let i=0;i<edges.length;i++){
      if (edges[i]['target'] == id) {
        if (!updatedEdges.includes(edges[i].id)){
          updatedEdges.push(edges[i].id)
          edges[i].animated = animate
          sourceEdges.push(edges[i])
        }
        updateSourceEdges(edges[i]['source'],sourceEdges,updatedEdges, animate)
      }
    }
    return sourceEdges
  }

  const updateTargetEdges = (id,targetEdges,updatedEdges,animate) => {
    for (let i=0;i<edges.length;i++){
      if (edges[i]['source'] == id) {
        if (!updatedEdges.includes(edges[i].id)){
          edges[i].animated = animate
          targetEdges.push(edges[i])
        }
        updateTargetEdges(edges[i]['target'],targetEdges,updatedEdges, animate)
      }
    }
    return targetEdges
  }

  const updateNodes = (id,newEdges,design) => {
    if (design!=''){
      nodes[id-1].data.class = 'ring-2 ring-green-100 ring-offset-2 ring-offset-green-300 shadow-md shadow-zinc-300'
    } else {
      nodes[id-1].data.class = ''
    }
    let updatedNodes = [id]
    for (let i=0;i<newEdges.length;i++){
      if (!(updatedNodes.includes(newEdges[i]['source']))){
        nodes[newEdges[i]['source']-1].data.class = design
      }
      if (!(updatedNodes.includes(newEdges[i]['target']))){
        nodes[newEdges[i]['target']-1].data.class = design
      }     
    }
  }

  const update = (id,animate) => {
    let updatedEdges = []
    let sourceEdges = updateSourceEdges(id,[],[],animate)
    let targetEdges = updateTargetEdges(id,[],[],animate)
    updatedEdges = sourceEdges.concat(targetEdges)
    if (animate) {
      updateNodes(id,updatedEdges,'ring-1 ring-zinc-500 shadow-md shadow-zinc-300')
    } else {
      updateNodes(id,updatedEdges,'')
    }
    let newEdges = []
    for (let i=0;i<edges.length;i++) {
      newEdges.push(edges[i])
    }
    setEdges(newEdges)
  }

  const onNodeClick = (e,node) => {

    if (selection && selectedNode!=node.id) {
      update(selectedNode, false)
      setSelectedNode(node.id)
      update(node.id,true)
    } else if (selection && selectedNode==node.id) {
      update(node.id, false)
      setSelection(false)
      setSelectedNode(0)
    } else if (!selection){
      update(node.id, true)
      setSelection(true)
      setSelectedNode(node.id)
    }

  }

  const onPaneClick = (e) => {
    let newEdges = []
    for (let i=0;i<edges.length;i++) {
      if (edges[i].animated == true){
        edges[i].animated = false
      }
      newEdges.push(edges[i])
    }
    for (let i=0;i<nodes.length;i++) {
      if (nodes[i].data.class != '') {
        nodes[i].data.class = ''
      }
    }
    setEdges(newEdges)
  }

  return (
    <main
      className="flex min-h-screen flex-col bg-teal-50"
    > 
      <div class="grid grid-cols-2 gap-96 box-border h-15 w-screen bg-gray-950">
        <StudyPlanMenu 
          studyPlan={studyPlan} setStudyPlan={setStudyPlan} 
          setNodes={setNodes} setEdges={setEdges} 
          setTerms={setTerms}/>
        <div className='relative top-2 left-72 border-gray-900 bg-white w-32 h-18 p-2 rounded-md'>
            <div className='flex flex-row gap-x-2 justify-center'>
              <Image src='/QU.PNG' width={50} height={50}/>
              <div className='border border-slate-100'></div>
              <Image src='/Student Affairs.PNG' width={40} height={40}/> 
            </div>
        </div>
      </div>
      
      <div className='grid justify-items-center'>
        {
          studyPlan!='' &&
          <h1 className="text-xl font-medium tracking-wide">{`${studyPlan} (Fall 2021)`}</h1>
        }
      </div>
    
      <div className='relative left-9 top-5 h-12 w-screen'>
        <Terms terms={terms}/>
      </div>


      <div style={{ width: '100vw', height: '100vh' } }> 
        <ReactFlow nodes={nodes} edges={edges} 
          nodeTypes={nodeTypes} edgeTypes={edgeTypes} 
          zoomOnScroll={false} preventScrolling={false} 
          panOnDrag={false} nodesConnectable={false}
          onNodeClick={onNodeClick} onPaneClick={onPaneClick}
        >
          {
            studyPlan!='' &&
            <div className='fixed bottom-2 right-4 flex flex-row border-[1.5px] border-gray-900 bg-white w-52 h-18 p-2 rounded-md z-30'>
              <div className='grid grid-rows-2'>
                <h1 className='italic'>Prerequisite</h1>
                <h1 className='italic'>Corequisite</h1>
              </div>
              <div className='relative top-2 left-2 grid grid rows-2'>
                <Image src='/prerequisite.png' width={90} height={15}/>
                <Image src='/corequisite.png' width={90} height={15}/>
              </div>   
            </div>
          }    
        </ReactFlow>
      </div>
    </main>
    
  )
}

function Terms({terms}) {
  let name = 'box-border border-3 rounded-xl border-sky-900 bg-zinc-50 w-20 h-9 text-sky-950 shadow-md font-medium text-sm text-center pt-1 tracking-wide'
  if (terms == 8 ){
    return (
      <div className='flex flex-row gap-18'>
        <div className={name}>Term 1</div>
        <div className={name}>Term 2</div>
        <div className={name}>Term 3</div>
        <div className={name}>Term 4</div>
        <div className={name}>Term 5</div>
        <div className={name}>Term 6</div>
        <div className={name}>Term 7</div>
        <div className={name}>Term 8</div>
      </div>
    )
  } else if (terms == 9) {
    return (
      <div className='flex flex-row gap-18'>
        <div className={name}>Term 1</div>
        <div className={name}>Term 2</div>
        <div className={name}>Term 3</div>
        <div className={name}>Term 4</div>
        <div className={name}>Term 5</div>
        <div className={name}>Term 6</div>
        <div className={name}>Term 7</div>
        <div className={name}>Term 8</div>
        <div className={name}>Term 9</div>
      </div>
    )
  }
}
