export default function Tooltip({name, complexity, delay, block, cr_hrs, dfwi}) {
  
  return (
    <div className='border-box h-30 w-25 bg-gray-100 border-2 text-gray-900 text-xs p-1 z-50'>
      <ul className="py-0.5">{`Course: ${name} `}</ul>
      <div className='flex flex-row gap-2'>
        <ul className="py-0.5">{`Complexity: ${complexity}`}</ul>
        <ul className="py-0.5">{`Delay Factor: ${delay}`}</ul>
        <ul className="py-0.5">{`Blocking Factor: ${block}`}</ul>
      </div>
      <div className='flex flex-row gap-2'>
        <ul className="py-0.5">{`Credit Hours: ${cr_hrs}`}</ul>
        <ul className="py-0.5">{`DFWI%: ${dfwi}`}</ul>
      </div>
    </div>
  );
};