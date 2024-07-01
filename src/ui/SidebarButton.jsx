// eslint-disable-next-line react/prop-types
const SidebarButton = ({children}) => {
  
  return (
    <div className="p-2 px-4  text-slate-400 rounded-md border-b-2 hover:bg-slate-300 hover:text-slate-600 cursor-pointer">
      {children}      
      </div>
  )
}

export default SidebarButton;