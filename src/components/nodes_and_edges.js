import {MarkerType, Position} from 'reactflow';
import { getDfwi } from './dfwi';

export function getNodes(dataset) {
  const nodes = [];
  if (dataset.length==0){
    return []
  }
  const x = 40
  const y = 30
  let y_inc = 0
  let courseCount = [0,0,0,0,0,0,0,0,0]
  for (let i=1;i<dataset.length;i++){
    let courseId = dataset[i][0].toString()
    let courseCode = dataset[i][2] + dataset[i][3]
    let dfwi = getDfwi(courseCode)
    if (courseCode==0){
      courseCode = dataset[i][1]
      dfwi = 'N/A'
    }
    let term = dataset[i][10]
    y_inc = courseCount[term-1]
    courseCount[term-1] += 1
    let pos = Position.Right
    if (term==8 || term==9){
      pos = Position.Left
    }
    let node = {id: courseId, 
      type:'customNode',
      sourcePosition: 'right', 
      position: { x: x+(term-1)*140, y: y+(y_inc)*75 }, 
      data: { label: courseCode, values: dataset[i], dfwi: dfwi, pos: pos, clicked: false, class: '' }, 
      targetPosition: 'right', }
    nodes.push(node)
  }
  return nodes
}

export function getEdges(dataset) {
  const edges = []
  for (let i=1;i<dataset.length;i++) {
    let prerequisites = dataset[i][4]
    if (prerequisites!=null){
      if (typeof(prerequisites)=="number") {
        let source = dataset[i][4].toString()
        let target = dataset[i][0].toString()
        let edgeId = source + '-' + target 
        let edge = { id: edgeId, 
          source: source, 
          target: target, 
          type: 'smart',
          markerEnd: {type: MarkerType.Arrow, color: 'red'},
          borderRadius: 10,
          style: {stroke: 'red'},
          animated: false,
        }
        edges.push(edge)
      } else {
        prerequisites = prerequisites.split(';')
        let target = dataset[i][0].toString()
        for (let j=0;j<prerequisites.length;j++){
          let source = prerequisites[j]
          let edgeId = source + '-' + target 
          let edge = { id: edgeId, 
            source: source, 
            target: target,
            type: 'smart', 
            markerEnd: {type: MarkerType.Arrow, color: 'red'},
            style: {stroke: 'red'},
            animated: false
          }
          edges.push(edge)
        }
      }
    } 
    let corequisites = dataset[i][5]
    if (corequisites!=null){
      if (typeof(corequisites)=="number") {
        let source = dataset[i][5].toString()
        let target = dataset[i][0].toString()
        let edgeId = source + '-' + target 
        let edge = { id: edgeId, 
          source: source, 
          target: target, 
          type: 'smart',
          markerEnd: {type: MarkerType.Arrow, color: 'blue'},
          style: {stroke: 'blue'},
          animated: false
        }
        edges.push(edge)
      } else {
        corequisites = corequisites.split(';')
        let target = dataset[i][0].toString()
        for (let j=0;j<corequisites.length;j++){
          let source = corequisites[j]
          let edgeId = source + '-' + target 
          let edge = { id: edgeId, 
            source: source, 
            target: target,
            type: 'smart', 
            markerEnd: {type: MarkerType.Arrow, color: 'blue'},
            style: {stroke: 'blue'},
            animated: false
          }
          edges.push(edge)
        }
      }
    } 
  }
  return edges
}