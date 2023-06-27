import React, { Fragment} from 'react';
import { Menu, Transition } from '@headlessui/react';
import {getStudyPlan} from './majors'
import {getNodes,getEdges} from './nodes_and_edges'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const items = [
  {label: 'Chemical Engineering'},
  {label: 'Civil Engineering'},
  {label: 'Computer Engineering'},
  {label: 'Computer Science'},
  {label: 'Computer Science Cybersecurity Concentration'},
  {label: 'Electrical Engineering'},
  {label: 'Industrial and Systems Engineering'},
  {label: 'Mechanical Engineering'},
  {label: 'Mechatronics Engineering'},
]

function StudyPlanMenu({setStudyPlan,setNodes,setEdges,setTerms}) {
  

  function getTerms(dataset) {
    let t = dataset[dataset.length-1][10]
    return t
  }

  return (
    <div className='w-full h-20 flex justify-left items-center px-8 text-white'>
      <ul className='flex items-center'>
        <li className='p-4'>
          <Menu as='div' className='relative inline-block text-left overflow-visible z-10'>
            <div>
              <Menu.Button className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
                Choose a Study Plan
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="-mr-1 ml-2 h-5 w-5">
                    <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
                </svg>
              </Menu.Button>
            </div>

            <Transition 
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
                {items.map((item) => (
                  <div className='py-1'>
                    <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <ul
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        onClick = {()=> {
                          if (active){
                            setStudyPlan(item.label)
                            let studyPlan = getStudyPlan(item.label)                            
                            let nodes = getNodes(studyPlan)
                            setNodes(nodes)
                            let terms = getTerms(studyPlan)
                            setTerms(terms)
                            let edges = getEdges(studyPlan)
                            setEdges(edges)
                          }
                        }}
                      >
                        {item.label} 
                      </ul>
                    )}
                    </Menu.Item>
                  </div>
                ))}
              </Menu.Items>              
            </Transition>
          </Menu>
        </li>
      </ul>
    </div>
    
  )
}

export default StudyPlanMenu;